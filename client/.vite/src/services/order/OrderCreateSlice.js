import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    order:{},
    loading:null,
    success:null,
    error:null
}

const OrderCreateSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder:(state,action) => {
        state.order = action.payload
        state.loading=false
        state.success=true
    },
    setLoading:(state,action)=>{
      state.loading=action.payload
    },
    setError:(state,action)=>{
      state.error=action.payload
    }
  }
});

export const {setOrder,setLoading,setError} = OrderCreateSlice.actions

export default OrderCreateSlice.reducer

export const createOrder = (order) => async(dispatch,getState) => {
  try {
      dispatch(setLoading(true))
      const {token} =getState().userLogin.userInfo
      const config ={
          headers: {
              "Content-Type":"application/json",
              Authorization:`Bearer ${token}`
          }
      }


      const {data} = await axios.post(`/api/orders`,order,config)
      dispatch(setOrder(data))
      dispatch(setLoading(false))
  } catch (error) {
      dispatch(setLoading(false))
      const err = error.response && error.response.data.message?error.response.data.message:error.message
      dispatch(setError(err))
  }
}