"use client"

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/lib/features/auth/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

