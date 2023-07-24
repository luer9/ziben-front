<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="《资本论》汉英术语知识库"/>
    <!-- <project-infor/> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import ProjectInfor from '@/components/ProjectInfor.vue'
@Options({
  components: {
    HelloWorld,
    ProjectInfor
  },
})
export default class HomeView extends Vue {}
</script>
