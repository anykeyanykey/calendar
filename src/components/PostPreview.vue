<template>
  <v-card
    class="mx-auto"
    max-width="344">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px" />

    <!-- <v-card-title>
      Top western road trips
    </v-card-title>-->

    <v-card-subtitle>
      <span v-html="previewHtml" />
    </v-card-subtitle>
  </v-card>
</template>

<script>
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
      previewHtml() {
        return this.post.text.replace(/(?<!\\)\*([^*]*)(?<!\\)\*/g, function (a1, a2){
          return `<b>${a2}</b>`
        }).replace(/(?<!\\)__([^_]*)(?<!\\)__/g, function (a1, a2){
          return `<u>${a2}</u>`
        }).replace(/(?<!\\)_([^_]*)(?<!\\)_/g, function (a1, a2){
          return `<i>${a2}</i>`
        }).replace(/(?<!\\)~([^~]*)(?<!\\)~/g, function (a1, a2){
          return `<s>${a2}</s>`
        }).replace(/(?<!\\)`([^`]*)(?<!\\)`/g, function (a1, a2){
          return `<code>${a2}</code>`
        }).replace(/\[([^\[\]]+)\]\(([^\(\)]+)\)/g, function (a1, a2, a3){
          return `<a href="${a3}">${a2}</a>`
        })
      },
    },
  };
</script>
