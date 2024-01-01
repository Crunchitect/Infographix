<template>
    <div class="main">
        <Metadata :name="name" :width="width" :height="height" :language="language" />
        <div class="bottom">
            <SlideView :slides="slides" :width="width" :height="height" @new_slide="new_slide" />
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

    import Metadata from "../../components/slides/Metadata.vue";
    import SlideView from "../../components/slides/SlideView.vue";

    type Element = {
        id: string,
        tag: string,
        attrs: {[key: string]: string},
        content: string,
        position: {x: number, y: number}
    };
    type Slide = Element[];

    const props = defineProps({
        language: String
    });
    const route = useRoute();
    const router = useRouter();

    const name = ref('Loading...');
    const width = ref('0');
    const height = ref('0');
    const slides = ref([] as Slide[]);

    onMounted(async () => {
        const { data: proj_data, error } = await supabase
            .from("Projects")
            .select('*')
            .eq("id", route.params.id);
        
        if (error) router.push('/404');
        if (!proj_data) return;
        const data = proj_data[0];

        console.log(data);

        name.value = data.name;
        width.value = data.content.metadata.width;
        height.value = data.content.metadata.height;

        slides.value = data.content.data;
    });

    const new_slide = () => {
        const sid = Math.random().toString();
        slides.value.push([{id: sid}] as Slide);
    }

</script>