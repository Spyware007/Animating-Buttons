import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    user:{},
    loading:null,
    error:null,
    success:null
}

const UserDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    setUserDetail:(state,action) => {
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

export const {setUserDetail,setError,setLoading,setSuccess} = UserDetailSlice.actions

export default UserDetailSlice.reducer

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
        dispatch(setUserDetail(data))
    } catch (error) {
        dispatch(setLoading(false))
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
    }
}