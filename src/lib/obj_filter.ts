// hacky nonsense ts

export const use_obj_filter = () => {
    (<{[k: string]: any}>Object.prototype).filter = (predicate: (arr: any[]) => boolean) => {
        return Object.fromEntries(Object.entries(<object>this!).filter(predicate));
    };
};
