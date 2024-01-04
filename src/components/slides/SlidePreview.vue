<template>
    <span ref="ctx" class="ctx">
    </span>
</template>

<style scoped>
    .ctx {
        color: black;
    }
</style>

<script setup lang="ts">
    import { onMounted, ref, type PropType } from 'vue';

    type Element = {
        id: string,
        tag: string,
        position: {x: number, y: number, w: number, h: number},
        styles?: {[key: string]: string | number | null},
        attrs?: {[key: string]: string},
        content?: string,
    };

    type Slide = {
        id: string,
        content: Element[]
    };

    type WannabeCSSDeclaration = {[key: string]: string | number | null};

    const props = defineProps({
        data: Object as PropType<Slide>,
        width: Number,
        height: Number,
        log: String
    });

    const content = props.data?.content ?? [];
    const ctx = ref(null as null | HTMLElement);
    
    onMounted(() => {
        // console.log(content);
        for (const element of content) {
            let elem_dom = document.createElement(element.tag);
            elem_dom.id = element.id;
            elem_dom.style.position = "absolute";
            elem_dom.style.top = (element.position.x / (props.width ?? 1)).toString() + "%";
            elem_dom.style.left = (element.position.y / (props.height ?? 1)).toString() + "%";
            if (element.content) elem_dom.innerText = element.content;
            if (element.attrs) {
                for (const attr in element.attrs) {
                    elem_dom.setAttribute(attr, element.attrs[attr]);
                }
            }
            if (element.styles) {
                for (const style in element.styles) {
                    (<WannabeCSSDeclaration><unknown>elem_dom.style)[style] = element.styles[style];
                }
            }
            ctx.value?.appendChild(elem_dom);
        }
    });
</script>