import axios from "axios"
import { refreshAccessToken } from "./API"

export const instance = axios.create({
  baseURL: "https://127.0.0.1:8080/api",
  withCredentials: true,
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          console.log("Refreshing access token...")
          await refreshAccessToken()
          console.log("Access token refreshed.")
          return instance(originalRequest)
        } catch (err: any) {
          if (axios.isAxiosError(err)) {
            if (err.response && err.response.data) {
              return Promise.reject(err.response.data)
            }
          } else {
            console.log(err)
          }
          return Promise.reject(err)
        }
      }
      if (error.response.status === 403 && error.response.data) {
        return Promise.reject(error.response.data)
      }
    }
    return Promise.reject(error)
  },
)
