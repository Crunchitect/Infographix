const is_block_text_elem = (tag: string) => {
    return [
        "h1", "h2", "h3", "h4", "h5", "h6", "p",
        "blockquote", "div", "dd", "dl", "dt", "figcaption", "figure",
        "ol", "ul", "li", "pre"
    ].includes(tag);
};

const is_inline_text_elem = (tag: string) => {
    return [
        "a", "b", "i", "q", "s", "u",
        "abbr", "bdi",
        "cite", "code", "kbd", "mark",
        "data", "time", "dfn",
        "em", "strong", "samp",
        "ruby", "rp", "rt",
        "sub", "sup", "wbr",
        // !! DEPRACATED
        "small", "big",
        // !!! DON'T USE THIS!!
    ].includes(tag);
};

const is_text_elem = (tag: string) => {
    return is_block_text_elem(tag) || 
        is_inline_text_elem(tag);
};

const is_generic_elem = (tag: string) => {
    return tag === 'div' || tag === 'span';
};

export {
    is_text_elem,
    is_block_text_elem, is_inline_text_elem,
    is_generic_elem
};