<template>
  <v-card
    class="constructor-card">
    <v-card-text>
      <fileInput />
      <DescriptionInput
        :post="post"
        @input="change" />
      <KeyboardConstructor
        :post="post"
        @input="change" />
    </v-card-text>
  </v-card>
</template>

<script>

  import KeyboardConstructor from './KeyboardContructor';
  import DescriptionInput from './text/DescriptionInput';
  import FileInput from './FileInput';
  export default {
    name: 'PostConstructor',
    components: {
      FileInput,
      KeyboardConstructor,
      DescriptionInput
    },
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      //value: '',

    }),
    computed: {

    },
    methods: {
      change(event) {
        this.$emit('change', event)
      }
    }
  };
</script>

<style lang="sass">

</style>
