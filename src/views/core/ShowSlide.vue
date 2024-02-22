<template>
    <div ref="ctx" class="ctx" id="slide_edit_ctx" @keydown.left="num--" @keydown.right="num++" @click="num++">
            <component
                :is="(<AnytoAny>element).tag" 
                :id="(<AnytoAny>element).id"
                :style="{
                    ...((<AnytoAny>element).styles),
                    color: 'black',
                    'text-align': 'center',
                    position: 'absolute',
                    left: `${(<AnytoAny>element).position.x + 250}px`,
                    top: `${(<AnytoAny>element).position.y + 200}px`,
                    width: `${(<AnytoAny>element).position.w}px`,
                    height: `${(<AnytoAny>element).position.h}px`,
                    'object-fit': 'cover'
                }"
                v-bind="(<AnytoAny>element).attrs"
                v-html="(<AnytoAny>element).content"
                v-for="(element, index) in slides[num]?.content"
            >
            </component>
    </div>
</template>

<script setup lang="ts">
    import { supabase } from '@/lib/supabase';
    import type { AnytoAny, Slide } from '@/lib/types';
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    const slides = ref([] as Slide[]);
    const metadata = ref([]);

    const width = ref("0");
    const height = ref("0");
    const num = ref(0);

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
        console.log(width.value, height.value, slides.value)
    });
</script>

<style scoped>
    .ctx {
        position: absolute;
        left: 250px;
        top: 200px;
        width: 1920px;
        height: 1080px;
        background-color: white;
        border-radius: 10px;
    }
</style>