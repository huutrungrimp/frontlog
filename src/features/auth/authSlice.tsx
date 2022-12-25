import { createSlice } from "@reduxjs/toolkit";
import { variables } from "../assets/variables";

export interface AuthState {
    id: string;
    username: string;
    password: string;
    password2: string;
    isSigned: boolean
}

const url = variables.urlbase

const initialState: AuthState = {
    id: '',
    username: '',
    password: '',
    password2: '',
    isSigned: false,
}

const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {


        signUp: (state, action) => {
            fetch(url + 'signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            })
                .then(res => res.json())
                .then(res => {
                    localStorage.setItem('userDetail', JSON.stringify(res))
                    console.log(res)
                })
                .catch(err => {
                    console.error(err)
                })
        },

        signIn: (state, action) => {
            console.log(action)

            fetch(url + 'signin', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            })
                .then(res => res.json())
                .then(res => {
                    if (res['username'] !== undefined) {
                        localStorage.setItem('userDetail', JSON.stringify(res))
                        console.log(localStorage.getItem('userDetail'))
                        // alert('Successfully signed in')
                    } else {
                        alert(res.message)
                    }
                })
                .catch(err => {
                    console.error(err)
                })
            return action.payload
        },
        signOut: (state, action) => {
            console.log(action)
            console.log(localStorage.getItem('userDetail'))
            fetch(url + 'signout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            })
                .then(res => res.json())
                .then(res => {
                    localStorage.removeItem('userDetail')
                    console.log(localStorage.getItem('userDetail'))
                    console.log('logout')
                })
                .catch(err => {
                    console.error(err)
                })
        }
    },
}
)

export const { signUp, signIn, signOut } = authSlice.actions;
export default authSlice.reducer
