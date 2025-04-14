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
    const {data, loading, error, refetch, abort} = useFetch<Game[]>(
        "http://localhost:3000/games"
    )

    const gamesEl = data && data.map((game) => {
        const genres = game.genre.map(genre => {
            return genre.name
        }).join(", ")

        const developers = game.developer.map(developer => {
            return developer.name
        }).join(", ")
        
        return <div
        >
            <p>{game.title}</p>
            <p>{game.year}</p>
            <p>{genres}</p>
            <p>{developers}</p>
        </div>
    })

    return (
        <>
            {gamesEl ? gamesEl : <h1>Game component goes here!</h1>}
        </>
    )
}