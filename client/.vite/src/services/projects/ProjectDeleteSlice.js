import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    success:null,
    error:null,
    loading:null,
}

const ProjectDeleteSlice = createSlice({
  name: "projectDelete",
  initialState,
  reducers: {
    setError:(state,action)=>{
        state.error=action.payload
    },
    setSuccess:(state,action)=>{
        state.success=action.payload
    },
    setLoading:(state,action)=>{
        state.loading=action.payload
    },
  }
});

export const {setError,setLoading,setSuccess} = ProjectDeleteSlice.actions

export default ProjectDeleteSlice.reducer

export const deleteProject = (id) => async(dispatch, getState) => {
    try {
        dispatch(setLoading(true))
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                Authorization:`Bearer ${token}`
            }
        }
  
  
        await axios.delete(`/api/projects/${id}`,config)
        dispatch(setSuccess(true))
        dispatch(setLoading(false))
      } catch (error) {
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
        dispatch(setLoading(false))
    }
  }