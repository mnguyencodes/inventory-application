import {Request} from "express"
import cors from "cors"

const allowedList: String[] = ["http://localhost:5173"]

export const corsOptionsDelegate = (req: Request, callback: ((err: Error | null, options?: cors.CorsOptions) => void))=>{
    const corsOptions: cors.CorsOptions = allowedList.indexOf(req.header("Origin")!) !== -1
        ? { origin: true }
        : { origin: false }
    callback(null, corsOptions)
}

export const corsUtil = cors(corsOptionsDelegate)
