import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    error:null,
    success:null
}

const UserDeleteSlice = createSlice({
  name: "userDelete",
  initialState,
  reducers: {
    setError:(state,action)=>{
        state.error=action.payload
    },
    setSuccess:(state,action)=>{
        state.success=action.payload
    }
  }
});

export const {setError,setSuccess} = UserDeleteSlice.actions

export default UserDeleteSlice.reducer

export const deleteUser = (id) => async(dispatch,getState) => {
    try {
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                Authorization:`Bearer ${token}`
            }
        }

        console.log("id",id)
        // eslint-disable-next-line
        const {data} = await axios.delete(`/api/users/${id}`,config)
        dispatch(setSuccess(true))
    } catch (error) {
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
    }
}