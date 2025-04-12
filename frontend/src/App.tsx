import "@mantine/core/styles.css"
import { MantineProvider } from "@mantine/core"
import './_global.css'
import {BrowserRouter, Routes, Route} from "react-router"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Game from "./pages/Game"


function App() {

  return (
    <>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="game" element={<Game />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  )
}

export default App
