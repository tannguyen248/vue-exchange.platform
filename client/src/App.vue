<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard);

Vue.config.devtools = true;
export default {
  name: 'App'
};
</script>

<style>
  .underline {
    text-decoration: underline;
  }
</style>
