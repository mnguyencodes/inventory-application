// Create a Zustand store to manage the authentication state.

import { create } from 'zustand'

// Will need to rethink this, as Zustand does not have direct access to React Router's hooks like `useNavigate`.
import { useNavigate } from 'react-router'

interface AuthState {
  isAuthenticated: boolean
  logIn: (token: string) => void
  logOut: () => void
}

// 'set' is a function provided by Zustand to update the state
// Set up the Zustand store with initial state and actions
const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('token'), // Initialize based on token presence
  logIn: (token: string) => {
    localStorage.setItem('token', token)
    set({ isAuthenticated: true })
  },
  logOut: () => {
    localStorage.removeItem('token')
    set({ isAuthenticated: false })
  },
}))

export default useAuthStore
