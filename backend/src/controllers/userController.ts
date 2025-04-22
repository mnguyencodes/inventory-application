import queries from '../db/queries'
import asyncHandler from 'express-async-handler'

const usersPost = async (firstName: string, lastName: string, email: string, password: string) => {
  const newUser = await queries.usersPost(firstName, lastName, email, password)
  // Let's start off by checking if the email exists in the database.
  // Prisma Docs:

  // By unique identifier
  // const user = await prisma.user.findUnique({
  //     where: {
  //       email: 'elsa@prisma.io',
  //     },
  //   })
}
