// export default async function handler(req, res) {
//     const { status } = req.query;
    
//     const ipAddress = '10.110.193.58'; // IP ของ Arduino ของคุณ
//     const arduinoUrl = `http://${ipAddress}/?state=${status}`;
  
//     try {
//       const response = await fetch(arduinoUrl);
//       if (response.ok) {
//         res.status(200).json({ message: `LED turned ${status}` });
//       } else {
//         res.status(500).json({ message: 'Error communicating with Arduino' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Error: ' + error.message });
//     }
//   }
  