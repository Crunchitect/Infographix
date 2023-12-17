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
               OR (
                  "Teams".team_members @> (
                     format(
                        '[{"uid": "%s", "status": "read"}]',
                        auth.uid()
                     ) :: jsonb
                  )
               )
            )
         )
   )
)