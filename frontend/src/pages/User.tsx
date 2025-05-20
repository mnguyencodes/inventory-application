import { useFetch } from '@mantine/hooks'
import { Table } from '@mantine/core'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
}

export default function User() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    },
  })

  const rowsEl =
    data &&
    data.map((user: User) => {
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
