import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: null,
  time: null,
};

const dateTimeSlice = createSlice({
  name: "dateTime",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    resetDateTime: (state) => {
      state.date = null;
      state.time = null;
    },
  },
});

export const { setDate, setTime, resetDateTime } = dateTimeSlice.actions;
export default dateTimeSlice.reducer;
