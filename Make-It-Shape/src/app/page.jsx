"use client"

import { useState } from 'react';
import Popup from './components/popup';
import Navbar from './components/Navbar';

export default function Home() {
  const [weight, setWeight] = useState(0);
  const [mode, setMode] = useState('lazy');
  const [showPopup, setShowPopup] = useState(false);
  const [waterIntake, setWaterIntake] = useState(null);
  const [portion, setPortion] = useState(null);

  const handleSubmit = () => {
    const amountOfWater = (weight * 2.2 * 30) / 2;
    let portions;
    if (mode === 'lazy') {
      portions = amountOfWater / 4;
    } else {
      portions = amountOfWater / 8;
    }

    setWaterIntake(amountOfWater);
    setPortion(portions);

    setShowPopup(true);
  };

  return (
    <main>
    <Navbar />
    <div className="container">
      {/* กล่องที่รับ input น้ำหนัก */}
      <div className="card">
        <h1>ปริมาณน้ำที่พึงดื่มต่อวัน</h1>
        {/* รับค่าน้ำหนัก */}
        <div className="input-group">
          <label>น้ำหนัก (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="กรอกน้ำหนักของคุณ"
          />
        </div>
        {/* เลือกโหมด */}
        <div className="mode-group">
          <h2>โหมดที่ต้องการ:</h2>
          <label>
            <input
              type="radio"
              value="lazy"
              checked={mode === 'lazy'}
              onChange={() => setMode('lazy')}
            />
            โหมดคนขี้เกียจ (เตือนทุก 4 ชั่วโมง)
          </label>
          <label>
            <input
              type="radio"
              value="active"
              checked={mode === 'active'}
              onChange={() => setMode('active')}
            />
            โหมดคนขยัน (เตือนทุก 2 ชั่วโมง)
          </label>
        </div>
        {/* ปุ่ม submit */}
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
      {/* เมื่อกดปุ่ม submit ก็จะขึ้น Popup ปริมาณน้ำที่พึงดื่มต่อวัน และ ปริมาณน้ำที่ควรดื่มต่อครั้ง */}
      {showPopup && (
        <Popup
          waterIntake={waterIntake}
          portion={portion}
          onClose={() => setShowPopup(false)}
        />
      )}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: white;
          padding: 2rem;
        }

        .card {
          background-color: #f0f4f8;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: 100%;
          max-width: 500px;
        }

        h1 {
          color: #333;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #555;
        }

        .input-group input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
        }

        .mode-group {
          margin-bottom: 1.5rem;
          text-align: left;
        }

        .mode-group h2 {
          margin-bottom: 0.5rem;
          color: #333;
        }

        .mode-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #555;
        }

        .submit-btn {
          background-color: #e0bcbc;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
    </main>
  );
}
