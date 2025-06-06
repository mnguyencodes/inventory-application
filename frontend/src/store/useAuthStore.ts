// Create a Zustand store to manage the authentication state.

import { create } from 'zustand'
interface AuthState {
  isAuthenticated: boolean
  logIn: (token: string) => void
  // logOut is a function that takes a navigate function as an argument
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
    navigate('/users/log-in') // Redirect to the login page after logging out
  },
}))

export default useAuthStore
