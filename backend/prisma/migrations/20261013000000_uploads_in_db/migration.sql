-- Rasmlar bazada saqlanadi (Render bepul tarifida disk vaqtinchalik).
CREATE TABLE "Upload" (
    "id" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);
