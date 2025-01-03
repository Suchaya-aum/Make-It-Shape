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
          คุณควรดื่มน้ำ ทั้งหมด 8 แก้ว <strong>{Math.round(portion)} มิลลิลิตร</strong> ต่อแก้ว
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-[#044b65] text-white px-4 py-2 rounded-lg "
        >
          ปิด
        </button>
      </div>
    </div>
  );
}
