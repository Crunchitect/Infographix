<template>
    <div ref="ctx" class="ctx"></div>
</template>

<style scoped>
    .ctx {
        background-color: white;
        aspect-ratio: v-bind(width) / v-bind(height);
        border-radius: 20px;
        min-width: 80%;
        max-width: 80%;
        margin: auto;
        position: relative;
    }
</style>

<script lang="ts" setup>
    import { type PropType, ref, watchEffect, onMounted } from 'vue';

    type Element = {
        id: string,
        tag: string,
        position: {x: number, y: number},
        styles?: {[key: string]: string | number | null},
        attrs?: {[key: string]: string},
        content?: string,
    };

    type Slide = {
        id: string,
        content: Element[]
    };

    const props = defineProps({
        data: Object as PropType<Slide>,
        width: Number,
        height: Number,
        class: String,
        log: String
    });

    const ctx = ref(null as null | HTMLElement);
    let is_mounted = ref(false);

    const instantiate_ctx = () => {
        if (!Array.isArray(props.data?.content)) return "cope";
        if (ctx.value) ctx.value.innerHTML = '';
        if (!props.data?.content) return;
        for (const element of props.data.content) {
            const elem_dom = document.createElement(element.tag);
            elem_dom.id = element.id;
            elem_dom.innerText = element.content ?? "";

            elem_dom.style.position = 'absolute';
            const left = (element.position.x / ((props.width)  ?? 100)) * 100;
            const top  = (element.position.y / ((props.height) ?? 100)) * 100;
            elem_dom.style.top = `${top}%`;
            elem_dom.style.left = `${left}%`;
            // TODO: Make it  variable
            elem_dom.style.color = 'black';

            if (ctx.value) ctx.value.appendChild(elem_dom);
        }
    };

    watchEffect(() => {
        if (!is_mounted) return;
        instantiate_ctx();
    });

    onMounted(() => {
        is_mounted.value = true;
        instantiate_ctx();
    });
</script>