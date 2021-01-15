<template>
  <v-file-input
    show-size
    accept="image/*"
    truncate-length="15"
  />
</template>
<script>
  export default {
    name: 'FileInput',
    props: {
      post: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        menu: false
      }
    }
  }
</script>

<style lang="sass" scoped>


</style>
