import { Table } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
}

export default function User() {
  // Check if the user is logged in by checking for a token in localStorage
  const token = localStorage.getItem('token')
  if (!token) {
    console.error('No token found')
    return <div>Please log in to access this page.</div>
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to fetch users')
      }
      return response.json()
    },
    // Optimize the query to only run if the token is available
    // The !! operator is used to convert a value into its boolean equivalent
    enabled: !!token,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const rowsEl =
    data?.allUsers &&
    data.allUsers.map((user: User) => {
      return (
        <Table.Tr key={user.id}>
          <Table.Td>{user.firstName}</Table.Td>
          <Table.Td>{user.lastName}</Table.Td>
          <Table.Td>{user.email}</Table.Td>
          <Table.Td>{user.password}</Table.Td>
        </Table.Tr>
      )
    })

  return (
    <>
      <h1>Users Component</h1>

      {rowsEl && (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>First Name</Table.Th>
              <Table.Th>Last Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Password</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rowsEl}</Table.Tbody>
        </Table>
      )}
    </>
  )
}
