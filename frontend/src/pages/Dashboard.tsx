import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

export default function Dashboard() {
  const { isAuthenticated } = useAuth()
  // TODO: useNavigate should not be used directly in the component body
  //      but rather in a useEffect hook to avoid side effects during render.
  const navigate = useNavigate()
  if (!isAuthenticated) {
    navigate('/users/log-in', {
      replace: true, // Replace the current entry in the history stack
      state: { from: '/dashboard' }, // Optional: pass state to redirect back after login
    })
  }
  return (
    <div>
      {/* The user isn't redirected to the log-in page as planned. */}
      <h1>Dashboard component here! You are signed in!</h1>
    </div>
  )
}
