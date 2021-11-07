<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <NewsPage msg="Welcome to our news page" />
  </div>
</template>

<script>
import NewsPage from "./components/NewsPage.vue";

export default {
  name: "App",
  components: {
    NewsPage,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background: rgb(52, 89, 65);
  background: linear-gradient(
    0deg,
    rgba(52, 89, 65, 1) 6%,
    rgba(0, 0, 0, 0.8354692218684349) 45%,
    rgba(21, 32, 46, 1) 78%
  );
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
