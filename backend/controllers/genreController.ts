import queries from "../db/queries"
import asyncHandler from "express-async-handler"

const addGenre = asyncHandler(async(name)=>{
    await queries.addDeveloper(name)
})

export default {
    addGenre
}