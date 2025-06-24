import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// TODO: Render a dynamic welcome message that includes the user's name.

export default function Dashboard() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Fetch user's name using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['userFirstName'], // Unique key for the query
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return response.data.firstName
    },
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/users/log-in', {
        replace: true, // Replace the current entry in the history stack
        state: { from: '/dashboard' }, // Optional: pass state to redirect back after login
      })
    }
  }, [isAuthenticated, navigate])

  return (
    <div>
      <h1>Dashboard component here! You are signed in!</h1>
    </div>
  )
}
