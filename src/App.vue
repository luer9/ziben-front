<template>
  
   <div class="common-layout">
    <el-container  :style="background">
      <el-header> 
        <!-- <img src="@/assets/logo.png" class="imga"> -->
        <Header /> 
      </el-header>
      <el-main>
        <div id="v-content" v-bind:style="{minHeight: Height+'px'}">
          <router-view/> 
        </div>
      </el-main>
       <el-backtop :right="100" :bottom="100" />
      <el-footer>Copyright © 2023</el-footer>
    </el-container>
  </div>
  <!-- <nav> -->
    
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    
  <!-- </nav> -->
 
  
</template>

<script> 
import Header from '@/components/HeaderNav.vue'
export default {
  name: 'App',
  components: {
    Header
  },
  data(){
    return {
      Height: 0,
      // 背景图设置
      background: {
         backgroundImage: 'url(' + require('@/assets/background1.png') + ')',
         backgroundPosition: 'center top'
      }
    }
  },
  mounted() {
        //动态设置内容高度 让footer始终居底   header+footer的高度是100
    this.Height = document.documentElement.clientHeight - 100;  
　　//监听浏览器窗口变化　
    window.onresize = ()=> {this.Height = document.documentElement.clientHeight -100}
  }
}
</script>
<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: '宋体', 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }

</style>
