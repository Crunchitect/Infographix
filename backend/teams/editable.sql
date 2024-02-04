(
   EXISTS (
      SELECT
         1
      WHERE
         (
            (
               (
                  team_members @> (
                     format(
                        '[{"email": "%s", "status": "owner"}]',
                        auth.jwt() ->> 'email'
                     ) :: jsonb
                  )
               )
               OR (
                  team_members @> (
                     format(
                        '[{"email": "%s", "status": "edit"}]',
                        auth.jwt() ->> 'email'
                     ) :: jsonb
                  )
               )
            )
         )
   )
)