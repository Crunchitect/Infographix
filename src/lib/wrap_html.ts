const get_selected_html = () => {
    let selection = window.getSelection(), range, fragment;
    if (selection && selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
        fragment = range.cloneContents();
    }
    return fragment;
};

const serializer = new XMLSerializer();

// this one-liner took 30 minutes to craft up.
// if you are a maintainer and confused, well... you have a lot of reading to do.
// execCommand: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
// XMLSerializer API: https://w3c.github.io/DOM-Parsing/#the-xmlserializer-interface
// Selection API: https://developer.mozilla.org/en-US/docs/Web/API/Selection
// Non-null assertion operator https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-

const wrap_html = (opening: string, closing: string) => document.execCommand("insertHTML", false, opening + serializer.serializeToString(get_selected_html()!).replace(/xmlns="\w*"/g, '') + closing);

export { wrap_html, get_selected_html, serializer };