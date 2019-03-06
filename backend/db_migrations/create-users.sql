CREATE TABLE "Users"
(
    "Id" BIGSERIAL NOT NULL,
    "Name" character varying COLLATE pg_catalog."default" UNIQUE NOT NULL,
    "Rating" integer NOT NULL,
    "Active" boolean NOT NULL,
    "InitialRating" integer NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY ("Id")
)