<template>
    <div class="padding"></div>
    <h1 class="big" v-html="lang.header"></h1>
    <div class="center">
        <video muted autoplay loop src="../assets/videos/showcase.mp4"></video>
    </div>
    <div class="padding"></div>
    <div class="row">
        <div class="col">
            <h1 v-html="lang.rep" style="font-size: 4rem;"></h1>
            <p v-html="lang.ux" style="font-size: 2rem;"></p>
        </div>
        <video muted autoplay loop src="../assets/videos/autocomplete.mp4" class="auto"></video>
    </div>
    <div class="padding"></div>
    <div class="padding"></div>

    <Card :heading="lang.resphead" icon="bolt">
        <p>{{ lang.resp }}</p>
    </Card>
    <Card :heading="lang.usershead" icon="users">
        <p>{{ lang.users }}</p>
    </Card>
    <Card :heading="lang.uxhead" icon="user-plus">
        <p>{{ lang.ux }}</p>
    </Card>
    <Card :heading="lang.aihead" icon="magic-wand-sparkles" rev="true">
        <p>{{ lang.ai }}</p>
    </Card>
    <Card :heading="lang.imexporthead" icon="arrow-up-from-bracket" rev="true">
        <p>{{ lang.imexport }}</p>
    </Card>
</template>

<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    const route = useRoute();
    const router = useRouter();
    if (route.hash) router.push(`/google-auth${route.hash}`)
</script>

<script lang="ts">
    import Card from '../components/Card.vue'
    export default {
        name: "Home",
        components: { Card },
        props: ["language"],
        data() {
            return {
                lang: {} as any
            }
        },
        mounted() {
            fetch("/langs/home.json")
                .then(r => r.json())
                .then(data => this.lang = data[this.language])
        },
        watch: {
            language(n) {
                console.log(n)
                fetch("/langs/home.json")
                    .then(r => r.json())
                    .then(data => this.lang = data[n])
                    .then(() => console.log(this.lang))
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
    h1 {
        text-align: center;
        font-size: 2rem;
    }
    div.padding {
        padding-top: 3vh;
    }

    h1.big {
        font-size: 4rem;
    }

    video {
        width: 80vw;
    }

    .center {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
    }

    .col {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

    .col > p {
        text-align: center;
        font-size: large;
    }

    .auto {
        width: 50vw;
    }

    .lol {
        font-family: 'Papyrus', 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
    }

    h1.lol {
        font-size: 5rem;
    }

    p.lol {
        font-size: 4rem;
    }
</style>