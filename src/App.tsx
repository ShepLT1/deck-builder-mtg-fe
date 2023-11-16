import { useState } from "react"
import AlertBar from "./features/alert/Alert"
import { Outlet, Navigate } from "react-router-dom"
import NavBar from "./components/navBar"
import "./App.css"

const loggedInVal = () => String(localStorage.getItem("loggedIn")) || "false"

function App() {
  const [loggedIn, setLoggedIn] = useState(loggedInVal())
  window.addEventListener("localStorageLoggedIn", () => {
    setLoggedIn(window.localStorage.getItem("loggedIn") || "false")
  })

  return (
    <div className="App">
      {loggedIn === "true" ? (
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
