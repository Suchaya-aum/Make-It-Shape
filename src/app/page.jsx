"use client"

import { useState } from 'react';
import Navbar from "./components/Navbar";

export default function Home() {
  const [weight, setWeight] = useState('');
  const [waterAmount, setWaterAmount] = useState(null);

  const calculateWater = (weight) => {
    const water = ( weight * 2.2 * 30 )/ 2;
    return water.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateWater(weight);
    setWaterAmount(result);
  };

  return (
    <main>
    <Navbar />
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>คำนวณปริมาณน้ำที่พึงดื่มต่อวัน</h1>
      <form onSubmit={handleSubmit}>
        <label>
          น้ำหนัก (กิโลกรัม):
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            placeholder="ใส่น้ำหนักของคุณ" 
            required 
            style={{ margin: '10px', padding: '5px', fontSize: '16px' }}
          />
        </label>
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          คำนวณ
        </button>
      </form>

      {waterAmount && (
        <div style={{ marginTop: '20px' }}>
          <h2>คุณควรดื่มน้ำประมาณ {waterAmount} มล. ต่อวัน</h2>
        </div>
      )}
    </div>
    </main>
  );
}
