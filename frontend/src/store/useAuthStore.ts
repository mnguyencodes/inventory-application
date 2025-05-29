// Create a Zustand store to manage the authentication state.

import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  logIn: (token: string) => void
  logOut: () => void
}

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
