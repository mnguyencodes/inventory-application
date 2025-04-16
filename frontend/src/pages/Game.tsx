import {useFetch} from "@mantine/hooks"
import styles from "./_styles/Game.module.css"

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

        return <div className={styles.container}
            key={game.id}
        >
            <img src={image} />
            <div className={styles.gameText}>
                <p>{game.title}</p>
                <p>{game.year}</p>
                <p>{genres}</p>
                <p>{developers}</p>
            </div>
        </div>
    })

    return (
        <>
            <section className={styles.gamesContainer}>
                {gamesEl ? gamesEl : <h1>Game component goes here!</h1>}
            </section>
        </>
    )
}