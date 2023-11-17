<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="padding"></div>
  <nav v-if="viewWidth >= 960">
    <div class="left">
      <span class="pad"></span>
      <span class="fancy-text"><strong>Infographix</strong></span>
      <span class="pad"></span>
      <router-link to="/">Home</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div class="right">
        <router-link to="/tuto">Start</router-link>
        <router-link to="/sign-in">Sign In</router-link>
        <router-link to="/sign-up">Sign Up</router-link>
    </div>
  </nav>
  <nav v-else>
    <div class="left">
      <span class="pad"></span>
      <span class="fancy-text" v-if="viewWidth >= 540"><strong>Infographix</strong></span>
      <span class="fancy-text" v-else><img src="./assets/icon.png" alt=""></span>
      <span class="pad"></span>
      <router-link to="/"><i class="fa-solid fa-house"></i></router-link>
      <router-link to="/projects"><i class="fa-solid fa-folder-open"></i></router-link>
      <router-link to="/about"><i class="fa-solid fa-info"></i></router-link>
    </div>
    <div class="right">
        <router-link to="/tuto"><i class="fa-solid fa-arrow-right"></i></router-link>
        <router-link to="/sign-in"><i class="fa-solid fa-right-to-bracket"></i></router-link>
        <router-link to="/sign-up"><i class="fa-solid fa-user-plus"></i></router-link>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script lang="ts">
  export default {
    name: "App",
    data() {
      return {
        viewWidth: window.innerWidth
      }
    },
    mounted() {
      addEventListener('resize', this.getWidth);
    },
    unmounted() {
      removeEventListener('resize', this.getWidth);
    },
    methods: {
      getWidth() {
        this.viewWidth = window.innerWidth;
      }
    }
  }
</script>

<style scoped>
  .pad {
    padding-left: 2.5vw;
  }

  .padding {
    padding-top: 2vh;
  }

  nav {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
  }

  nav * {
    font-size: 2rem;
  }


  .left {
    flex-grow: 1;
  }

</style>
