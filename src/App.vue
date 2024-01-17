<template>
  <div class="padding"></div>
  <nav v-if="viewWidth >= (<number>navlang.update_width)">
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

<script setup lang="ts">
  import { ref, reactive, onMounted, onUnmounted, computed } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  import type { LangTable } from '@/lib/types';

  const viewWidth = ref(window.innerWidth);
  const lang = ref("th");
  const langs = ref(["th", "en"]);
  const change_lang = ref(change_lang_gen());
  const lang_store = reactive(<LangTable>{
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
    });

  const getWidth = () => {
    viewWidth.value = window.innerWidth
  }

  onMounted(() => {
      addEventListener('resize', getWidth);
  });

  onUnmounted(() => {
    removeEventListener('resize', getWidth);
  });

  function* change_lang_gen() {
    let i=0
    while (true) {
      yield langs.value[i]
      i++; i%=langs.value.length
    }
  }

  const langc = () => {
    let lk = change_lang.value.next().value
    lang.value = lk ?? "th";
  }

  
  const navlang = computed(() => lang_store[lang.value as ("en" | "th")] as {[index: string]: (string | number)})
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
