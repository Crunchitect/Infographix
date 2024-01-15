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
}

async function query(data: HFData) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
        {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
query({inputs:"The answer to the universe is ", options: {wait_for_model: true}}).then((response) => {
    console.log(JSON.stringify(response));
});