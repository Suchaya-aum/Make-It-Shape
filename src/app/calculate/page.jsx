// "use client"

// import { useState } from 'react';

// export default function Home() {
//   const [weight, setWeight] = useState(0);
//   const [mode, setMode] = useState('lazy'); // lazy for ขี้เกียจ, active for ขยัน

//   const handleSubmit = async () => {
//     const amountOfWater = (weight * 2.2 * 30) / 2;
//     const res = await fetch('/api/arduino', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ weight, mode, amountOfWater }),
//     });
//     const data = await res.json();
//     alert(data.message);
//   };

//   return (
//     <div>
//       <h1>Water Intake Calculator</h1>
//       <input
//         type="number"
//         value={weight}
//         onChange={(e) => setWeight(e.target.value)}
//         placeholder="Enter your weight in kg"
//       />
//       <select onChange={(e) => setMode(e.target.value)} value={mode}>
//         <option value="lazy">โหมดคนขี้เกียจ (4 ชม.)</option>
//         <option value="active">โหมดคนขยัน (6 ชม.)</option>
//       </select>
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }
