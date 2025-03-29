import queries from "../db/queries"
import asyncHandler from  "express-async-handler"

const addDeveloper = asyncHandler(async(name) => {
    await queries.addDeveloper(name)
})

export default {
    addDeveloper
}