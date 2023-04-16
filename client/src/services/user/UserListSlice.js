import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    users:[],
    loading:null,
    error:null
}

const UserListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    setUsers:(state,action) => {
        state.users = action.payload
    },
    setLoading:(state,action)=>{
        state.loading=action.payload
    },
    setError:(state,action)=>{
        state.error=action.payload
    },
    setAdminReset:(state)=>{
        state.users=[]
        state.loading=null
        state.error=null
    }
  }
});

export const {setError,setLoading,setUsers,setAdminReset} = UserListSlice.actions

export default UserListSlice.reducer

export const getUsers = () => async(dispatch,getState) => {
    try {
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                Authorization:`Bearer ${token}`
            }
        }


        const {data} = await axios.get(`/api/users`,config)
        dispatch(setLoading(false))
        dispatch(setUsers(data))
    } catch (error) {
        dispatch(setLoading(false))
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
    }
}

