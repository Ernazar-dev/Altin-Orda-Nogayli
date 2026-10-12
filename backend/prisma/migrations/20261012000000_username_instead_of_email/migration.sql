-- Email o'rniga login (username): kirish va ro'yxatdan o'tish endi faqat login + parol bilan.
ALTER TABLE "User" RENAME COLUMN "email" TO "username";
ALTER INDEX "User_email_key" RENAME TO "User_username_key";

-- Mavjud qiymatlarni loginga aylantirish: "teacher@demo.uz" -> "teacher"; takrorlar raqam bilan ajratiladi.
WITH base AS (
  SELECT id,
         "createdAt",
         COALESCE(NULLIF(regexp_replace(lower(split_part(username, '@', 1)), '[^a-z0-9._-]', '', 'g'), ''), 'user') AS u
  FROM "User"
), ranked AS (
  SELECT id, u, row_number() OVER (PARTITION BY u ORDER BY "createdAt", id) AS rn FROM base
)
UPDATE "User"
SET username = CASE WHEN ranked.rn = 1 THEN ranked.u ELSE ranked.u || ranked.rn::text END
FROM ranked
WHERE "User".id = ranked.id;
