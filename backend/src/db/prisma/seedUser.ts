import '@dotenvx/dotenvx/config'
import { PrismaClient } from '../generated/prisma'

type User = {
  firstName: string
  lastName: string
  email: string
  password: string
}

const usersData: User[] = [
  {
    firstName: 'James',
    lastName: 'Bond',
    email: 'jb007@m16.com',
    password: 'JustAQuickTest7#',
  },
]

const prisma = new PrismaClient()

async function main() {
  usersData.map(async (user) => {
    await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
    })
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
