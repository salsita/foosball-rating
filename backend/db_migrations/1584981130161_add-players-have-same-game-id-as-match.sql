CREATE FUNCTION MATCHES_AFTER_INSERT_TRIGGER_CREATE()
RETURNS trigger
LANGUAGE PLPGSQL AS
$$BEGIN
  IF EXISTS (
    SELECT * FROM "Matches" m, "Players" p
    WHERE (
      m."Team1Player1Id" = p."Id" OR
      m."Team1Player2Id" = p."Id" OR
      m."Team2Player1Id" = p."Id" OR
      m."Team2Player2Id" = p."Id"
    )
    AND m."Id" = NEW."Id"
    AND p."GameId" <> NEW."GameId"
  )
  THEN
    RAISE EXCEPTION 'A player in a match cant play a different game than others';
  END IF;
  RETURN NEW;
END;$$;

CREATE TRIGGER MATCHES_AFTER_INSERT_TRIGGER AFTER INSERT ON "Matches"
FOR EACH ROW EXECUTE PROCEDURE MATCHES_AFTER_INSERT_TRIGGER_CREATE();
