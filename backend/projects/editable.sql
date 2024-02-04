(
   EXISTS (
      SELECT
         1
      FROM
         "Teams"
      WHERE
         (
            ("Teams".id = "Projects".team_id)
            AND (
               (
                  "Teams".team_members @ > (
                     format(
                        '[{"email": "%s", "status": "owner"}]' :: text,
                        (auth.jwt() ->> 'email' :: text)
                     )
                  ) :: jsonb
               )
               OR (
                  "Teams".team_members @ > (
                     format(
                        '[{"email": "%s", "status": "edit"}]' :: text,
                        (auth.jwt() ->> 'email' :: text)
                     )
                  ) :: jsonb
               )
            )
         )
   )
)