import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading:null,
    success:null,
    error:null
}

const ProjectCreateReviewSlice = createSlice({
  name: "projectCreateReviewSlice",
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
    setProjectReviewReset:(state)=>{
        state.success=null
        state.loading=null
        state.error=null
    }
  }
});

export const {setError,setLoading,setSuccess,setProjectReviewReset} = ProjectCreateReviewSlice.actions

export default ProjectCreateReviewSlice.reducer

export const createProjectReview = (projectId,review) => async(dispatch, getState) => {
    try {
        dispatch(setLoading(true))
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
  
  
        await axios.post(`/api/projects/${projectId}/reviews`,review,config)
        dispatch(setSuccess(true))
        dispatch(setLoading(false))
      } catch (error) {
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
        dispatch(setLoading(false))
    }
  }