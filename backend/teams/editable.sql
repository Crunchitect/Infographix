(
   EXISTS (
      SELECT
         1
      FROM
         "Teams"
      WHERE
         (
            (
               (
                  "Teams".team_members @> (
                     format(
                        '[{"uid": "%s", "status": "owner"}]',
                        auth.uid()
                     ) :: jsonb
                  )
               )
               OR (
                  "Teams".team_members @> (
                     format(
                        '[{"uid": "%s", "status": "edit"}]',
                        auth.uid()
                     ) :: jsonb
                  )
               )
            )
         )
   )
)