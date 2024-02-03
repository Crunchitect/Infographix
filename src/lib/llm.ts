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

const prompts = {
    generate_layouts: () => `
    Can you make a basic presentation layout with this syntax?
    't' for text
    'i' for images
    'c' for charts
    'h' and 'v' for horizontal and vertical
    Say, h{ttt} would be A|B|C.
    h{tv{it}} is A|B where B is an image and text stack on top of each other.
    '^' for random position and '%' for random rotation.
    '%^t' and '%h{tt}' for example.
    No other characters are valid except: t, i, c, h, v, {, }, ^ and %
    NO OTHER CHARACTERS ARE CALID EXCEPT: 't', 'i', 'c', 'h', 'v', '{', '}', '^' and '%'.
    NO EXTRA STRINGS, ONLY LAYOUTS.
    If you understand, only respond with this syntax and please put the each layout in between '$'.
    example: $h{ttt}$ and $%^v{th{it}}$
    `
}

const queryText = async (str: string, token: string) => {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(<HFData>{inputs: str}),
        }
    );
    const result = await response.json();
    return result;
}

const ponl = (token: string) => ({
    async text_gen(prompt: string, onlyResp: boolean = true) {
        let prev_resp = `<s>[INST]${prompt}[/INST]`;
        let resp = (await queryText(prev_resp, token))[0].generated_text;
        while (prev_resp != resp) {
            prev_resp = resp;
            resp = (await queryText(prev_resp, token))[0].generated_text;
        }
        if (onlyResp) return resp.slice(resp.search(/\[\/INST\]/) + 7);
        return resp + '</s>';
    }
});

const generate_slide_layout = async () => {
    const resp = <string>await ponl(import.meta.env.VITE_HF_KEY).text_gen(prompts.generate_layouts());
    return (resp.match(/\$[\{\}cithv%\^]+\$/g));
};

export default ponl;
export { generate_slide_layout };