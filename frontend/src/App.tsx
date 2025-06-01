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

// AuthProvider is a context provider that wraps the application to provide authentication state.
// MantineProvider is a provider for Mantine UI components.
// QueryClientProvider is a provider for React Query to manage server state.

// By having AuthProvider at the top level, all components within the app can access the authentication state.
// This means that Mantine components (like the navbar sign-up/login buttons) can conditionally render based on whether the user is authenticated or not.

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <AuthProvider>
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
      </AuthProvider>
    </>
  )
}

export default App
