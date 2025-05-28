// Create a Zustand store to manage the authentication state.

import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  logIn: (token: string) => void
  logOut: () => void
}
