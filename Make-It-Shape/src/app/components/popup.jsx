"use client";

import React from 'react';

export default function Popup({ waterIntake, portion, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">ผลการคำนวณน้ำที่ควรดื่ม</h2>
        <p className="text-gray-700">
          ปริมาณน้ำที่ควรดื่มทั้งหมดต่อวันคือ: <strong>{Math.round(waterIntake)} มิลลิลิตร</strong>
        </p>
        <p className="text-gray-700">
          คุณควรดื่มน้ำ <strong>{Math.round(portion)} มิลลิลิตร</strong> ต่อครั้ง
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          ปิด
        </button>
      </div>
    </div>
  );
}
