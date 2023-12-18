import { createSlice } from "@reduxjs/toolkit";

const random =  Math.random();

const REDUCER_NAME = "dependence";
const initialState = {
  dep: 0,
};

const depReducer = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setDependence(state, _) {
      state.dep = Math.random();
    },
  },
}); 



export const { setDependence } = depReducer.actions

export default depReducer.reducer
export const selectDep = (state) => state?.dep?.dep;
