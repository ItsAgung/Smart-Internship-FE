// myReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: false,
    name: false,
    email: false,
  },
  token: false,
  isLogin: false,
};

const mySlice = createSlice({
  name: "myReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setUser, setToken, setIsLogin } = mySlice.actions;
export default mySlice.reducer;
