<template>
  <v-menu
    v-model="menu"
    open-on-hover
    offset-y
  >
    <template #activator="{ on, attrs }">
      <div
        class="week-point"
        v-bind="attrs"
        v-on="on"
      />
    </template>
    123
  </v-menu>
</template>

<script>
  export default {
    name: 'WeekPoint',
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
    .week-point
        border-radius: 50%
        height: 20px
        width: 20px
        background: red
        display: inline-block
        margin: 2px

</style>
