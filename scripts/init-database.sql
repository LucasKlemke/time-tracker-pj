-- Criar tabelas se não existirem
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hourlyRate" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" DATETIME,
    "endTime" DATETIME,
    "duration" INTEGER NOT NULL,
    "isManual" BOOLEAN NOT NULL DEFAULT false,
    "value" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Activity_date_idx" ON "Activity"("date");
CREATE INDEX IF NOT EXISTS "Activity_userId_idx" ON "Activity"("userId");

-- Inserir usuário padrão se não existir
INSERT OR IGNORE INTO "User" ("id", "name", "hourlyRate") 
VALUES ('default-user', 'Freelancer', 50.0);
