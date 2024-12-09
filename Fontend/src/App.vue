<template>
  <div class="font-thai">
    <MainMenu />
    <div :class="$route.path === '/aboutus' ? '' : 'container mt-3'">
      <router-view />
    </div>
    <FooterWeb />

  </div>
</template>

<script>
import MainMenu from "./components/MainMenu.vue";
import FooterWeb from "./contents/FooterWeb.vue";
import slide1 from './assets/slide1.png';

export default {
  name: "App",
  components: {
    MainMenu,
    FooterWeb,
  },
  data() {
    return {
      slide1,
    };
  },
};
</script>

<style>
.font-thai {
  /* font-family: "IBM Plex Sans Thai", sans-serif;
  font-weight: 300;
  font-style: normal; */

  font-family: "IBM Plex Sans Thai", sans-serif;
  font-weight: 400;
  font-style: normal;

}
</style>
