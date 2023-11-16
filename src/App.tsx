import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import AlertBar from "./features/alert/Alert"
import { Outlet, Navigate } from "react-router-dom"
import NavBar from "./components/navBar"
import { selectUser, updateUser } from "./features/user/userSlice"
import { setLocalStorageUserId } from "./utils/persistance/localStorage"
import "./App.css"

function App() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    dispatch(updateUser(Number(window.localStorage.getItem("user"))))
  }, [])

  window.addEventListener("localStorageUserId", () => {
    dispatch(updateUser(Number(window.localStorage.getItem("user")) || 0))
  })

  return (
    <div className="App">
      {user.value !== 0 ? (
        <div>
          <header className="App-header">
            <NavBar />
            <AlertBar />
          </header>
          <Outlet />
        </div>
      ) : (
        <div>
          <Navigate to="/login" />
          <Outlet />
        </div>
      )}
    </div>
  )
}

export default App
