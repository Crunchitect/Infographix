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
            <div class="layouts" v-if="layouts?.length">
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
                            v-for="i in shutup(range, [layouts?.length / 4], [])"
                        >
                        </div>
                    </div>
                </div>
            </div>
            <p v-else><Loading /></p>
        </div>
        <div class="page" v-else-if="page === 1">
            <h2>2. Generated Content</h2>
            <div v-if="selected_layout">
                <div v-html="selected_layout"></div>
                <button class="darker" @click="page++">Use this Slide!</button>
            </div>
            <div v-else><Loading /></div>
        </div>
        <div class="page" v-else-if="page === 2">
            <h2>3. Building Slide Components</h2>
            <div v-if="selected_layout">
                <div class="build-parent">
                    <div ref="slide" v-html="selected_layout"></div>
                    <div class="logs" ref="logs">
                        <p class="log" :style="{'color': log.color}" v-for="log in log_list">{{ log.log }}</p>
                    </div>
                </div>
                <button class="darker" @click="build_slide">Build this Slide!</button>
            </div>
            <div v-else><Loading /></div>
        </div>
        <div class="page" v-else-if="page === 3">
            <h2>4. All Done!</h2>
            <p>Click out or the <i class="fa-solid fa-circle-xmark"></i> to close this dialogue.</p>
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

    .full-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .gen-text, .gen-text p {
        min-width: 0;
    }

    .ai-flex-row > * {
        flex: 1;
    }
</style>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
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

    .darker {
        background-color: #111;
    }

    .build-parent {
        display: flex;
        gap: 20px;
    }

    .logs {
        background-color: #111;
        flex-grow: 1;
        border-radius: 10px;
        min-width: 0;
        height: 45vh;
        overflow-y: scroll
    }

    .log {
        outline: 1px solid gray;
        font-family: 'Space Mono', monospace;
        overflow-wrap: anywhere;
    }
</style>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { generate_slide_layout, generate_text, generate_image } from '@/lib/llm';
    import type { LayoutParserType, Slide, Element, VueElRef } from '@/lib/types';
    import { generate_uuid_v4 } from '@/lib/generate_uuid';
    // @ts-ignore
    import { layout_parser } from '@/lib/parser.js';

    import Dialogue from '../Dialogue.vue';
    import Loading from '../Loading.vue';

    const props = defineProps({
        title: String,
        opened: Boolean,
        prompt: String
    });

    const emit = defineEmits<{
        (e: "ai_slide", slug: Slide): void
    }>();

    const page = ref(0);
    const layout_page = ref(0);
    const layouts = ref(null as null | string[]);

    const selected_layout = ref('');

    const logs = ref(null as VueElRef);
    const slide = ref(null as VueElRef);

    const log_list = ref([] as {log: string, color: string}[]);

    const shutup = (func: Function, args: any[], errval: any = null) => {
        try {
            return func(...args);
        } catch {
            return errval;
        }
    }

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
                .replaceAll("<Chart />", "<div class='ai-gen-chart'></div>")
                .replaceAll("<RandPos>", "<div class='ai-gen-rand-pos'>")
                .replaceAll("<RandRot>", "<div class='ai-gen-rand-rot'>")
                .replaceAll("<Vertical>", "<div class='ai-flex-col'>")
                .replaceAll("<Horizontal>", "<div class='ai-flex-row'>") +
            '</div>';
        layout = await replaceAsync(layout, /<Text \/>/g, async () => {
            const slug = await generate_text(props.prompt ?? "Artificial Intelligence");
            return `<div class='gen-text'><p>${slug}</p></div>`
        });
        layout = await replaceAsync(layout, /<Image \/>/g, async () => {
            const slug = await generate_image(props.prompt ?? "Artificial Intelligence");
            return `<div class='gen-image'><img class="full-image" src="${slug}" /></div>`
        });
        selected_layout.value = layout;
        return layout;
    };

    const build_slide = () => {
        let elems = <Element[]>[];
        log_list.value = [];
        const { x: rel_slide_x, y: rel_slide_y, width: rel_slide_width, height: rel_slide_height } = slide.value!.getBoundingClientRect();
        const { width: slide_width, height: slide_height } = document.getElementById('slide_edit_ctx')!.getBoundingClientRect();
        log_list.value.push({
            log: `[CORE] Slide dimensions are ${slide_width}x${slide_height}`,
            color: 'red'
        });
        log_list.value.push({
            log: `[CORE] Generated Slide dimensions are ${rel_slide_width}x${rel_slide_height}`,
            color: 'red'
        });
        [].slice.call(slide.value!.getElementsByTagName('p')).forEach((element: HTMLParagraphElement) => {
            log_list.value.push({
                log: "[NEW] Detected a new element: Paragraph.",
                color: 'lime'
            });
            const { x, y, width, height } = element.getBoundingClientRect();
            log_list.value.push({
                log: `[INFO] Element Dimensions are "${width}x${height}+${x}+${y}"`,
                color: 'cyan'
            });
            const rel_x = Math.floor((x - rel_slide_x) / rel_slide_width * slide_width);
            const rel_y = Math.floor((y - rel_slide_y) / rel_slide_height * slide_height);
            const rel_w = Math.floor(width / rel_slide_width * slide_width);
            const rel_h = Math.floor(height / rel_slide_height * slide_height);
            log_list.value.push({
                log: `[INFO] Relative Element Dimensions are "${rel_w}x${rel_h}+${rel_x}+${rel_y}"`,
                color: 'cyan'
            });
            const elem_obj = <Element>{
                id: generate_uuid_v4(),
                tag: "p",
                content: element.innerHTML,
                position: {
                    x: rel_x,
                    y: rel_y,
                    w: rel_w,
                    h: rel_h,
                    r: 0
                }
            };
            log_list.value.push({
                log: `[BUILD] Create Element with JSON: ${JSON.stringify(elem_obj)}`,
                color: 'yellow'
            });
            elems.push(elem_obj);
        });
        [].slice.call(slide.value!.getElementsByTagName('img')).forEach((element: HTMLImageElement) => {
            log_list.value.push({
                log: "[NEW] Detected a new element: Image.",
                color: 'lime'
            });
            const { x, y, width, height } = element.getBoundingClientRect();
            log_list.value.push({
                log: `[INFO] Element Dimensions are "${width}x${height}+${x}+${y}"`,
                color: 'cyan'
            });
            const rel_x = Math.floor((x - rel_slide_x) / rel_slide_width * slide_width);
            const rel_y = Math.floor((y - rel_slide_y) / rel_slide_height * slide_height);
            const rel_w = Math.floor(width / rel_slide_width * slide_width);
            const rel_h = Math.floor(height / rel_slide_height * slide_height);
            log_list.value.push({
                log: `[INFO] Relative Element Dimensions are "${rel_w}x${rel_h}+${rel_x}+${rel_y}"`,
                color: 'cyan'
            });
            const elem_obj = <Element>{
                id: generate_uuid_v4(),
                tag: "img",
                position: {
                    x: rel_x,
                    y: rel_y,
                    w: rel_w,
                    h: rel_h,
                    r: 0
                },
                attrs: {
                    src: element.src
                }
            };
            log_list.value.push({
                log: `[BUILD] Create Element with JSON: ${JSON.stringify(elem_obj)}`,
                color: 'yellow'
            });
            elems.push(elem_obj);
        });
        const slide_content = <Slide>{
            id: generate_uuid_v4(),
            content: elems
        }
        log_list.value.push({
            log: `[BUILD] Created Slide with JSON: ${JSON.stringify(slide_content)}`,
            color: 'yellow'
        });
        emit("ai_slide", slide_content);
        page.value++;
    };
    
    onMounted(async () => {
        layouts.value = await generate_slide_layout();
    });

</script>