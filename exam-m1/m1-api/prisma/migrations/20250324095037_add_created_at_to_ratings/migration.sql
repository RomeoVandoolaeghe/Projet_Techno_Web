/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Rating` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stars" INTEGER NOT NULL,
    "comment" TEXT,
    "bookId" INTEGER NOT NULL,
    CONSTRAINT "Rating_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rating" ("bookId", "comment", "id", "stars") SELECT "bookId", "comment", "id", "stars" FROM "Rating";
DROP TABLE "Rating";
ALTER TABLE "new_Rating" RENAME TO "Rating";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
