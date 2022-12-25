
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
import MainCustomer from './features/finance/customers/MainCustomer';
import CustomerList from './features/finance/customers/CustomerList';
import AddCustomer from './features/finance/customers/AddCustomer';
import CustomerDetail from './features/finance/customers/CustomerDetail';
import UpdateCustomer from './features/finance/customers/UpdateCustomer';
import DeleteCustomer from './features/finance/customers/DeleteCustomer';
import DeleteTask from './features/finance/tasks/DeleteTask';


export function App() {
  const user = localStorage.getItem('userDetail');
  const existingUser = (user === null ? "" : (JSON.parse(localStorage.getItem('userDetail') || '')));
  console.log(existingUser.username)
  const urlbase = variables.urlbase
  return (
    <div id='app' className='App gx-0' data-cy='myapp'>
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
            <Route index element={<FinanceDB />} />
            <Route path='tasks' element={<MainTask />}>
              <Route index element={<TaskList />} />
              <Route path='new' element={<CreateTask />} />
              <Route path=':id' element={<TaskDetail />} />
              <Route path=':id/update' element={<UpdateTask />} />
              <Route path=':id/delete' element={<DeleteTask />} />
              <Route path='search' element={<SearchTask />} />
            </Route>
            <Route path='customers' element={<MainCustomer />}>
              <Route index element={<CustomerList />} />
              <Route path='new' element={<AddCustomer />} />
              <Route path=':id' element={<CustomerDetail />} />
              <Route path=':id/update' element={<UpdateCustomer />} />
              <Route path=':id/delete' element={<DeleteCustomer />} />
              <Route path='search' element={<SearchTask />} />
            </Route>

          </Route>
        </Route>
      </Routes>
      <footer>Footer</footer>
    </div>
  )
}