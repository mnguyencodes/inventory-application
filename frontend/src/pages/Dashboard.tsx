import { useAuth } from '../context/AuthContext'

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
        <h1>Please log in to access the dashboard.</h1>
      </div>
    )
  }
}
