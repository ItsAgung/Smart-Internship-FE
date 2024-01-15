import { configureStore } from "@reduxjs/toolkit";
import myReducer from "../reducer/myReducer";
import posisiSlice from "../reducer/posisiSlice";

export const store = configureStore({
  reducer: {
    posisi: posisiSlice,
    myReducer: myReducer,
  },
});
