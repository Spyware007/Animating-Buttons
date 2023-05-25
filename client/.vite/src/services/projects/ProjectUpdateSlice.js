import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    success:null,
    error:null,
    loading:null,
    project:{},
}

const ProjectUpdateSlice = createSlice({
  name: "projectUpdate",
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
    setProject:(state,action)=> {
        state.project = action.payload
    },
    setProjectUpdateReset:(state)=> {
        state.project = {}
    }
  }
});

export const {setError,setLoading,setSuccess,setProject,setProjectUpdateReset} = ProjectUpdateSlice.actions

export default ProjectUpdateSlice.reducer

export const updateProject = (project) => async(dispatch, getState) => {
    try {
        dispatch(setLoading(true))
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
  
  
        const {data}=await axios.put(`/api/projects/${project._id}`,project,config)
        dispatch(setSuccess(true))
        dispatch(setProject(data))
        dispatch(setLoading(false))
      } catch (error) {
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
        dispatch(setLoading(false))
    }
  }