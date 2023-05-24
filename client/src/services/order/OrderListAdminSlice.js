import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    orders:[],
    loading:null,
    error:null,
}

const OrderListAdminSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    setOrderList:(state,action)=>{
        state.orders=action.payload
    },
    setLoading:(state,action)=>{
        state.loading=action.payload
    },
    setError:(state,action)=>{
        state.error=action.payload
    },
  }
});

export const {setOrderList,setLoading,setError} = OrderListAdminSlice.actions

export default OrderListAdminSlice.reducer




  const listAllOrders = () => async(dispatch, getState) => {
    try {
        dispatch(setLoading(true))
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                Authorization:`Bearer ${token}`
            }
        }
  
  
        const {data} = await axios.get(`/api/orders/`,config)
        dispatch(setOrderList(data))
        dispatch(setLoading(false))
      } catch (error) {
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
        dispatch(setLoading(false))
    }
  }


export {listAllOrders}
  
