import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from "./";

export const store = configureStore({

    //disable middleware to prevent false error 'non-serializable' value for a boolean
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    },
})