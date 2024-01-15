import { createSlice } from "@reduxjs/toolkit";

const posisiSlice = createSlice({
  name: "posisi",
  initialState: {
    title: "",
    kuota: "",
    syarat: "",
  },
  reducers: {
    update: (state, action) => {
      state.title = action.payload.title;
      state.kuota = action.payload.kuota;
      state.syarat = action.payload.syarat;
    },
  },
});

export const { update } = posisiSlice.actions;
export default posisiSlice.reducer;
