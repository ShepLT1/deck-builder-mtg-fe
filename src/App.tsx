import AlertBar from "./features/alert/Alert"
import { Outlet } from "react-router-dom"
import NavBar from "./components/navBar"
import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <AlertBar />
        <Outlet />
        {/* <Deck /> */}
        {/* <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card />
          </Grid>
          <Grid item xs={3}>
            Add Card
          </Grid>
          <Grid item xs>
            Add Deck
          </Grid>
        </Grid> */}
      </header>
    </div>
  )
}

export default App
