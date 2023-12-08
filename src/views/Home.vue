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
                langs: {
                    "en": {
                        "header": "Make your <span class=\"fancy-text\">dream</span> media <span class=\"fancy-text\">fast</span>.",
                        "rep": "<span class=\"fancy-text\">Avoid</span> repetitive patterns",
                        "resp": "Change every detail and look with reactive elements!",
                        "users": "Share everything with a single link!",
                        "ux": "Make videos without worrying what an MP4 is!",
                        "ai": "Just type a thought out to reality!",
                        "imexport": "Export to Powerpoint, OBJ, Image file and more!",
                        "resphead": "Fast & Responsive",
                        "usershead": "Built for collabs",
                        "uxhead": "User-Freindly",
                        "aihead": "Build Fast with AI",
                        "imexporthead": "Easy Import/Export"
                    },
                    "th": {
                        "header": "สร้างสื่อ <span class=\"fancy-text\">ในฝัน</span> ด้วย <span class=\"fancy-text\">AI</span>.",
                        "rep": "ข่ามการทำสิ่ง<span class=\"fancy-text\">ซ้ำ</span>",
                        "resp": "ทำได้อย่างรวดเร็ว",
                        "users": "แชร์ให้ทุกคนด้วยลิงก์เดียว",
                        "ux": "สร้างวิดีโอโดยไม่ต้อวรู้เรื่องไฟล์",
                        "ai": "พิมพ์ความฝันคุณออกมาเป็นความจริง",
                        "imexport": "ส่งออกเป็น Powerpoint, OBJ, Image file และอีกมากมาย!",
                        "resphead": "รวดเร็ว",
                        "usershead": "สร้างเพื่อความสามัคคี",
                        "uxhead": "ง่ายต่อการใช้",
                        "aihead": "สร้างสื่อเร็วโดย AI",
                        "imexporthead": "นำเข้า/ส่งออกอย่างง่าย"
                    }
                } as {[index: string]:any}
            }
        },
        computed: {
            lang() {
                return this.langs[this.language as string];
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