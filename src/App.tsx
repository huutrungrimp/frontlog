
import React from 'react';
import { Route, Routes } from "react-router-dom"
import './App.scss'
import SignIn from './features/auth/SignIn';
import SignUp from './features/auth/SignUp';
import { variables } from './features/assets/variables';
import TaskList from './features/finance/tasks/TaskList';
import DashboardMessages from './features/layout/DashboardMessages';
import NavPage from './features/layout/NavPage';
import MainFinance from './features/finance/MainFinance';
import Home from './features/layout/Home';
import MainPage from './features/layout/MainPage';
import FinanceDB from './features/finance/FinanceDB';
import CreateTask from './features/finance/tasks/CreateTask';
import TaskDashboard from './features/finance/tasks/MainTask';
import UpdateTask from './features/finance/tasks/UpdateTask';
import TaskDetail from './features/finance/tasks/TaskDetail';


export function App() {
  const user = localStorage.getItem('userDetail');
  const existingUser = (user === null ? "" : (JSON.parse(localStorage.getItem('userDetail') || '')));
  console.log(existingUser.username)
  const urlbase = variables.urlbase
  return (
    <div className='App gx-0'>
      <NavPage username={existingUser.username} />
      <Routes>
        <Route path="/home" element={<Home username={existingUser.username} />} />
        <Route path="/" element={<Home username={existingUser.username} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path={existingUser.username} element={<MainPage username={existingUser.username} />}>
          <Route index element={<DashboardMessages />} />
          <Route path="finance" element={<MainFinance username={existingUser.username} />}>
            {/* <Route index element={<TaskList username={existingUser.username} />} /> */}
            <Route path='tasks' element={<TaskDashboard username={existingUser.username} />}>
              <Route index element={<TaskList username={existingUser.username} />} />
              <Route path='new' element={<CreateTask username={existingUser.username} />} />
              <Route path=':id' element={<TaskDetail username={existingUser.username} />} /> 
              <Route path=':id/update' element={<UpdateTask username={existingUser.username} />} />              
            </Route>
          </Route>
        </Route>
      </Routes>
      <footer>Footer</footer>
    </div>
  )
}