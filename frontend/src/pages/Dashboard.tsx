import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'

export default function Dashboard() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    return (
      <div>
        <h1>Dashboard component here! You are signed in!</h1>
      </div>
    )
  } else {
    return (
      <div>
        {/* TODO: Redirect the user instead of rendering a message */}
        <h1>Please log in to access the dashboard.</h1>
      </div>
    )
  }
}
