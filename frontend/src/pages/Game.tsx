import {useFetch} from "@mantine/hooks"

interface Game {
    title: string
    year: number
    genre: Genre[]
    developer: Developer[]
}

type Genre = {
    name: string
}

type Developer = {
    name: string
}

export default function Game() {
    return (
        <h1>Game component goes here!</h1>
    )
}