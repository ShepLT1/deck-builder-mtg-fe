import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { instance } from "../../utils/api/axios.config"
import { setLocalStorageLoggedIn } from "../../utils/persistance/localStorage"

interface UserLoginRequest {
  username: string
  password: string
}

interface UserRegistrationRequest {
  username: string
  password: string
  email: string
  roles: string[]
}

interface RefreshAccessTokenRequest {
  refreshToken: string
}

interface User {
  id: number
  username: string
}

export interface UserState {
  value: User
  status: "idle" | "loading" | "failed"
}

const initialState: UserState = {
  value: { id: 0, username: "" },
  status: "idle",
}

export const loginUser = createAsyncThunk(
  "users/userLoginStatus",
  async (payload: UserLoginRequest) => {
    const response = await instance({
      method: "POST",
      url: `/auth/signin`,
      data: payload,
    })
    console.log(response.headers)
    return response.data
  },
)

export const registerUser = createAsyncThunk(
  "users/userRegistrationStatus",
  async (payload: UserRegistrationRequest) => {
    const response = await instance({
      method: "POST",
      url: `/auth/signup`,
      data: payload,
    })
    return response.data
  },
)

export const refreshAccessToken = async () => {
  const response = await instance({
    method: "POST",
    url: `/auth/refreshtoken`,
  })
  return response.data
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value.id = action.payload.id
      state.value.username = action.payload.username
      console.log(state.value)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle"
        userSlice.caseReducers.updateUser(state, action)
        setLocalStorageLoggedIn("true")
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(registerUser.fulfilled, (state) => {
        setLocalStorageLoggedIn("true")
        state.status = "idle"
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { updateUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
