ALTER TABLE "Matches" RENAME COLUMN "RatingChange" TO "WinningTeamRatingChange";

ALTER TABLE "Matches" ADD COLUMN "LosingTeamRatingChange" integer;

UPDATE "Matches" SET "LosingTeamRatingChange" = -"WinningTeamRatingChange";

ALTER TABLE "Matches" ALTER COLUMN "LosingTeamRatingChange" SET NOT NULL;
