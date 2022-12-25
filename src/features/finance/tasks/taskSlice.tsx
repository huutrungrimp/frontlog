import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../../interface";
import { existingUser } from "../../../app/service";
import { variables } from "../../assets/variables";



const initialState: Task = {
    id:'',
    isCompleted:false,
    customer: {
        id:'',
        user: {
            username: ''
        },
        customerName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        postal: '',
        country: '',
    },
    title: '',
    date_time_start: '',
    date_time_end: '',
    task_rate:'',
    hours: '',
    task_pay:''
}

const urlbase = variables.urlbase;
console.log(urlbase)
const url = `${urlbase}accounts/${existingUser.username}/tasks`


const taskSlice = createSlice({

    name: 'task',
    initialState,
    reducers: {
        createTask: (state, action) => {
            // console.log(JSON.stringify(action.payload))
            console.log(action.payload)
            console.log(url + '/new/' + action.payload.customerID)
            fetch(url + '/new/' + action.payload.customerID, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err)
                })

        },

        updateTask: (state, action) => {
            console.log(url + '/' + action.payload.id + '/update')
            fetch(url + '/' + action.payload.id + '/update', {
                method: "PUT",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(action.payload)
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        deleteTask: (state, action) => {
            console.log(action)
            fetch(url + '/' + action.payload + '/delete', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }
})

export const { createTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer
