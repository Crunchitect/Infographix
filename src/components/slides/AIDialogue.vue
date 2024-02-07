<template>
    <Dialogue :title="title" :opened="opened">
        <div class="page-indicators">
            <div 
                :class="['page-indicator', (page === i) && 'active']"
                @click="page = i"
                v-for="i in [0, 1, 2, 3]"
            ></div>
        </div>
        <div class="page" v-if="page === 0">
            <h2>1. Choose your layout</h2>
            <div class="layouts" v-if="layouts">
                <div
                    v-html="parse_layout(layout)"
                    @click="choose_layout(layout)"
                    class="layout"
                    v-for="layout in layouts.slice(layout_page * 4, layout_page * 4 + 4)"
                >
                </div>
                <div class="center">
                    <div class="page-indicators">
                        <div 
                            :class="['page-indicator', (layout_page === i) && 'active']" 
                            @click="layout_page = i"
                            v-for="i in range(layouts?.length / 4)"
                        >
                        </div>
                    </div>
                </div>
            </div>
            <p v-else><Loading /></p>
        </div>
        <div class="page" v-else-if="page === 1">
            <h2>2. Generated Content</h2>
            <div v-if="selected_layout" v-html="selected_layout"></div>
            <div v-else><Loading /></div>
        </div>
    </Dialogue>
</template>

<style>
    .ai-flex-row {
        display: flex;
        flex-flow: row nowrap;
    }

    .ai-flex-col {
        display: flex;
        flex-flow: column nowrap !important;
    }

    .ai-flex-row > *, .ai-flex-col > * {
        background-color: #fff1;
        min-width: 0;
        min-height: 0;
    }

    .ai-layout {
        background-color: #111;
        border: 1px solid #fff3;
        border-radius: 20px;
        display: flex;
        width: 20vw !important;
        aspect-ratio: 16 / 9 !important;
        /* align-items: center; */
        gap: 30px;
        /* justify-content: space-between; */
    }

    .ai-layout-preview {
        background-color: #111;
        border: 1px solid #fff3;
        border-radius: 20px;
        display: flex;
        width: 40vw !important;
        aspect-ratio: 16 / 9 !important;
        /* align-items: center; */
        gap: 30px;
        /* justify-content: space-between; */
    }

    .ai-layout-preview * {
        overflow: hidden;
    }

    .ai-layout *:not(i) {
        border: 1px solid #fff1;
        border-radius: 10px;
        min-width: 0;
        width: 100%;
        height: 100%;
    }

    .ai-layout i {
        font-size: 300%;
        width: 100%;
        height: 100%;
        text-align: center;
        /* padding-top: 50%; */
    }
</style>

<style scoped>
    .page-indicators {
        display: flex;
        justify-content: center;
        gap: 2px;
    }

    .center {
        transform: translateX(50%);
    }

    .page-indicator {
        width: 5%;
        height: 10px;
        background-color: #111;
        border-radius: 20px;
    }

    .active {
        background-color: #aaa !important;
    }

    .layouts {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 50px;
    }

    .layout {
        transition: transform 500ms cubic-bezier(0.215, 0.610, 0.355, 1);
    }

    .layout:hover {
        transform: scale(1.05);
    }
</style>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { generate_slide_layout, generate_text } from '@/lib/llm';
    import type { LayoutParserType } from '@/lib/types';
    // @ts-ignore
    import { layout_parser } from '@/lib/parser.js';

    import Dialogue from '../Dialogue.vue';
    import Loading from '../Loading.vue';

    const props = defineProps({
        title: String,
        opened: Boolean,
        prompt: String
    });

    const page = ref(0);
    const layout_page = ref(0);
    const layouts = ref(null as null | string[]);

    const selected_layout = ref('');

    const range = (n: number) => [...Array(n).keys()];

    const parse_layout = (blob: string) => {
        const parser = (<LayoutParserType>layout_parser).parse;
        let layout;
        try {
            layout = parser(blob);
        } catch (e) {
            return "<div class='ai-gen-invalid'></div>";
        }
        layout = 
            '<div class="ai-layout">' + 
            layout.toString()
                .replace(/<\/\w+?>/g, "</div>")
                .replaceAll("<Text />", "<div class='ai-gen-text'><i class='fa-solid fa-align-justify'></i></div>")
                .replaceAll("<Image />", "<div class='ai-gen-image'><i class='fa-solid fa-image'></i></div>")
                .replaceAll("<Chart />", "<div class='ai-gen-chart'><i class='fa-solid fa-chart-line'></i></div>")
                .replaceAll("<RandPos>", "<div class='ai-gen-rand-pos'>")
                .replaceAll("<RandRot>", "<div class='ai-gen-rand-rot'>")
                .replaceAll("<Vertical>", "<div class='ai-flex-col'>")
                .replaceAll("<Horizontal>", "<div class='ai-flex-row'>") +
            '</div>';
        return layout;
    };

    async function replaceAsync(str: string, regex: RegExp, asyncFn: Function) {
        const promises: Promise<any>[] = [];
        str.replace(regex, (full, ...args) => {
            promises.push(asyncFn(full, ...args));
            return full;
        });
        const data = await Promise.all(promises);
        return str.replace(regex, () => data.shift());
    }

    const choose_layout = async (blob: string) => {
        page.value++;
        const parser = (<LayoutParserType>layout_parser).parse;
        let layout;
        try {
            layout = parser(blob);
        } catch (e) {
            return "<div class='ai-gen-invalid'></div>";
        }
        layout = 
            '<div class="ai-layout-preview">' + 
            layout.toString()
                .replace(/<\/\w+?>/g, "</div>")
                .replaceAll("<Image />", "<div class='ai-gen-image'></div>")
                .replaceAll("<Chart />", "<div class='ai-gen-chart'></div>")
                .replaceAll("<RandPos>", "<div class='ai-gen-rand-pos'>")
                .replaceAll("<RandRot>", "<div class='ai-gen-rand-rot'>")
                .replaceAll("<Vertical>", "<div class='ai-flex-col'>")
                .replaceAll("<Horizontal>", "<div class='ai-flex-row'>") +
            '</div>';
        layout = await replaceAsync(layout, /<Text \/>/g, async () => {
            const slug = await generate_text(props.prompt ?? "Artificial Intelligence");
            return `<div class='ai-gen-text'><p>${slug}</p></div>`
        });
        selected_layout.value = layout;
        return layout;
    };
    
    onMounted(async () => {
        layouts.value = await generate_slide_layout();
    });

</script>