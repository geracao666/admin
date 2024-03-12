-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Release" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "artwork" TEXT NOT NULL,
    "downloadUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "releaseTypeId" INTEGER NOT NULL,
    CONSTRAINT "Release_releaseTypeId_fkey" FOREIGN KEY ("releaseTypeId") REFERENCES "ReleaseType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Release" ("artwork", "createdAt", "downloadUrl", "id", "name", "releaseTypeId", "updatedAt") SELECT "artwork", "createdAt", "downloadUrl", "id", "name", "releaseTypeId", "updatedAt" FROM "Release";
DROP TABLE "Release";
ALTER TABLE "new_Release" RENAME TO "Release";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
