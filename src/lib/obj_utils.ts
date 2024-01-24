type validObjType = string | number | symbol;

// hacky nonsense ts
export const use_obj_filter = () => {
    (<{[k: string]: any}>Object.prototype).filter = (predicate: (arr: any[]) => boolean) => {
        return Object.fromEntries(Object.entries(<object>this!).filter(predicate));
    };
};

export const obj_filter = (obj: object, predicate: (arr: any[]) => boolean) => {
    return Object.fromEntries(Object.entries(obj!).filter(predicate));
};

export const obj_rename_key = (obj: {[k: validObjType]: any}, oldKey: any, newKey: any) => {
    delete Object.assign(obj, {[newKey]: obj[oldKey] })[oldKey];
};

export const obj_map = (obj: {[k: validObjType]: any}, callback: (key: validObjType, index?: number) => any) => {
    Object.keys(obj).forEach(callback);
};
