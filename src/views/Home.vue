<template>
    <div class="main">
        <div class="padding"></div>
        <h1 class="big" v-html="lang.header"></h1>
        <div class="centerx">
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
    </div>
    <Dialogue :opened="opened">
        <h1>V1.0.0 Beta</h1>
        <center><img src="../assets/landing/imgs/release.png" alt=""></center>
        <p>Yup! Infographix <strong>V1.0.0 Beta</strong> is out!</p>
        <p>Further notice will come soon, But for now enjoy the beta testing. You may report the bugs in <a href="https://docs.google.com/forms/u/1/d/e/1FAIpQLSd1NtobKaywVGUDsOxuQ_K97g6nVEzXgOOoLypzRI9nqfaWrQ/viewform?usp=send_form">the issues form</a></p>
        <p>🎉🎉<strong>Events:</strong> The <a href="/place">r/place</a> for beta testing is out! Enjoy :]</p>
    </Dialogue>
</template>

<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import { ref, computed, reactive, onMounted } from 'vue';
    import Card from '../components/Card.vue'
    import Dialogue from '../components/Dialogue.vue'
    import anime from 'animejs';

    const route = useRoute();
    const router = useRouter();
    if (route.hash) router.push(`/projects${route.hash}`)

    const props = defineProps({
        language: String
    });

    const opened = ref(false);

    type LangTable = {"en": {[index: string]: string}, "th": {[index: string]: string}};
    const langs = reactive(<LangTable>{
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
                        "rep": "ข้ามการทำสิ่ง<span class=\"fancy-text\">ซ้ำ</span>",
                        "resp": "ทำได้อย่างรวดเร็ว",
                        "users": "แชร์ให้ทุกคนด้วยลิงก์เดียว",
                        "ux": "สร้างวิดีโอโดยไม่ต้องรู้เรื่องไฟล์",
                        "ai": "พิมพ์ความฝันคุณออกมาเป็นความจริง",
                        "imexport": "ส่งออกเป็น Powerpoint, OBJ, Image file และอีกมากมาย!",
                        "resphead": "รวดเร็ว",
                        "usershead": "สร้างเพื่อความสามัคคี",
                        "uxhead": "ง่ายต่อการใช้",
                        "aihead": "สร้างสื่อเร็วโดย AI",
                        "imexporthead": "นำเข้า/ส่งออกอย่างง่าย"
                    }
    });

    const lang = computed(() => langs[props.language as ("en" | "th")]);

    onMounted(() => {
        opened.value = true;

        let d = document.querySelector('.center');
        let randlist = [...Array(20).keys()].sort(() => .5 - Math.random())
        for (let i=0; i<18; i++) {
            let div = document.createElement('div');
            div.classList.add('box');
            div.style.minWidth = "clamp(250px, 10vw, 310px)";
            div.style.height = "clamp(125px, 10vw, 150px)";
            div.style.opacity = "0";
            div.style.borderRadius = "10px 10px";
            div.style.transform = `rotateX(180deg)`;
            // let index = Math.floor(Math.random() * 16).toString(16);
            // div.style.backgroundColor = `#${index.repeat(3)}`
            div.style.backgroundColor = "#222";
            div.style.border = "1px solid white";

            div.innerHTML = randlist[i].toString();
            // console.log(fetch(`/video/${randlist[i]}`))

            d?.appendChild(div);
        }
        anime({
            targets: ".box",
            translateX: (_: HTMLElement, i: number, n: number) => 
                `${(i - n/2) * -150}px`
            ,
            translateY: (_: HTMLElement, i: number, n: number) => 
                -((i * (Math.random() * 50)) % 600)
            ,
            delay: anime.stagger(100),
            // scaleX: 5,
            scale: () => 2 + (Math.random() / 4),
            rotateX: 0,
            opacity: 1
        })
    });
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');

    .main {
        overflow-x: hidden;
        perspective: 100vw;
    }

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
        min-height: 600px;
        width: 60vw;
        margin: auto;
        align-items: flex-end;
        gap: clamp(150px, 5vw, 600px);
        /* gap: 20px; */
    }

    .centerx {
        display: flex;
        flex-direction: row;
        justify-content: center;
        min-height: 600px;
        width: 60vw;
        margin: auto;
        align-items: flex-end;
        gap: clamp(150px, 5vw, 600px);
        /* gap: 20px; */
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

    .lol {
        font-family: 'Papyrus', 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
    }

    h1.lol {
        font-size: 5rem;
    }

    p.lol {
        font-size: 4rem;
    }

    .box {
        width: 100%;
        /* height: 100%; */
        background-color: white;
    }
</style>