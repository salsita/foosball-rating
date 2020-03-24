CREATE FUNCTION MATCHES_BEFORE_INSERT_TRIGGER_CREATE()
RETURNS trigger
LANGUAGE PLPGSQL AS
$$BEGIN
  IF EXISTS (
    SELECT * FROM "Players" p
    WHERE "Id" in (
      NEW."Team1Player1Id",
      NEW."Team1Player2Id",
      NEW."Team2Player1Id",
      NEW."Team2Player2Id"
    )
    AND "GameId" <> NEW."GameId"
  )
  THEN
    RAISE EXCEPTION 'A player in a match cant play a different game than others';
  END IF;
  RETURN NEW;
END;$$;

CREATE TRIGGER MATCHES_BEFORE_INSERT_TRIGGER BEFORE INSERT ON "Matches"
FOR EACH ROW EXECUTE PROCEDURE MATCHES_BEFORE_INSERT_TRIGGER_CREATE();
