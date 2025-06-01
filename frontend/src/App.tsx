import '@mantine/core/styles.css'
import './_global.css'
import { AuthProvider } from './context/AuthContext'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Game from './pages/Game'
import Users from './pages/User'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Dashboard from './pages/Dashboard'

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="games" element={<Game />} />
                <Route path="users">
                  <Route index element={<Users />} />
                  <Route path="log-in" element={<LogIn />} />
                  <Route path="sign-up" element={<SignUp />} />
                </Route>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </MantineProvider>
    </>
  )
}

export default App
