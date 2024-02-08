type HFData = {
    inputs: string,
    paramets?: {
        top_k?: number,
        top_p?: number,
        temperature?: number,
        repetition_penalty?: number,
        max_new_tokens?: number,
        max_time?: number,
        return_full_text?: boolean,
        do_sample?: boolean
    },
    options?: {
        use_cache?: boolean,
        wait_for_model?: boolean
    }
};

type UnsplashResponse = {
    results: {
        urls: {
            raw: string
        }
    }[]
};

// type HFResponse = {generated_text: string, [k: string | number | symbol]: any}[];

const prompts = {
    generate_layouts: () => `
    Make a basic presentation layout with this syntax:
    't' for text
    'i' for images
    'c' for charts
    'h' and 'v' for horizontal and vertical
    Say, h{ttt} would be A|B|C.
    h{tv{it}} is A|B where B is an image and text stack on top of each other.
    '^' for random position and '%' for random rotation.
    '%^t' and '%h{tt}' for example.
    No other characters are valid except: t, i, c, h, v, {, }, ^ and %
    NO OTHER CHARACTERS ARE VALID EXCEPT: 't', 'i', 'c', 'h', 'v', '{', '}', '^' and '%'.
    NO EXTRA STRINGS, ONLY LAYOUTS.
    If you understand, only respond with this syntax and please put the each layout in between '$'.
    example: $h{ttt}$ and $%^v{th{it}}$
    `,
    generate_text: (prompt: string) => `
    Make an easy and concise explanation of ${prompt}.
    `
};

const queryText = async (str: string, token: string, cache: boolean = true) => {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(<HFData>{inputs: str, options: {use_cache: cache}}),
        }
    );
    const result = await response.json();
    return result;
};

const ponl = (token: string, cache: boolean = true) => ({
    async text_gen(prompt: string, onlyResp: boolean = true) {
        let prev_resp = `<s>[INST]${prompt}[/INST]`;
        // @ts-ignore
        let resp = (await queryText(prev_resp, token, cache))[0].generated_text;
        while (prev_resp != resp) {
            prev_resp = resp;
            // @ts-ignore
            resp = (await queryText(prev_resp, token, cache))[0].generated_text;
        }
        if (onlyResp) return resp.slice(resp.search(/\[\/INST\]/) + 7);
        return resp + '</s>';
    }
});

export const generate_slide_layout = async () => {
    const resp = <string>await ponl(import.meta.env.VITE_HF_KEY).text_gen(prompts.generate_layouts());
    return (resp.match(/\$[\{\}cithv%\^]+\$/g));
};

export const generate_text = async (prompt: string) => {
    const resp = <string>await ponl(import.meta.env.VITE_HF_KEY, false).text_gen(prompts.generate_text(prompt));
    return resp.replaceAll(`Make an easy and concise explanation of ${prompt}.`, "");
};

export const generate_image = async (prompt: string) => {
    const resp = await fetch(`https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_UNSPLASH_KEY}&query=${prompt}&page=1&per_page=20`);
    const blob = <UnsplashResponse>await resp.json();
    const roll = Math.floor(Math.random() * 20);
    const url = blob.results[roll].urls.raw;
    console.log(url);
    return url;
};

export default ponl;
