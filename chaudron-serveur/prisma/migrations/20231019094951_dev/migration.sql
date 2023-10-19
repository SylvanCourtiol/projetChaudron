/*
  Warnings:

  - You are about to drop the column `merk` on the `recipie_marks` table. All the data in the column will be lost.
  - Added the required column `mark` to the `recipie_marks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recipie_marks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "mark" INTEGER NOT NULL,
    CONSTRAINT "recipie_marks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "recipie_marks_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipies" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_recipie_marks" ("id", "recipe_id", "user_id") SELECT "id", "recipe_id", "user_id" FROM "recipie_marks";
DROP TABLE "recipie_marks";
ALTER TABLE "new_recipie_marks" RENAME TO "recipie_marks";
CREATE UNIQUE INDEX "recipie_marks_user_id_recipe_id_key" ON "recipie_marks"("user_id", "recipe_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
