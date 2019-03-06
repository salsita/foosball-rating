CREATE TABLE "Matches"
(
    "Id" BIGSERIAL NOT NULL,
    "Team1Player1Id" integer NOT NULL,
    "Team1Player1Rating" integer NOT NULL,
    "Team1Player2Id" integer,
    "Team1Player2Rating" integer,
    "Team2Player1Id" integer NOT NULL,
    "Team2Player1Rating" integer NOT NULL,
    "Team2Player2Id" integer,
    "Team2Player2Rating" integer,
    "Date" timestamp without time zone NOT NULL,
    "Team1Won" boolean NOT NULL,
    CONSTRAINT "Matches_pkey" PRIMARY KEY ("Id"),
    FOREIGN KEY ("Team1Player1Id") REFERENCES "Users"("Id") ON DELETE RESTRICT,
    FOREIGN KEY ("Team1Player2Id") REFERENCES "Users"("Id") ON DELETE RESTRICT,
    FOREIGN KEY ("Team2Player1Id") REFERENCES "Users"("Id") ON DELETE RESTRICT,
    FOREIGN KEY ("Team2Player2Id") REFERENCES "Users"("Id") ON DELETE RESTRICT
)