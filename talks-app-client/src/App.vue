<template>
  <div id="app">
    <el-row>
      <el-button type="success" round @click="showTalks">Success</el-button>

      <el-card class="box-card">
        <div class="text item">
          {{'Here are all talks: ' + allTalks }}
        </div>
      </el-card>
    </el-row>
    <router-view/>
  </div>
</template>

<script>
import { ALL_TALKS_QUERY } from '@/graphql';

export default {
  name: 'App',
  data() {
    return {
      allTalks: [],
    };
  },
  methods: {
    showTalks() {
      /* eslint-disable */
      console.log(this.allTalks);
    },
  },
  apollo: {
    // fetch all talks
    allTalks: {
      query: ALL_TALKS_QUERY,
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
