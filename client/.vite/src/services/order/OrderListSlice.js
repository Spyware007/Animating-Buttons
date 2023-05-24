import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    orders:[],
    loading:null,
    error:null,
}

const OrderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    setOrderList:(state,action)=>{
        state.orders=action.payload
        // state.loading=false
    },
    setLoading:(state,action)=>{
        state.loading=action.payload
    },
    setError:(state,action)=>{
        state.error=action.payload
    },
    setOrderReset:(state)=>{
        state.orders=null
    }
  }
});

export const {setOrderList,setLoading,setError,setOrderReset} = OrderListSlice.actions

export default OrderListSlice.reducer

const listMyOrders = () => async(dispatch, getState) => {
    try {
        dispatch(setLoading(true))
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                Authorization:`Bearer ${token}`
            }
        }
  
  
        const {data} = await axios.get(`/api/orders/myorders`,config)
        dispatch(setOrderList(data))
        dispatch(setLoading(false))
      } catch (error) {
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
        dispatch(setLoading(false))
    }
  }

export {listMyOrders}
  
