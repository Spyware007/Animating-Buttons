import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


const initialState = {
    userInfo:userInfoFromStorage,
    loading:null,
    error:null,
}

const UserRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    setUserInfo:(state,action) => {
        state.userInfo = action.payload
    },
    setLoading:(state,action)=>{
        state.loading=action.payload
    },
    setError:(state,action)=>{
        state.error=action.payload
    }
  }
});

export const {setError,setLoading,setUserInfo} = UserRegisterSlice.actions

export default UserRegisterSlice.reducer

export const register = (name,email,password) => async(dispatch)=>{
    try{dispatch(setLoading(true))
        const config ={
            headers: {
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.post("/api/users",{name,email,password},config)
        dispatch(setLoading(false))
        dispatch(setUserInfo(data))
        localStorage.setItem("userInfo",JSON.stringify(data))
    } catch (error) {
        dispatch(setLoading(false))
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
    }
}