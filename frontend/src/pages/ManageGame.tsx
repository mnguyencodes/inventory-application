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
  return (
    <div>
      <h2>Manage Games</h2>
    </div>
  )
}
