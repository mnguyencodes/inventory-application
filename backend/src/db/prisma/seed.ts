import '@dotenvx/dotenvx/config'
import { PrismaClient } from '../generated/prisma'

type Game = {
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

const gamesData: Game[] = [
  {
    title: 'Minecraft',
    year: 2011,
    genre: [{ name: 'Sandbox' }, { name: 'Survival' }],
    developer: [{ name: 'Mojang Studios' }],
  },
  {
    title: 'Grand Theft Auto V',
    year: 2013,
    genre: [{ name: 'Action-Adventure' }],
    developer: [{ name: 'Rockstar North' }],
  },
  {
    title: 'The Legend of Zelda: Ocarina of Time',
    year: 1998,
    genre: [{ name: 'Action-Adventure' }, { name: 'Fantasy' }],
    developer: [{ name: 'Nintendo EAD' }],
  },
  {
    title: 'Red Dead Redemption II',
    year: 2018,
    genre: [{ name: 'Open-World' }, { name: 'Action-Adventure' }],
    developer: [{ name: 'Rockstar Games' }],
  },
  {
    title: 'Tetris',
    year: 1984,
    genre: [{ name: 'Puzzle' }],
    developer: [{ name: 'Alexey Pajitnov' }],
  },
  {
    title: 'The Elder Scrolls V: Skyrim',
    year: 2011,
    genre: [{ name: 'RPG' }, { name: 'Open-World' }],
    developer: [{ name: 'Bethesda Game Studios' }],
  },
  {
    title: 'Call of Duty: Modern Warfare',
    year: 2019,
    genre: [{ name: 'FPS' }],
    developer: [{ name: 'Infinity Ward' }],
  },
  {
    title: 'Fortnite',
    year: 2017,
    genre: [{ name: 'Battle Royale' }, { name: 'Survival' }],
    developer: [{ name: 'Epic Games' }],
  },
  {
    title: 'Super Mario Bros.',
    year: 1985,
    genre: [{ name: 'Platformer' }],
    developer: [{ name: 'Nintendo' }],
  },
  {
    title: 'Pokémon Red and Blue',
    year: 1996,
    genre: [{ name: 'RPG' }, { name: 'Adventure' }],
    developer: [{ name: 'Game Freak' }],
  },
]

const prisma = new PrismaClient()

async function main() {
  gamesData.map(async (game) => {
    await prisma.game.create({
      data: {
        title: game.title,
        year: game.year,
        genre: { create: [...game.genre] },
        developer: { create: [...game.developer] },
      },
    })
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
