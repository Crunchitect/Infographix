type LangTable = {"en": {[index: string]: (string | number)}, "th": {[index: string]: (string | number)}};
type NoViewWidth = string extends "viewWidth" ? never : string;

type AnytoAny = {[key: string]: any};
type WannabeCSSDeclaration = {[key: string]: string | number | null};

type Element = {
    id: string,
    tag: string,
    position: {x: number, y: number, w: number, h: number, r: number},
    styles?: {[key: string]: string | number | null},
    attrs?: {[key: string]: string},
    content?: string,
};

type Slide = {
    id: string,
    content: Element[]
};

export type { LangTable, NoViewWidth, Element, Slide, AnytoAny, WannabeCSSDeclaration };
