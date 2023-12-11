import axios from "axios"
import { store } from "../../app/store"
import { updateAlert } from "../../features/alert/alertSlice"
import { refreshAccessToken } from "../../features/user/userSlice"
import { setLocalStorageUserId } from "../persistance/localStorage"

const { VITE_API_URL } = import.meta.env

export const instance = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response) {
      if (
        originalRequest.url?.includes("/auth") &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        store.dispatch(
          updateAlert({
            message: error.response.data.message,
            isOpen: true,
            isError: true,
          }),
        )
      } else if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          await refreshAccessToken()
          return instance(originalRequest)
        } catch (err: any) {
          setLocalStorageUserId(0)
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
      if (error.response.status === 403) {
        setLocalStorageUserId(0)
        if (error.response.data) {
          return Promise.reject(error.response.data)
        }
      }
    }
    return Promise.reject(error)
  },
)
