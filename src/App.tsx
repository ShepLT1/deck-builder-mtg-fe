import * as React from "react"
import AlertBar from "./features/alert/Alert"
import { useAppSelector, useAppDispatch } from "./app/hooks"
import { Outlet, Navigate } from "react-router-dom"
import NavBar from "./components/navBar"
import { selectUser } from "./features/user/userSlice"
import Register from "./features/user/Register"
import Login from "./features/user/Login"
import "./App.css"

function App() {
  const user = useAppSelector(selectUser)

  return (
    <div className="App">
      {user.value.id ? (
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
