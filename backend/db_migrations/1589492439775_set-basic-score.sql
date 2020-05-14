UPDATE "Matches"
SET "Team1Score" = '1', "Team2Score" = '0'
WHERE "Team1Won" = 'true';

UPDATE "Matches"
SET "Team1Score" = '0', "Team2Score" = '1'
WHERE "Team1Won" = 'false';
