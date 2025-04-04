import { createSlice } from "@reduxjs/toolkit";

export const slotSlice = createSlice({
  name: "slot",
  initialState: {
    available: false,
  },
  reducers: {
    setAvailable: (state, action) => {
      state.available = action.payload; // This will update the availability status
    },
  },
});

export const { setAvailable } = slotSlice.actions;
