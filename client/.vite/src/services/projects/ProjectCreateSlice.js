import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    success:null,
    error:null,
    loading:null,
    project:{},
}

const ProjectCreateSlice = createSlice({
  name: "projectCreate",
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
    setProjectCreateReset:(state)=> {
        state.project={}
        state.loading=null
        state.error=null
        state.success=null
    }
  }
});

export const {setError,setLoading,setSuccess,setProject,setProjectCreateReset} = ProjectCreateSlice.actions

export default ProjectCreateSlice.reducer

export const createProject = () => async(dispatch, getState) => {
    try {
        dispatch(setLoading(true))
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                Authorization:`Bearer ${token}`
            }
        }
  
  
        const {data}=await axios.post(`/api/projects`,{},config)
        dispatch(setSuccess(true))
        dispatch(setProject(data))
        dispatch(setLoading(false))
      } catch (error) {
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
        dispatch(setLoading(false))
    }
  }