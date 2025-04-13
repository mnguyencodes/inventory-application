import { withAccelerate } from "@prisma/extension-accelerate"
import {PrismaClient} from "./generated/prisma"

const pool = new PrismaClient().$extends(withAccelerate())

export default pool