<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    />

    <v-main class="">
      <v-container>
        <v-row>
          <v-col cols="6">
            <PostConstructor
              :post="post"
              @change="post.text = $event" />
          </v-col>
          <v-col cols="6">
            <PostPreview :post="post" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="test">
              Test
            </v-btn>
          </v-col>
        </v-row>
        <!--<v-row>
          <v-col>
            <highlightjs
              autodetect
              :code="code" />
          </v-col>
        </v-row>-->
        <!--<v-row>
          <v-col>
            <pre><code
class="plaintext"
            v-html="code" /></pre>
          </v-col>
        </v-row>-->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import moment from 'moment'
  import Week from './components/calendar/views/Week';

  import PostPreview from './components/PostPreview';
  import { Post } from './models';

  import PostConstructor from './components/PostConstructor';
  // import hljs from 'highlight.js'

  export default {
    name: 'App',

    components: {
      PostConstructor,

      Week,

      PostPreview
    },

    data: () => ({
      post: new Post(),
      weekStart: moment().startOf('week').format(),
      events: [
        { date: moment().startOf('week').format() },
        { date: moment().startOf('week').add(1, 'day').format() },
        { date: moment().startOf('week').add(2, 'day').format() },
        { date: moment().startOf('week').add(2, 'day').format() },
        { date: moment().startOf('week').add(2, 'day').format() },
        { date: moment().startOf('week').add(2, 'day').format() },
        { date: moment().startOf('week').add(2, 'day').format() },
        { date: moment().startOf('week').add(2, 'day').format() },
        { date: moment().startOf('week').add(2, 'day').format() },
        { date: moment().startOf('week').add(2, 'day').format() },
        { date: moment().startOf('week').add(3, 'day').format() },
        { date: moment().startOf('week').add(4, 'day').format() },
      ]
    }),
    mounted() {
      //debugger
      document.querySelectorAll('pre code').forEach((block) => {
      // hljs.highlightBlock(block);
      });
    },
    methods: {
      async test() {

        // const forEscape = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!']
        //
        // const escape = (text) => {
        //   forEscape.forEach((char) => {
        //     text = text.replace(new RegExp(`(?<!\\\\)\\${char}`, 'g'), `\\${char}`)
        //   })
        //   return text
        // }

        //  console.log(escape(this.post.text))

        const response = await fetch('http://localhost:3300/api/post', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          // mode: 'cors', // no-cors, *cors, same-origin
          // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          // credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // redirect: 'follow', // manual, *follow, error
          // referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify({
            // text: /*escape(*/this.post.text//)
            text: this.post.markdown
          }) // body data type must match "Content-Type" header
        });
        // return await response.json();
      }
    }
  };
</script>
