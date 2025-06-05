## Authentication with Zustand and React Context

This document explains how to implement authentication in a React application using a combination of Zustand for state management and React Context for dependency injection. This approach ensures a clean, modular, and scalable architecture.

### Overview

1. **Zustand Store**:
   - Manages the `isAuthenticated` state.
   - Provides actions (`logIn` and `logOut`) to update the authentication state.

2. **React Context**:
   - Provides the Zustand store instance to the component tree.
   - Allows components to access the store without directly importing it.

3. **Components**:
   - **LogIn Component**:
     - Updates the authentication state using the `logIn` action.
     - Redirects the user to the dashboard after a successful login.
   - **Navbar Component**:
     - Reads the `isAuthenticated` state to conditionally render buttons.
     - Calls the `logOut` action to log out the user and redirect them to the log-in page.

### How It Works

1. When the user logs in:
   - The `logIn` action stores the JWT token in `localStorage` and updates the `isAuthenticated` state to `true`.

2. When the user logs out:
   - The `logOut` action removes the JWT token from `localStorage`, updates the `isAuthenticated` state to `false`, and redirects the user to the log-in page.

3. Navigation:
   - The `useNavigate` hook from React Router is used in components to handle redirection.
   - The `navigate` function is passed to the `logOut` action to perform the redirection.

The following sections provide the code implementation for each step.

## Step 1: Create the Zustand Store

```TSX
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

export default useAuthStore
```

## Step 2: Create the React Context

```TSX
import { createContext, useContext } from 'react'
import useAuthStore from '../store/authStore'

const AuthContext = createContext<typeof useAuthStore | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider value={useAuthStore}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const store = useContext(AuthContext)
  if (!store) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return store()
}
```

## Step 3: Wrap Your App with the AuthProvider

```TSX
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
```

## Step 4: Update the LogIn Component

```TSX
import { useAuth } from '../context/AuthContext'

export default function LogIn() {
  const logIn = useAuth()((state) => state.logIn)
  const { register } = useForm<FormInputs>()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (formData: FormData): Promise<LogInResponse> => {
      const plainObject = Object.fromEntries(formData.entries())
      const response = await axios.post<LogInResponse>(
        'http://localhost:3000/users/log-in',
        plainObject
      )
      return response.data
    },
    onSuccess: (data) => {
      alert(`Success! ${data.message}`)
      logIn(data.token) // Update Zustand store
      navigate('/dashboard')
    },
    onError: (error: MutationError) => {
      if (axios.isAxiosError(error) && error.response) {
        alert(`Error: ${error.response.data.message}`)
      } else {
        alert('An unexpected error occurred')
      }
    },
  })

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate(new FormData(event.currentTarget))
  }

  return (
    <>
      <h1 className={formStyles.title}>Log In</h1>
      <form className={formStyles.form} onSubmit={onSubmit}>
        <TextInput
          {...register('email', { required: true })}
          label="Email"
          placeholder="jb007@m16.com"
        />
        <PasswordInput
          {...register('password', { required: true })}
          label="Password"
          placeholder="********"
        />
        {mutation.isError && (
          <p className={formStyles.invalid}>
            {mutation.error.response?.data.message || 'An error occurred'}
          </p>
        )}
        <Button type="submit" variant="filled">
          {mutation.isPending ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
    </>
  )
}
```

## Step 5: Update the Navbar Component

```TSX
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isAuthenticated, logOut } = useAuth()((state) => ({
    isAuthenticated: state.isAuthenticated,
    logOut: state.logOut,
  }))

  return (
    <nav>
      {!isAuthenticated ? (
        <>
          <button>Sign Up</button>
          <button>Log In</button>
        </>
      ) : (
        <button onClick={logOut}>Log Out</button>
      )}
    </nav>
  )
}
```
