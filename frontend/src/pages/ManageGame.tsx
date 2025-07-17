// This component provides functionality to manage games, including creating and listing games.

import { useQuery } from '@tanstack/react-query' // data fetching
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  HeaderGroup,
  Header,
  Row,
  Cell,
} from '@tanstack/react-table' // table functionality
import useMutation from '@tanstack/react-query' // change data on server
import axios from 'axios' // make HTTP requests
import { useAuth } from '../context/AuthContext' // check authentication state

interface Game {
  id: number
  name: string
  genre: string
  developer: string
}

export default function ManageGame() {
  const { isAuthenticated } = useAuth() // check if user is authenticated
  if (!isAuthenticated) {
    throw new Error('User is not authenticated')
  }
  const token = localStorage.getItem('token') // get token from local storage
  const { data, isLoading, error } = useQuery<Game[]>({
    queryKey: ['games'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/games', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
  return (
    <div>
      <h2>Manage Games</h2>
    </div>
  )
}
