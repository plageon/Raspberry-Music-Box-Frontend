<template>
  <div id="app">
    <div class="app-container">
      <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
      />
      <HomeHeader></HomeHeader>
      <router-view></router-view>
      <HomeFooter></HomeFooter>
    </div>
  </div>
</template>

<script>
import HomeHeader from "@/components/HomeHeader";
import HomeFooter from "@/components/HomeFooter";
export default {
  name: 'App',
  components: {
    HomeHeader,
    HomeFooter,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
