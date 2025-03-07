import { createSlice } from "@reduxjs/toolkit"

// Check if we have auth data in localStorage
const getInitialState = () => {
  if (typeof window !== "undefined") {
    const storedAuth = localStorage.getItem("auth")
    if (storedAuth) {
      return JSON.parse(storedAuth)
    }
  }

  return {
    isAuthenticated: false,
    user: null,
    token: null,
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token

      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state))
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null

      if (typeof window !== "undefined") {
        localStorage.removeItem("auth")
      }
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

