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
          <v-col>
            <DescriptionInput v-model="post.text" />
          </v-col>
          <v-col>
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
        <v-row>
          <v-col>
            <highlightjs
              autodetect
              language="javascript"
              :code="code" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import moment from 'moment'
  import Week from './components/calendar/views/Week';
  import DescriptionInput from './components/text/DescriptionInput';
  import PostPreview from './components/PostPreview';

  export default {
    name: 'App',

    components: {
      Week,
      DescriptionInput,
      PostPreview
    },

    data: () => ({
      post: {
        text: '1,000 miles of wonder'
      },
      code: `events: [
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
      ];`,
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
    methods: {
      async test() {
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
          body: JSON.stringify(this.post) // body data type must match "Content-Type" header
        });
        return await response.json();
      }
    }
  };
</script>
