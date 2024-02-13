<template>

</template>

<script setup lang="ts">
    import { supabase } from '@/lib/supabase';
    import type { Slide } from '@/lib/types';
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    const slides = ref([] as Slide[]);
    const metadata = ref([]);

    const width = ref("0");
    const height = ref("0");

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