<template>
  <v-card
    class="preview-card"
    max-width="344">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px" />

    <!-- <v-card-title>
      Top western road trips
    </v-card-title>-->

    <v-card-subtitle>
      <div
        v-if="!hasError"
        class="preview-text"
        v-html="post.html" />
      <v-alert
        v-else
        class="ma-0"
        dense
        outlined
        type="error">
        Markdown error!
      </v-alert>
    </v-card-subtitle>

    <!--<v-card-text>
      <v-alert
        v-if="error"
        dense
        outlined
        type="error"
      >
        Markdown error!
      </v-alert>
    </v-card-text>-->
  </v-card>
</template>

<script>

  import _ from 'lodash'

  export default {
    name: 'PostPreview',
    components: {
		
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
      hasError() {
        console.log(this.post.hasError)
        return this.post.hasError
        // return (markdown.indexOf('`') - markdown.indexOf('\\`') % 2)
      },
      // error() {
      //   return /(?<!\\)`/.test(this.previewHtml)
      // },
      previewHtml() {
        return this.post.text.replace(/(?<!\\)\*([^*]*)(?<!\\)\*/g, function (a1, a2){
          return `<b>${a2}</b>`
        }).replace(/(?<!\\)__([^_]*)(?<!\\)__/g, function (a1, a2){
          return `<u>${a2}</u>`
        }).replace(/(?<!\\)_([^_]*)(?<!\\)_/g, function (a1, a2){
          return `<i>${a2}</i>`
        }).replace(/(?<!\\)~([^~]*)(?<!\\)~/g, function (a1, a2){
          return `<s>${a2}</s>`
        }).replace(/(?<!\\)`{1,3}([^`]+)(?<!\\)`{1,3}/g, function (a1, a2){
          return `<code>${_.trim(a2)}</code>`
        }).replace(/\[([^\[\]]+)\]\(([^\(\)]+)\)/g, function (a1, a2, a3){
          return `<a href="${a3}">${a2}</a>`
        })
      },
    },
  };
</script>

<style lang="sass">
  .preview-card
    .preview-text
      a
        text-decoration: none !important
      code
        font-size: 1em !important
      pre, code
        font-weight: normal !important
        white-space: pre-wrap !important
        padding: 0 !important
        background-color: transparent !important
        color: #4E73A4 !important
</style>
