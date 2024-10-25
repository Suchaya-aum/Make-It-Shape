"use client"; // ทำให้คอมโพเนนต์นี้เป็น Client Component เพื่อใช้ hook อย่าง useState ได้

import React, { useState } from 'react'; // นำเข้า React และ useState
import mqtt from 'mqtt'; // นำเข้า MQTT
import Popup from './components/popup'; // นำเข้า Popup คอมโพเนนต์
import Navbar from './components/Navbar'; // นำเข้า Navbar คอมโพเนนต์

export default function Home() {
  const [weight, setWeight] = useState(''); // น้ำหนักที่ผู้ใช้กรอก
  const [showPopup, setShowPopup] = useState(false); // สถานะการแสดง Popup
  const [waterIntake, setWaterIntake] = useState(null); // ปริมาณน้ำที่ควรดื่ม
  const [portion, setPortion] = useState(null); // ปริมาณน้ำต่อครั้ง
  const [message, setMessage] = useState(''); // ข้อความสำหรับแสดงผล

  // เหตุการณ์เมื่อกด submit -> จะคำนวณปริมาณน้ำที่พึงดื่มต่อวัน และพึงดื่มต่อครั้ง
  const handleSubmit = () => {
    const amountOfWater = (weight * 2.2 * 30) / 2;
    let portions;
    if (mode === 'lazy') {
      portions = amountOfWater / 4;
    } else {
      portions = amountOfWater / 8;
    }
  // ฟังก์ชันคำนวณปริมาณน้ำในมล.
  const calculateWaterIntake = (weight) => {
    return (weight * 2.2 * 30) / 2; // สูตรคำนวณ: น้ำหนัก (กก.) x 2.2 x 30 / 2
  };

  // ฟังก์ชันสำหรับเชื่อมต่อและส่งข้อมูลไปยัง MQTT
  const publishToMQTT = (waterIntake) => {
    const client = mqtt.connect('mqtt://broker.hivemq.com');
    client.on('connect', () => {
      client.publish('phycom_baan', waterIntake.toString(), () => {
        client.end(); // ปิดการเชื่อมต่อเมื่อส่งเสร็จ
      });
    });
  };

  // ฟังก์ชัน handleSubmit สำหรับการคำนวณและส่งข้อมูล
  const handleSubmit = (e) => {
    e.preventDefault();
    const intake = calculateWaterIntake(parseFloat(weight));

    // กำหนดจำนวนครั้งในการดื่มน้ำ
    const portions = Math.round(intake / 8); // แบ่งน้ำดื่มออกเป็น 8 ครั้ง

    setWaterIntake(Math.round(intake));
    setPortion(Math.round(portions));
    setMessage(`Water intake: ${Math.round(intake)} มิลิลิตร`); // อัปเดตข้อความแสดงผล
    publishToMQTT(Math.round(intake)); // ส่งข้อมูลไปยัง MQTT
    setShowPopup(true); // แสดง Popup
  };

  return (
    <main className=" mx-auto">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-white p-2">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">ปริมาณน้ำที่พึงดื่มต่อวัน</h1> {/* หัวเรื่อง */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">น้ำหนัก (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="กรอกน้ำหนักของคุณ"
              className="border rounded p-2 w-full"
            />
          </div>
          <button 
            className="bg-black text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200" 
            onClick={handleSubmit}>
            Calculate and Send
          </button>
          {message && <p className="mt-4 text-blue-600">{message}</p>} {/* แสดงข้อความถ้ามี */}
        </div>
        {/* แสดง Popup */}
        {showPopup && (
          <Popup
            waterIntake={waterIntake}
            portion={portion}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </main>
  );
}
