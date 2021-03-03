import { createSlice, createAction } from "@reduxjs/toolkit";

export const saveJwt = createAction("saveJwt");
export const clearJwt = createAction("clearJwt");
/**
 * The following is a shorthand method for creating a reducer with paired actions and action creators.
 * All functionality related to this concept is contained within this file.
 * See https://redux-toolkit.js.org/api/createslice for more details.
 */
const jwtSlice = createSlice({
  name: "jwt",
  initialState: "",
  reducers: {},
  extraReducers: (builder) => {
    // note that redux-toolkit uses immer to prevent state from being mutated.
    /* eslint-disable no-unused-vars */
    builder.addCase(saveJwt, (state, action) => action.payload);
    builder.addCase(clearJwt, (state) => "");
  },
});

export default jwtSlice;
