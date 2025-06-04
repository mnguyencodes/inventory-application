// Create a Zustand store to manage the authentication state.

import { create } from 'zustand'

// Will need to rethink this, as Zustand does not have direct access to React Router's hooks like `useNavigate`.
import { useNavigate } from 'react-router'

// Create a custom hook to use the navigate function.
// Will not work directly in Zustand store, need to rethink this approach.
function useNavigateHelper() {
  const navigate = useNavigate()
  return { navigate }
}

interface AuthState {
  isAuthenticated: boolean
  logIn: (token: string) => void
  logOut: (navigate: (path: string) => void) => void
}

// 'set' is a function provided by Zustand to update the state
// Set up the Zustand store with initial state and actions
const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('token'), // Initialize based on token presence
  logIn: (token: string) => {
    localStorage.setItem('token', token)
    set({ isAuthenticated: true })
  },
  logOut: (navigate: (path: string) => void) => {
    localStorage.removeItem('token')
    set({ isAuthenticated: false })
    const { navigate } = useNavigateHelper()
    navigate('/users/log-in') // Redirect to the login page after logging out
  },
}))

export default useAuthStore
