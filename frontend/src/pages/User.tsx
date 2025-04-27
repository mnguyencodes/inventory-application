import { useFetch } from '@mantine/hook'

type User = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export default function User() {
  const getUsers = async () => {}
  return (
    <>
      <h1>Users Component</h1>
    </>
  )
}
