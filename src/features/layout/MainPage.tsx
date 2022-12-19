import React from 'react'
import { Outlet } from 'react-router-dom'
import { User } from '../../interface'
import MenuMain from './MenuMain'

export default function MainPage({username}:User) {
  return (
    <div className='mainPage'>
      <div className='menuMain'>
        <MenuMain username={username} />
      </div>
      <div className='contentMain'>
        <Outlet />
      </div>
    </div>
  )
}
