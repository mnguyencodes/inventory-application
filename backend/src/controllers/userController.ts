import queries from '../db/queries'

const usersPost = async (firstName: string, lastName: string, email: string, password: string) => {
  const newUser = await queries.usersPost(firstName, lastName, email, password)
}
