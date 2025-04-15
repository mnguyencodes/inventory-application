import {useFetch} from "@mantine/hooks"

interface Game {
    id: number
    title: string
    year: number
    image: string
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
        
        const image = game.image || "/no-image.png"

        return <div
            key={game.id}
        >
            <img src={image} />
            <div>
                <p>{game.title}</p>
                <p>{game.year}</p>
                <p>{genres}</p>
                <p>{developers}</p>
            </div>
        </div>
    })

    return (
        <>
            {gamesEl ? gamesEl : <h1>Game component goes here!</h1>}
        </>
    )
}