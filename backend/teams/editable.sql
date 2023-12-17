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
                        '[{"uid": "%s", "status": "owner"}]',
                        auth.uid()
                     ) :: jsonb
                  )
               )
               OR (
                  team_members @> (
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