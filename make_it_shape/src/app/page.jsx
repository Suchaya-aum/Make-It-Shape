"use client"; 

import React, { useState, useEffect } from 'react'; 
import mqtt from 'mqtt'; // นำเข้า MQTT
import Popup from './components/popup'; // นำเข้า Popup คอมโพเนนต์
import Navbar from './components/Navbar'; // นำเข้า Navbar คอมโพเนนต์

export default function Home() {
  const [weight, setWeight] = useState(''); // น้ำหนัก
  const [showPopup, setShowPopup] = useState(false); // สถานะแสดง Popup
  const [waterIntake, setWaterIntake] = useState(null); // ปริมาณน้ำที่ควรดื่ม
  const [portion, setPortion] = useState(null); // ปริมาณน้ำต่อครั้ง
  const [message, setMessage] = useState(''); // ข้อความสำหรับแสดงผล
  const [reminder, setReminder] = useState('5'); //ระยะเวลาเตือน (นาที)

  // ฟังก์ชันคำนวณปริมาณน้ำในมล.
  const calculateWaterIntake = (weight) => {
    return (weight * 2.2 * 30) / 2; // สูตรคำนวณ: น้ำหนัก (กก.) x 2.2 x 30 / 2
  };

  // เอาไว้เชื่อมต่อและส่งข้อมูลไปยัง MQTT
  const publishToMQTT = (waterIntake) => {
    const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');
    client.on('connect', () => {
      client.publish('phycom_baan', waterIntake.toString(), () => {
        client.end(); // ปิดการเชื่อมต่อเมื่อส่งเสร็จ
      });
    });

    client.on('error', (err) => {
      console.error('MQTT connection error:', err);
    });
  };
  // ฟังก์ชันเตือนทุกๆ ตามที่ผู้ใช้กำหนด
  const startReminder = () => {
    const intervalInMinutes = parseInt(reminder) || 5; // แปลงจาก string เป็น number
    const reminderIntervalInMs = intervalInMinutes * 60 * 1000; // แปลงนาทีเป็นมิลลิวินาที

    const reminderTimer = setInterval(() => {
      if (weight) {
        alert('อย่าลืมดื่มน้ำตามที่คำนวณไว้!'); // เตือนผู้ใช้ให้ดื่มน้ำ
      } else {
        alert('กรุณากรอกน้ำหนักของคุณ!'); // เตือนให้กรอกน้ำหนัก
      }
    }, reminderIntervalInMs); // ใช้เวลาที่ผู้ใช้กำหนด

    return () => clearInterval(reminderTimer); // ล้างเวลาเมื่อคอมโพเนนต์ถูกทำลาย
  };

  // เรียกใช้ startReminder เมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    startReminder(); // เรียกฟังก์ชันเตือนเมื่อคอมโพเนนต์โหลด

    // Cleanup function to clear the interval on unmount
    return () => {
      clearInterval(startReminder);
    };
  }, [reminder]); // เพิ่ม reminder ใน dependencies


  // ปุ่ม Submit สำหรับคำนวณและส่งข้อมูล
  const handleSubmit = (e) => {
    e.preventDefault();
    const intake = calculateWaterIntake(parseFloat(weight));

    // กำหนดจำนวนครั้งในการดื่มน้ำ
    const portions = Math.round(intake / 8); // กินน้ำ 8 ครั้ง ขก.คิดเศษ เอาจน.เต็มไปนะ

    setWaterIntake(Math.round(intake)); //ขก.คิดเศษ เอาจน.เต็มไปนะ
    setPortion(Math.round(portions)); //ขก.คิดเศษ เอาจน.เต็มไปนะ
    setMessage(`ปริมาณน้ำที่ควรดื่มทั้งหมดต่อวันคือ : ${Math.round(intake)} มิลิลิตร\nคุณควรดื่มน้ำ : ทั้งหมด 8 แก้ว ${Math.round(portions)} มิลิลิตร ต่อแก้ว `); // ข้อความแสดงผลข่างล่างปุ่ม
    publishToMQTT(reminder); // ส่งข้อมูลไปยัง MQTT
    setShowPopup(true); // แสดง Popup
    console.log("Popup should appear now.");
  };

  return (
    <div className=" mx-auto ">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen shadow-lg bg-[url('/water.jpg')] bg-cover bg-center bg-opacity-40">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">ปริมาณน้ำที่พึงดื่มต่อวัน</h1> {/* หัวเรื่อง */}
          <div className="mb-4">
            {/* input น้ำหนัก */}
            <label className="block mb-2 text-gray-700">น้ำหนัก (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="กรอกน้ำหนักของคุณ"
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            {/* input สำหรับระยะเวลาเตือน */}
            <label className="block mb-2 text-gray-700">เตือนทุกๆ (นาที):</label>
            <input
              type="number"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              placeholder="กรอกจำนวนนาที"
              className="border rounded p-2 w-full"
            />
          </div>
          {/* ปุ่ม submit */}
          <button 
            className="bg-black text-white py-2 px-4 rounded hover:bg-[#044b65] transition duration-200" 
            onClick={handleSubmit}>
            Calculate and Send
          </button>
          {/* แสดงข้อความล่างปุ่ม */}
          {message && (
            <>
            <p className="mt-4 text-[#044b65]">{message.slice(0, message.indexOf('\n'))}</p>
            <p className="mt-4 text-[#044b65]">{message.slice(message.indexOf('\n')+1)}</p>
            </>)}
        </div>
         {/* เมื่อกดปุ่ม submit ก็จะขึ้น Popup ปริมาณน้ำที่พึงดื่มต่อวัน และ ปริมาณน้ำที่ควรดื่มต่อครั้ง */}
        {showPopup && (
          <Popup
            waterIntake={waterIntake}
            portion={portion}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
}
