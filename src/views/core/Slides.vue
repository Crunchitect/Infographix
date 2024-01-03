<template>
    <div class="main">
        <Metadata :name="name" :width="width" :height="height" :language="language" />
        <div class="bottom">
            <SlideView :slides="slides" :width="width" :height="height" @new_slide="new_slide" @select="select_slide" />
            <SlideEditor :slide="slides[selected_slide_index]" :width="width" :height="height" />
        </div>
    </div>
</template>

<style scoped>
    .main {
        width: 100vw;
        height: 92.2vh;
        display: flex;
        flex-flow: column nowrap;
    }

    .bottom {
        flex-grow: 1;
        display: flex;
        flex-flow: row nowrap;
    }
</style>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { supabase } from "@/lib/supabase";
    import { generate_uuid_v4 } from '@/lib/generate_uuid';
    import { unproxify } from '@/lib/unproxify';

    import Metadata from "@/components/slides/Metadata.vue";
    import SlideView from "@/components/slides/SlideView.vue";
    import SlideEditor from '@/components/slides/SlideEditor.vue';

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
        language: String
    });
    const route = useRoute();
    const router = useRouter();

    const name = ref('Loading...');
    const width = ref('0');
    const height = ref('0');
    const slides = ref([] as Slide[]);

    const metadata = ref({} as {[key: string]: any});
    const loading_done = ref(false);

    let selected_slide_index = ref(0);

    onMounted(async () => {
        const { data: proj_data, error } = await supabase
            .from("Projects")
            .select('*')
            .eq("id", route.params.id);
        
        if (error) router.push('/404');
        if (!proj_data) return;
        const data = proj_data[0];


        name.value = data.name;
        width.value = data.content.metadata.width;
        height.value = data.content.metadata.height;
        metadata.value = data.content.metadata;

        slides.value = data.content.data;

        loading_done.value = true;
    });

    const new_slide = () => {
        const sid = generate_uuid_v4();
        slides.value.push({id: sid, content:[]} as Slide);
    };

    const select_slide = (index: number) => {
        selected_slide_index.value = index;
    };

    setInterval(async () => {
        if (!loading_done.value) return "cope";
        const slug = {
            name: name.value,
            type: "slide",
            content: {
                metadata: unproxify(metadata.value),
                data: unproxify(slides.value)
            }
        };
        const { data, error } = await supabase
                                    .from("Projects")
                                    .update({
                                        content: slug.content
                                    })
                                    .eq("id", route.params.id)
                                    .select();
    }, 500);

</script>