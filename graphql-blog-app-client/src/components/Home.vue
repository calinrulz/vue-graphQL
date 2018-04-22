<template>
  <section class="section">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h1 class="title">Latest Posts</h1>

        <h3
          v-for="post in allPosts"
          :key="post.id"
          class="title is-5">
            <router-link :to="post.slug">
              {{ post.title }}
            </router-link>
        </h3>

        <button class="button is-warning" @click="getUsers">Get Users</button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { ALL_POSTS_QUERY } from '@/graphql';

export default {
  name: 'Home',
  data() {
    return {
      allPosts: [],
    };
  },
  // With Axios
  methods: {
    async getUsers() {
      try {
        const requestPosts = await axios.post('http://localhost:3333/graphql', {
          query: ALL_POSTS_QUERY,
        });
        const resolvePosts = requestPosts.data.data.allPosts;
        console.log(resolvePosts);
      } catch (error) {
        console.log('error: ', error);
      }
    },
  },
  // Without Axios
  apollo: {
    // fetch all posts
    allPosts: {
      query: ALL_POSTS_QUERY,
    },
  },
};
</script>

