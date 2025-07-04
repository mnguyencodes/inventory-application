import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

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
    enabled: isAuthenticated, // Only run if authenticated
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false, // Do not refetch on window focus
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/users/log-in', {
        replace: true, // Replace the current entry in the history stack
        state: { from: '/dashboard' }, // Optional: pass state to redirect back after login
      })
    }
  }, [isAuthenticated, navigate])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading dashboard.</div>

  return (
    <div>
      <h1>Welcome, {data}</h1>
    </div>
  )
}
