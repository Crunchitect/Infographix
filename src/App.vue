<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="padding"></div>
  <nav v-if="viewWidth >= navlang.update_width">
    <div class="left">
      <span class="pad"></span>
      <span class="fancy-text"><strong>Infographix</strong></span>
      <span class="pad"></span>
      <router-link to="/">{{ navlang.home }}</router-link>
      <router-link to="/projects">{{ navlang.projects }}</router-link>
      <router-link to="/about">{{ navlang.about }}</router-link>
    </div>
    <div class="right">
        <span @click="langc">{{ navlang.change_lang }}</span>
        <router-link to="/tuto">{{ navlang.tuto }}</router-link>
        <router-link to="/sign-in">{{ navlang.signin }}</router-link>
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
        <span @click="langc"><i class="fa-solid fa-globe"></i></span>
        <router-link to="/tuto"><i class="fa-solid fa-question-circle"></i></router-link>
        <router-link to="/sign-in"><i class="fa-solid fa-user-plus"></i></router-link>
    </div>
  </nav>
  <router-view :language="lang"></router-view>
</template>

<script lang="ts">
  export default {
    name: "App",
    data() {
      return {
        viewWidth: window.innerWidth,
        lang: "th",
        langs: ["th", "en"],
        change_lang: this.change_lang_gen(),
        lang_store: {
            "en": {
                "home": "Home",
                "projects": "Projects",
                "about": "About",
                "tuto": "How to use",
                "signin": "Sign In",
                "change_lang": "EN",
                "update_width": 960
            },
            "th": {
                "home": "หน้าหลัก",
                "projects": "โปรเจกต์",
                "about": "เกี่ยวกับเรา",
                "tuto": "คู่มือการใช้",
                "signin": "เข้าสู่ระบบ",
                "change_lang": "TH",
                "update_width": 1230
            }
        } as {[index: string]:any}
      }
    },
    mounted() {
      addEventListener('resize', this.getWidth)
    },
    unmounted() {
      removeEventListener('resize', this.getWidth)
    },
    methods: {
      // Syntax is weird
      *change_lang_gen() {
          let i=0
          while (true) {
            yield this.langs[i]
            i++; i%=this.langs.length
          }
      },
      getWidth() {
        this.viewWidth = window.innerWidth
      },
      langc() {
        let lk = this.change_lang.next().value
        this.lang = lk;
        fetch("src/langs/navbar.json")
        .then(r => r.json())
        .then(data => this.navlang = data[this.lang])
      }
    },
    computed: {
      navlang() {
        return this.lang_store[this.lang as string] as any;
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
