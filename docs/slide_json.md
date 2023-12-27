# Slide JSON

For that one dude that wants to try writing to the db.

1. Authorize
```js
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON
);
```
you can get the secrets in the `.env` or the `.env.production` respectively.

2. Create a team
```js
const { { id: team_id }, error } = await supabase
    .from("Teams")
    .insert([{
        team_members: [{
            uid: `<YOUR UID>`,
            status: "owner"
        }]
    }]);
```
the valid stati are:  `owner`, `edit` and `read`

3. Finally, make the damn project

    1. First, the name.
    2. The project type, maybe:
        1. `slide`
        2. `video`
        3. `model`
    3. The team_id from Step 2.
    4. The metadata
    ```js
        metadata: {
            width: "1920px",
            height: "1080px"
        }
    ```
    5. The data. Which contains slides, Which contains elements.
    ```js
        data: [
            [
                {
                    id: "1",
                    tag: "h1",
                    inner_text: "hello"
                },
                ...
            ],
            ...
        ]
    ```

    The whole thing togheter is.
    ```js
        const { data: proj_data, error: proj_error } = await supabase
                .from("Projects")
                .insert([
                    {
                        name: "Untitled Project",
                        type: "slide",
                        content: {
                            metadata: {
                                width: "1920px",
                                height: "1080px"
                            },
                            data: [
                                [
                                    {
                                        id: "1",
                                        tag: "h1",
                                        inner_text: "hello"
                                    }
                                ],
                            ]
                        },
                        team_id: team_id
                    }
                ])
                .select();
    ```

## Example?

See line 172-219 from `Projects.vue`.