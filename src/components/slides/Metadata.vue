<template>
    <div :class="['metadata', opened ? 'op' : 'cl']">
        <div :class="['content', opened ? 'op' : 'cl']">
            <h1>{{ name }} <span class="status">
                <span v-if="status == 0">
                    <CloudSaving />
                </span>
                <span v-else>
                    <CloudSaved />
                </span>
            </span></h1>
            <p style="word-wrap: none;">
                <i class="fa-solid fa-desktop" @click="present"></i>
                &nbsp;
                <span class="share">
                    <input type="text" placeholder="Share to..." v-model="shared_address"> &nbsp;&nbsp;
                    <i class="fa-solid fa-paper-plane fa-sm" @click="invite"></i>
                </span>
                <!-- &nbsp;&nbsp;&nbsp; -->
                <strong>{{ language == 'en' ? "Size" : "ขนาด" }}:</strong> 
                {{ width }} x {{ height }}
            </p>
        </div>
    </div>
    <i :class="['fa-solid', 'fa-chevron-up', 'fa-xs', 'chevron', opened ? 'op' : 'cl']" @click="toggle"></i> 
</template>

<script lang="ts" setup>
    import { computed, ref } from 'vue';
    import { metaState } from '@/state/is_meta_opened';
    import { supabase } from '@/lib/supabase';
    import { wait } from '@/lib/wait';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    import CloudSaving from '@/components/icons/CloudSaving.vue';
    import CloudSaved from '@/components/icons/CloudSaved.vue';

    const props = defineProps({
        name: String,
        width: String,
        height: String,
        language: String,
        cloud_status: Number,
        team_id: Number
    });

    const opened = ref(true);

    const shared_address = ref("");

    const toggle = () => {
        opened.value = !opened.value;
        metaState.value.set_is_opened(opened.value);
    };

    const invite = async (e: MouseEvent) => {
        console.log(props.team_id)
        const team_members = await supabase
            .from("Teams")
            .select("team_members")
            .eq("id", props.team_id);
        const old_team = team_members.data![0].team_members;
        console.log([...old_team, {email: shared_address.value, status: "edit"}])
        await supabase
            .from("Teams")
            .update({
                team_members: [...old_team, {email: shared_address.value, status: "edit"}]
            })
            .eq("id", props.team_id)
            .select();
        (<HTMLElement>e.target).classList.remove('fa-paper-plane');
        (<HTMLElement>e.target).classList.add('fa-check');
        (<HTMLElement>e.target).classList.add('fa-beat');
        await wait(200);
        (<HTMLElement>e.target).classList.add('fa-paper-plane');
        (<HTMLElement>e.target).classList.remove('fa-check');
        (<HTMLElement>e.target).classList.remove('fa-beat');
        shared_address.value = "";
    };

    const present = () => {
        const id = route.params.id;
        router.push(`/slide/${id}/present`);
    };

   const status = computed(() => props.cloud_status);
</script>

<style scoped>
    .metadata {
        background-color: #222;
        width: 100vw;
        height: fit-content;
        max-height: 8vh;
        transition: max-height 250ms ease-out;
    }

    .content {
        padding: 1%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        max-height: 10vh;
        transition: max-height 250ms ease-out, transform 250ms ease-out;
    }

    .content.op {
        max-height: 0;
        transform: scale(0);
    }

    .content p {
        font-size: 1.5rem;
    }

    .chevron {
        position: absolute;
        background-color: #222;
        width: fit-content;
        padding: 15px;
        border-radius: 30px;
        transition: transform 500ms cubic-bezier(0, 1.07, 0.28, 1.15), top 500ms cubic-bezier(0, 1.07, 0.28, 1.15);
        top: calc(10vh + 2rem);
        left: 50vw;
        transform: translateY(-50%);
    }

    .chevron.op {
        top: calc(2vh + 2rem);
        transform: translateY(50%) rotateX(180deg);
    }

    .metadata.op {
        max-height: 10px;
    }

    .content h1 {
        margin: 0;
        font-size: 1.5rem;
    }

    .content > * {
        margin: 0;
    }

    .share input {
        font-size: 1em;
        border-radius: 10px;
        height: 2.5vh;
        margin: 0;
    }

    .share i {
        padding: 10px;
        padding-left: 0;
        padding-right: 30px;
    }
</style>