import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { instance } from "../../utils/api/axios.config"

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

export interface UserState {
  value: Number
  status: "idle" | "loading" | "failed"
}

const initialState: UserState = {
  value: 0,
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
      state.value = action.payload
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
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(registerUser.fulfilled, (state) => {
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
