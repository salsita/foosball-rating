INSERT INTO "Games"("Id", "Name", "Description")
VALUES
  ('1', 'foosball', 'Table football');

UPDATE "Matches"
SET "GameId" = '1';
