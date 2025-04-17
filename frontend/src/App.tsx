import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import './_global.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Game from './pages/Game'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'

function App() {
  return (
    <>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="games" element={<Game />} />
              <Route path="authentication">
                <Route path="log-in" element={<LogIn />} />
                <Route path="sign-up" element={<SignUp />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  )
}

export default App
