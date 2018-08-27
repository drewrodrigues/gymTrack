<template lang="pug">
  div
    NavBar
    #app.container
      router-view
</template>

<script>
import NavBar from './components/shared/NavBar.vue'

export default {
  name: 'app',
  components: {
    NavBar
  }
}
</script>

<style>
</style>
