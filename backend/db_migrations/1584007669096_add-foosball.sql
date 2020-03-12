INSERT INTO "Games"("Id", "Name", "Description")
VALUES
  ('1', 'Foosball', 'Table football');

UPDATE "Matches"
SET "GameId" = '1';
