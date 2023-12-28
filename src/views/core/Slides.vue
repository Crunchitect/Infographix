<template>
    <Metadata
        :name="name"
        :width="width"
        :height="height"
    />
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { supabase } from "@/lib/supabase";

    import Metadata from "../../components/slides/Metadata.vue";

    const props = defineProps({
        language: String
    });
    const route = useRoute();
    const router = useRouter();

    const name = ref('Loading...');
    const width = ref('0');
    const height = ref('0');

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
    });

</script>