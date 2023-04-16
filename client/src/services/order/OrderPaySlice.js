import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  loading:null,
  success:null,
  error:null,
  data:null,
}

const OrderPaySlice = createSlice({
  name: "orderPay",
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

export const {setSuccess,setError,setLoading,setReset} = OrderPaySlice.actions

export default OrderPaySlice.reducer

const payOrder = (id,paymentResult) => async(dispatch, getState) => {
  try {
      const {token} =getState().userLogin.userInfo
      const config ={
          headers: {
            "Content-Type":"application/json",
              Authorization:`Bearer ${token}`
          }
      }

      // eslint-disable-next-line
      const {data} = await axios.put(`/api/orders/${id}/pay`,paymentResult,config)
      dispatch(setLoading(false))
      dispatch(setSuccess(true))
    } catch (error) {
      dispatch(setSuccess(false))
      const err = error.response && error.response.data.message?error.response.data.message:error.message
      dispatch(setError(err))
  }
}

export {payOrder}