import queries from "../db/queries"
import asyncHandler from  "express-async-handler"

const addDeveloper = async(name: string) => {
    await queries.addDeveloper(name)
}

export default {
    addDeveloper
}