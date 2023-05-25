import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading:null,
    success:null,
    error:null,
    data:null,
}

const OrderDeliverSlice = createSlice({
  name: "orderDeliver",
  initialState,
  reducers: {
    setSuccess:(state,action)=>{
        state.success=action.payload
    },
    setLoading:(state,action)=>{
      state.loading=action.payload
    },
    setError:(state,action)=>{
      state.error=action.payload
    },
    setReset:(state)=>{
        state.error=null
        state.loading=null
        state.success=null
    }
  }
});

export const {setSuccess,setError,setLoading,setReset} = OrderDeliverSlice.actions

export default OrderDeliverSlice.reducer

export const deliverOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch(setLoading(true))
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                Authorization:`Bearer ${token}`
            }
        }
  
        // eslint-disable-next-line
        const {data} = await axios.put(`/api/orders/${order._id}/deliver`,{},config)
        console.log("datt",data)
        dispatch(setLoading(false))
        dispatch(setSuccess(true))
      } catch (error) {
        dispatch(setSuccess(false))
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
    }
  }