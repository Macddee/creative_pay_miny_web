import { createSlice } from "@reduxjs/toolkit";


//get user from localstorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null, //if user exists in localstorage set new state
  token:  null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    demoLogin: (state) => {
      state.user = true;
      state.isLoading = false;
      state.isSuccess = true;
    },
    demoLogout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isSuccess = true;
    },
  },
  
});

export const { reset, demoLogin, demoLogout } = authSlice.actions;
export default authSlice.reducer;
