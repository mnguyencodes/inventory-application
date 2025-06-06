// Set up the AuthContext to provide authentication state and actions throughout the app.
import { createContext, useContext } from 'react'
import useAuthStore from '../store/useAuthStore'

// AuthContext is a functional context that provides access to the authentication store.
const AuthContext = createContext<typeof useAuthStore>(null!)

// AuthProvider wraps the application and provides the authentication store in AuthContext.
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthContext.Provider value={useAuthStore}>{children}</AuthContext.Provider>
}

// useAuth retrieves the authentication store from the context, AuthContext.
export const useAuth = () => {
  const store = useContext(AuthContext)
  if (!store) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return store()
}
