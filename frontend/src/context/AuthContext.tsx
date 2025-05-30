// Set up the AuthContext to provide authentication state and actions throughout the app.
import { createContext, useContext } from 'react'
import useAuthStore from '../store/useAuthStore'

const AuthContext = createContext<typeof useAuthStore>(null!)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthContext.Provider value={useAuthStore}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const store = useContext(AuthContext)
  if (!store) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return store()
}
