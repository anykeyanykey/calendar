<template>
  <div id="app">
    <!--<Calendar />-->
    <div style="width: 1024px; height: 500px; border: 1px solid black">
      <Week />
    </div>
  </div>
</template>

<script>
  import Calendar from './components/calendar/calendar.vue'
  import Week from './components/calendar/views/week.vue'

  export default {
    name: 'App',
    components: {
      Calendar,
      Week
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
