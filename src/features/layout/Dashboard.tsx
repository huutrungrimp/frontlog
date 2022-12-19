import React from 'react'
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className='mainPage'>
      <nav className='menuMain'>
        {/* <ul>
          <li>
            <a href="http://">Link 1</a>
          </li>
          <li>
            <a href="http://">Link 1</a>
          </li>
        </ul> */}
      </nav>
      <div className='contentMain'>
        <Outlet />
      </div>


    </div>
  );
}
