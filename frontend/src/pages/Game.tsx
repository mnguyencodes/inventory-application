import { useFetch } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import styles from './_styles/Game.module.css'

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
  // const { data, loading, error, refetch, abort } = useFetch<Game[]>('http://localhost:3000/games')

  const { data, isLoading, error } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/games')
      return response.data
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const gamesEl =
    data?.allGames &&
    data.allGames.map((game: Game) => {
      const genres = game.genre
        .map((genre) => {
          return genre.name
        })
        .join(', ')

      const developers = game.developer
        .map((developer) => {
          return developer.name
        })
        .join(', ')

      const image = game.image || '/no-image.png'

      return (
        <div className={styles.container} key={game.id}>
          <img src={image} />
          <div className={styles.gameText}>
            <p>{game.title}</p>
            <p>{game.year}</p>
            <p>{genres}</p>
            <p>{developers}</p>
          </div>
        </div>
      )
    })

  return (
    <>
      <section className={styles.gamesContainer}>
        {gamesEl ? gamesEl : <h1>Game component goes here!</h1>}
      </section>
    </>
  )
}
