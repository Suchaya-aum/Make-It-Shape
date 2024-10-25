import React from 'react';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className='bg-gray-800 text-white p-5'>
      <div className="container mx-auto">
        <div className='flex justify-between items-center'>
            <div>
                <Link href='/calculate'>
                  <span className="text-lg font-bold">Home</span>
                </Link>
            </div>
            <ul className='flex space-x-4'>
                <li><Link href='/'>Araiwa</Link></li>
                <li><Link href='/'>Arai</Link></li>
            </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
