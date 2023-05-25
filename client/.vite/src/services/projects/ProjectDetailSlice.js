import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    projectInfo:{},
    loading:null,
    error:null,
}

const ProjectDetailSlice = createSlice({
  name: "projectDetail",
  initialState,
  reducers: {
      setLoading:(state,action) => {
        state.loading = action.payload
      },
      setError:(state,action) => {
        state.error= action.payload
      },
      setProject:(state,action)=>{
        state.projectInfo = action.payload
      }
  }
});

export const {setError,setLoading,setProject} = ProjectDetailSlice.actions

export default ProjectDetailSlice.reducer

export const getProjectById = (id) => async(dispatch) => {
    try {
      dispatch(setLoading(true))
      const {data} = await axios.get(`/api/projects/${id}`)
      console.log(data)
      dispatch(setProject(data))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
      const payload = error.response && error.response.data.message ?error.response.data.message:error.message
      dispatch(setError(payload))
    }
  }