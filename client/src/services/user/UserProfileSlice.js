import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
    user:userInfoFromStorage,
    loading:null,
    error:null,
    success:null
}

const UserProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserInfo:(state,action) => {
        state.user = action.payload
    },
    setLoading:(state,action)=>{
        state.loading=action.payload
    },
    setError:(state,action)=>{
        state.error=action.payload
    },
    setSuccess:(state,action)=>{
        state.success=action.payload
    },
  }
});

export const {setUserInfo,setError,setLoading,setSuccess} = UserProfileSlice.actions

export default UserProfileSlice.reducer

export const getUserDetails = (id) => async(dispatch,getState) => {
    try {
        dispatch(setLoading(true))
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }


        const {data} = await axios.get(`/api/users/${id}`,config)
        dispatch(setLoading(false))
        dispatch(setUserInfo(data))
        localStorage.setItem("userInfo",JSON.stringify(data))
    } catch (error) {
        dispatch(setLoading(false))
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
    }
}

export const updateUserProfile = (user) => async(dispatch,getState) => {
    try {
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }


        const {data} = await axios.put(`/api/users/profile`,user,config)
        dispatch(setLoading(false))
        dispatch(setUserInfo(data))
        dispatch(setSuccess(true))
        localStorage.setItem("userInfo",JSON.stringify(data))
    } catch (error) {
        dispatch(setLoading(false))
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
    }
}