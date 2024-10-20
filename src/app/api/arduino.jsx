// // pages/api/arduino.js
// export default async function handler(req, res) {
//     const { weight, mode, amountOfWater } = req.body;
  
//     // ส่งข้อมูลไปยัง Arduino ผ่าน API หรือ WebSocket
//     // ตัวอย่างการใช้ HTTP Request
//     const response = await fetch('http://your-arduino-ip-address/api', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ mode, amountOfWater }),
//     });
  
//     if (response.ok) {
//       res.status(200).json({ message: 'Data sent to Arduino successfully' });
//     } else {
//       res.status(500).json({ message: 'Failed to send data to Arduino' });
//     }
//   }
  