import cors from "cors"

const allowList = ["http://localhost:5173/"]

const corsOptionsDelegate = (req, callback) => {
    const corsOptions = allowList.indexOf(req.header("Origin")) !== -1
        ? { origin: true }
        : { origin: false }
    callback(null, corsOptions)
}

export default {
    corsOptionsDelegate
}
