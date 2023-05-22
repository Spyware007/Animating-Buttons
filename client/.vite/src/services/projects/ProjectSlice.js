import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  allProjects:[],
  pages:null,
  page:null,
  loading:null,
  error:null,
}

const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setAllProjects:(state,action)=>{
      state.allProjects=action.payload
    },
    setLoading:(state,action) => {
      state.loading = action.payload
    },
    setError:(state,action) => {
      state.error= action.payload
    }
  }
});

export const {setAllProjects,setLoading,setError} = ProjectSlice.actions

export default ProjectSlice.reducer

export const getAllProjects = () => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const {data} = await axios.get(`/api/projects/`)
    dispatch(setAllProjects(data))
    dispatch(setLoading(false))
  } catch (error) {
    dispatch(setLoading(false))
    const payload = error.response && error.response.data.message ?error.response.data.message:error.message
    dispatch(setError(payload))
  }
}

