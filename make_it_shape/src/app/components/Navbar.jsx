import React from 'react';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className='bg-[#ffff] text-[#044b65] p-2 '>
      <div className="container p-5 mx-auto shadow-lg rounded-lg">
        <div className='flex justify-between items-center px-8'>
            <ul className='flex space-x-4 text-[#044b65] '>
                <li><Link href='https://github.com/Suchaya-aum/Make-It-Shape'>Source Code</Link></li>
                <li><Link href='https://suchaya-aum.github.io/Make-It-Shape/'>github.io</Link></li>
            </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
