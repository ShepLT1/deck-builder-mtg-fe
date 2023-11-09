import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import axios from "axios"

interface UserLoginRequest {
  username: string
  password: string
}

interface UserRegistrationRequest {
  username: string
  password: string
  email: string
  roles: ["user"]
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
  token: string
  refresh: string
  status: "idle" | "loading" | "failed"
}

const initialState: UserState = {
  value: { id: 0, username: "" },
  token: "",
  refresh: "",
  status: "idle",
}

export const loginUser = createAsyncThunk(
  "users/userLoginStatus",
  async (payload: UserLoginRequest) => {
    const response = await axios(`http://127.0.0.1:8080/api/auth/signin`, {
      method: "POST",
      data: payload,
    })
    return response.data
  },
)

export const registerUser = createAsyncThunk(
  "users/userRegistrationStatus",
  async (payload: UserRegistrationRequest) => {
    const response = await axios(`http://127.0.0.1:8080/api/auth/signup`, {
      method: "POST",
      data: payload,
    })
    return response.data
  },
)

export const refreshAccessToken = createAsyncThunk(
  "users/userRefreshAccessTokenStatus",
  async (payload: RefreshAccessTokenRequest) => {
    const response = await axios(
      `http://127.0.0.1:8080/api/auth/refreshtoken`,
      {
        method: "POST",
        data: payload,
      },
    )
    return response.data
  },
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateUser: (state, action) => {
      state.value.id = action.payload.id
      state.value.username = action.payload.username
    },
    updateTokens: (state, action) => {
      state.token = action.payload.token
      if (action.payload.refresh && action.payload.refresh !== state.refresh) {
        state.refresh = action.payload.refresh
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRejected, (state, action) => {
      console.log(action.error)
      // TODO: if refresh token expired, log out (reset to initial state) and redirect to login page
      // TODO: else if access token expired, refresh access token & retry request
    })
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle"
        userSlice.caseReducers.updateUser(state, action)
        userSlice.caseReducers.updateTokens(state, action)
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
        userSlice.caseReducers.updateTokens(state, action)
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { updateUser, updateTokens } = userSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default userSlice.reducer
