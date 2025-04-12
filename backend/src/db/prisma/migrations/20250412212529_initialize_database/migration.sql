-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Developer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameToGenre" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GameToGenre_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DeveloperToGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DeveloperToGame_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GameToGenre_B_index" ON "_GameToGenre"("B");

-- CreateIndex
CREATE INDEX "_DeveloperToGame_B_index" ON "_DeveloperToGame"("B");

-- AddForeignKey
ALTER TABLE "_GameToGenre" ADD CONSTRAINT "_GameToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToGenre" ADD CONSTRAINT "_GameToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeveloperToGame" ADD CONSTRAINT "_DeveloperToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeveloperToGame" ADD CONSTRAINT "_DeveloperToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
