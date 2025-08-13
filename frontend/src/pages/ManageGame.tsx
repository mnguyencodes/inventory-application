// This component provides functionality to manage games, including creating and listing games.

// Achieved a new high score of 74 points in the subnetting game at subnetting.net.
// Achieved a new high score of 76 points in the subnetting game at subnetting.net.

// Be the best person you can be. Be authentic.

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
  title: string
  year: number
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
      const response = await axios.get('http://localhost:3000/manage-games', {
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

  // Will need to customize cell rendering for genre and developer otherwise [object Object] will be shown
  const columns = [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'year', header: 'Year' },
    { accessorKey: 'genre', header: 'Genre' },
    { accessorKey: 'developer', header: 'Developer' },
  ]

  // Create a table instance with the data and columns
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // Handle loading and error states
  if (isLoading) return <div>Loading games...</div>
  if (error) return <div>Error loading games.</div>

  return (
    <div>
      <h2>Manage Games</h2>
      <table>
        {/* // Render the table header and body */}
        <thead>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<Game>) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: Header<Game, unknown>) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: Row<Game>) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell: Cell<Game, unknown>) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
