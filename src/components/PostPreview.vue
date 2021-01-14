<template>
  <div>
    <v-card
      class="preview-card">
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px" />

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
    </v-card>
    <div
      v-for="(row,i) in post.rows"
      :key="i"
      style="margin: 0 -6px"
      class="d-flex flex-row mt-3">
      <div
        v-for="(column, k) in row"
        :key="k"
        style="margin: 0 6px"
        class="flex-grow-1">
        <v-btn block>
          {{ column.text }}
        </v-btn>
      </div>
    </div>
  </div>
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
