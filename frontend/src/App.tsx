import { useState } from 'react'
import './App.css'
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import {BrowserRouter, Routes, Route} from "react-router"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
