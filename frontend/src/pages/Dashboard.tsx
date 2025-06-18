import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'

export default function Dashboard() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  if (!isAuthenticated) {
    navigate('/users/log-in', {
      replace: true, // Replace the current entry in the history stack
      state: { from: '/dashboard' }, // Optional: pass state to redirect back after login
    })
  }
  if (isAuthenticated) {
    return (
      <div>
        <h1>Dashboard component here! You are signed in!</h1>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Please log in to access the dashboard.</h1>
      </div>
    )
  }
}
