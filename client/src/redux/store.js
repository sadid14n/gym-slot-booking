import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import { userSlice } from "./features/userSlice";
import { slotSlice } from "./features/slotSlice";
import dateTimeReducer from "./features/dateTimeSlice"; // Import dateTimeSlice reducer

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
    slot: slotSlice.reducer,
    dateTime: dateTimeReducer, // Add dateTime reducer here
  },
});
