import queries from "../db/queries"
import asyncHandler from "express-async-handler"

const addGenre = async(name: string)=>{
    await queries.addDeveloper(name)
}

export default {
    addGenre
}