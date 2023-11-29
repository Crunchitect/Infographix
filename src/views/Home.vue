<template>
    <div class="padding"></div>
    <h1 class="big">Make your <span class="fancy-text">dream</span> media <span class="fancy-text">fast</span>.</h1>
    <div class="center">
        <video muted autoplay loop src="../assets/videos/showcase.mp4"></video>
    </div>
    <div class="padding"></div>
    <div class="row">
        <div class="col">
            <h1 ><span class="fancy-text">Avoid</span> repetitive patterns</h1>
            <p >Make AI manage the repetitive parts for you, <br> Make your dreams fast and automatic.</p>
        </div>
        <video muted autoplay loop src="../assets/videos/autocomplete.mp4" class="auto"></video>
    </div>
    <div class="padding"></div>
    <div class="padding"></div>

    <Card heading="Fast & Responsive" icon="bolt">
        <p>Change every detail and look with reactive elements!</p>
    </Card>
    <Card heading="Built for collabs" icon="users">
        <p>Share everything with a single link!</p>
    </Card>
    <Card heading="User-Freindly" icon="user-plus">
        <p>Make videos without worrying what an MP4 is!</p>
    </Card>
    <Card heading="Build Fast with AI" icon="magic-wand-sparkles" rev="true">
        <p>Just type a thought out to reality!</p>
    </Card>
    <Card heading="Easy Import&shy;/Export" icon="arrow-up-from-bracket" rev="true">
        <p>Export to Powerpoint, OBJ, Image file and more!</p>
    </Card>
</template>

<script lang="ts">
    import Card from '../components/Card.vue'
    export default {
        name: "Home",
        components: { Card }
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