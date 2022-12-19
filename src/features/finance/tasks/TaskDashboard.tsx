import React from 'react'
import { Outlet } from 'react-router-dom'

export default function TaskDashboard() {
  return (
    <div>
        <div>
            TaskDashboardLeft
        </div>
        <div className=''>
            <Outlet />
        </div>
    </div>
  )
}
