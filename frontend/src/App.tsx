import "@mantine/core/styles.css"
import { MantineProvider } from "@mantine/core"
import './App.css'
import Layout from "./components/Layout"
import Home from "./pages/Home"
import {BrowserRouter, Routes, Route} from "react-router"


function App() {

  return (
    <>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  )
}

export default App
