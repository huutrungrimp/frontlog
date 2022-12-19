import React from 'react'
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className='mainPage'>
      <nav className='menuMain'>
      </nav>
      <div className='contentMain'>
        <Outlet />
      </div>


    </div>
  );
}
