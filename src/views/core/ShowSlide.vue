<template>
    <div class="slide"></div>
    <div ref="ctx" class="ctx" id="slide_edit_ctx" @keydown.left="num--" @keydown.right="num++" @click="num++">
            <component
                :is="(<AnytoAny>element).tag" 
                :id="(<AnytoAny>element).id"
                :style="{
                    ...((<AnytoAny>element).styles),
                    color: 'black',
                    'text-align': 'center',
                    position: 'fixeds',
                    left: `${element!.position.x / 19.20 + 20}vw`,
                    top: `${element!.position.y / 10.80 + 20}vh`,
                    width: `${element!.position.w / 19.20 + 0.1}vw`,
                    height: `${element!.position.h / 10.80 + 0.1}vh`,
                    'object-fit': 'cover',
                    'z-index': '6969'
                }"
                v-bind="(<AnytoAny>element).attrs"
                v-html="sanitizeHtml((<AnytoAny>element).content)"
                v-for="(element, index) in slides[num]?.content"
            >
            </component>
    </div>
    <button class="btn left" @click="num--"><i class="fa-solid fa-chevron-left"></i></button>
    <button class="btn right" @click="num++"><i class="fa-solid fa-chevron-right"></i></button>
</template>

<script setup lang="ts">
    import { supabase } from '@/lib/supabase';
    import type { AnytoAny, Slide } from '@/lib/types';
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import sanitizeHtml from 'sanitize-html';

    const route = useRoute();
    const router = useRouter();

    const slides = ref([] as Slide[]);
    const metadata = ref([]);

    const width = ref("0");
    const height = ref("0");
    const num = ref(0);

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    onMounted(async () => {
        const { data: proj_data, error } = await supabase
            .from("Projects")
            .select('*')
            .eq("id", route.params.id);

        if (error) router.push('/404');
        if (!proj_data) return;
        const data = proj_data[0];

        if (!data) router.push('/slide/404');
        width.value = data.content.metadata.width;
        height.value = data.content.metadata.height;
        metadata.value = data.content.metadata;

        slides.value = data.content.data;
    });
</script>

<style scoped>
    .slide {
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: white;
        z-index: 6969;
    }

    .ctx * {
        position: absolute;
        z-index: 6969;
    }

    .btn {
        z-index: 696969;
        background-image: none !important;
        background-color: #222e !important;
        font-size: 1rem;
        /* margin: 20px; */
        border-radius: 10px;
        outline: none;
        border: 1px solid black;
        color: white;
    }

    .left {
        position: absolute;
        left: 10vw;
        top: 50vh;
        transform: translate(-50%, -50%);
    }
    
    .right {
        position: absolute;
        right: 10vw;
        top: 50vh;
        transform: translate(-50%, -50%);
    }
</style>