<template>
    <span ref="ctx" class="ctx">
    </span>
</template>

<style scoped>
    .ctx {
        color: black;
        position: relative;
    }
</style>

<script setup lang="ts">
    import { onMounted, ref, type PropType } from 'vue';

    import type { VueElRef, Slide, WannabeCSSDeclaration } from '@/lib/types';

    

    const props = defineProps({
        data: Object as PropType<Slide>,
        width: Number,
        height: Number,
        log: String
    });

    const content = props.data?.content ?? [];
    const ctx = ref(null as VueElRef);
    
    onMounted(() => {
        // console.log(content);
        for (const element of content) {
            let elem_dom = document.createElement(element.tag);
            elem_dom.id = element.id + "-preview";
            elem_dom.style.position = "absolute";
            elem_dom.style.top = (element.position.x / (props.width ?? 1) * 100).toString() + "%";
            elem_dom.style.left = (element.position.y / (props.height ?? 1) * 100).toString() + "%";
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