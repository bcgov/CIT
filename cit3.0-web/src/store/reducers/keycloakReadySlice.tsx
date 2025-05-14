import { createSlice, createAction } from "@reduxjs/toolkit";

export const setKeycloakReady = createAction("setKeycloakReady");

const keycloakReadySlice = createSlice({
  name: "keycloakReady",
  initialState: false,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setKeycloakReady, (state, action) => action.payload);
  },
});

export default keycloakReadySlice;
