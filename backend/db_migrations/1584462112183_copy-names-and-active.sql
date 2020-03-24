INSERT INTO "Users"("Name", "Active", "PlayerId")
SELECT "Name", "Active", "Id" as "PlayerId"
FROM "Players";

UPDATE "Players"
SET "GameId" = '1';

UPDATE "Players" p
SET "UserId" = u."Id"
FROM "Users" u
WHERE u."PlayerId" = p."Id";
