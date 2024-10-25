"use client"


export default function Popup({ waterIntake, portion, onClose }) {
    return (
        <div className="popup-overlay">
          <div className="popup">
            <h2>ผลการคำนวณน้ำที่ควรดื่ม</h2>
            <p>ปริมาณน้ำที่ควรดื่มทั้งหมดต่อวันคือ: {waterIntake.toFixed(2)} มิลลิลิตร</p>
            <p>คุณควรดื่มน้ำ {portion.toFixed(2)} มิลลิลิตรต่อครั้ง</p>
            <button onClick={onClose}>ปิด</button>
    
            <style jsx>{`
              .popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999; /* ให้อยู่เหนือ element อื่น */
              }
    
              .popup {
                background: #e0bcbc;
                padding: 2rem;
                border-radius: 10px;
                text-align: center;
                max-width: 400px;
                width: 100%;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                z-index: 10000; /* ให้ popup อยู่เหนือ overlay */
              }
    
              h2 {
                margin-bottom: 1rem;
                color: #333;
              }
    
              p {
                margin-bottom: 1rem;
                color: #555;
              }
    
              button {
                background-color: #bccee0;
                color: white;
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 5px;
                font-size: 1rem;
                cursor: pointer;
                transition: background-color 0.3s ease;
              }
    
              button:hover {
                background-color: #0056b3;
              }
            `}</style>
          </div>
        </div>
      );
}
  