<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="padding"></div>
  <nav>
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
  <router-view></router-view>
</template>

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
