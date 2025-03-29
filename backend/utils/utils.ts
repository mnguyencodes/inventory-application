import {fileURLToPath} from "url"
import path from "path"

const __dirname = {absPath: import.meta.url, isMetaURL: true}
export const PUBLIC_DIR = resolveFilePath(__dirname, "..", "public")
export const VIEWS_DIR = resolveFilePath(__dirname, "..", "views")

export function resolveFilePath({absPath, isMetaURL=false}, ...relativePath) {
    const pathname = isMetaURL ? path.dirname(fileURLToPath(absPath)) : absPath
    return path.join(pathname, ...relativePath)
}
