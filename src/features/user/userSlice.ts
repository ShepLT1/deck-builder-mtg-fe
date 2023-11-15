import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit"
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

export const refreshAccessToken = createAsyncThunk(
  "users/userRefreshAccessTokenStatus",
  async () => {
    const response = await instance({
      method: "POST",
      url: `/auth/refreshtoken`,
    })
    console.log(response)
    return response.data
  },
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value.id = action.payload.id
      state.value.username = action.payload.username
      console.log(state.value)
    },
    // updateTokens: (state, action) => {
    //   state.token = action.payload.token
    //   if (action.payload.refresh && action.payload.refresh !== state.refresh) {
    //     state.refresh = action.payload.refresh
    //   }
    //   console.log(state.token)
    //   console.log(state.refresh)
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle"
        userSlice.caseReducers.updateUser(state, action)
        // userSlice.caseReducers.updateTokens(state, action)
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
      .addCase(refreshAccessToken.pending, (state) => {
        state.status = "loading"
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.status = "idle"
        // userSlice.caseReducers.updateTokens(state, action)
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.status = "failed"
      })
    // .addMatcher(isRejected, (state, action) => {
    //   if (action.error.message === "Request failed with status code 401") {
    //     try {
    //       console.log("refreshing access token")
    //       refreshAccessToken()
    //     } catch (error) {
    //       console.log("refresh error ==>> ", error)
    //     }
    //   }
    //   // TODO: if refresh token expired, log out (reset to initial state)
    //   // TODO: else if access token expired, refresh access token & retry request
    // })
  },
})

export const { updateUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
