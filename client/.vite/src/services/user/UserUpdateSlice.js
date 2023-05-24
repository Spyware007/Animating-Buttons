import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: null,
  error: null,
  data:null,
};

const UserUpdateSlice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
        state.success=action.payload
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setData:(state,action)=>{
        state.data=action.payload
    },
    setUserUpdateReset:(state)=>{
        state.success=null
        state.error=null
        state.data=null
    }
  },
});

export const { setError, setSuccess,setData,setUserUpdateReset } = UserUpdateSlice.actions;

export default UserUpdateSlice.reducer;

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    const { token } = getState().userLogin.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    dispatch(setSuccess(true));
    dispatch(setData(data))
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(err));
  }
};
