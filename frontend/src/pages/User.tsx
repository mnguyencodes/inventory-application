import { useFetch } from '@mantine/hook'
import { Table } from '@mantine/core'

type User = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export default function User() {
  const { data, loading, error, refetch, abort } = useFetch<User[]>('http://localhost:3000/users')

  return (
    <>
      <h1>Users Component</h1>
    </>
  )
}
