
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
import MainTask from './features/finance/tasks/MainTask';
import UpdateTask from './features/finance/tasks/UpdateTask';
import TaskDetail from './features/finance/tasks/TaskDetail';
import Test from './Test';
import TaskSearch from './features/finance/tasks/SearchTask';
import SearchTask from './features/finance/tasks/SearchTask';


export function App() {
  const user = localStorage.getItem('userDetail');
  const existingUser = (user === null ? "" : (JSON.parse(localStorage.getItem('userDetail') || '')));
  console.log(existingUser.username)
  const urlbase = variables.urlbase
  return (
    <div className='App gx-0'>
      <NavPage />
      <Routes>
        <Route path='test' element={<Test />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path={existingUser.username} element={<MainPage />}>
          <Route index element={<DashboardMessages />} />
          <Route path="finance" element={<MainFinance />}>
            <Route path='tasks' element={<MainTask /> }>
              <Route index element={<TaskList />} />
              <Route path='new' element={<CreateTask />} />
              <Route path=':id' element={<TaskDetail />} />
              <Route path=':id/update' element={<UpdateTask />} />
              <Route path='search' element={<SearchTask />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <footer>Footer</footer>
    </div>
  )
}