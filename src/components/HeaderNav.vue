<template>
 <el-affix :offset="0">
     <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    text-color="#ffffff"
    active-text-color="#ffffff"
    @select="handleSelect"
  >
  
      
  
   <el-menu-item index="/manual" > 
      <router-link to="/manual"> <strong>使用手册</strong> </router-link>
  </el-menu-item>
  <el-menu-item index="/vagueTerm" > 
      <router-link to="/vagueTerm"> <strong>术语模糊搜索</strong> </router-link>
      </el-menu-item>
   <el-menu-item index="/graphViewPage">
      <router-link to="/graphViewPage"><strong>高频词知识图谱</strong> </router-link>
    </el-menu-item>
          <el-menu-item index="/allTerm" > 
      <router-link to="/allTerm"> <strong>术语列表</strong> </router-link>
    </el-menu-item>
  <el-menu-item index="/introduction">
        <router-link to="/introduction"> <strong> 项目简介 </strong> </router-link>
      </el-menu-item>
  <el-menu-item index="/">
       <router-link to="/">  <strong>主页 </strong></router-link>
    </el-menu-item>
   
    
    <!-- <router-link to="/"> <img src="@/assets/logo.png" class="image"> </router-link> -->
     
   

    
     <!-- <el-menu-item index="3"> -->
        <!-- <router-link to="/graphViewPage">图谱全览 </router-link> -->
        <!-- <router-link :to="{ name:'graphViewPage',params:{ initialNode:'《资本论》' } }"> <strong> 图谱全览</strong>  </router-link> -->
        <!-- </el-menu-item> -->
   
    
   <!-- <el-menu-item index="4">
       <router-link to="/PdfPage">  pdf </router-link>
       </el-menu-item> -->
    <!-- <el-menu-item index="3" > <router-link to="/resourcePage"> 资源下载 </router-link> </el-menu-item> -->
     <!-- <el-menu-item index="4" > <router-link to="/emptyPage"> API接入</router-link> </el-menu-item> -->
    
    <!-- <el-sub-menu index="5"> -->
      <!-- <template #title>Demo</template> -->
      <!-- <el-menu-item index="5-1"> <router-link to="/QAPage"> 问答</router-link> </el-menu-item> -->
      <!-- <el-menu-item index="5-2"> <router-link to="/about"> 知识推理 </router-link></el-menu-item> -->
      <!-- <el-menu-item index="5-3"> <router-link to="/graphViewPage">图谱全览 </router-link></el-menu-item> -->
      <!-- <el-menu-item index="5-4"> <router-link to="/infor"> 资源信息 </router-link></el-menu-item> -->
    <!-- </el-sub-menu> -->
    <!-- <el-menu-item index="6" disabled>等待开发</el-menu-item> -->
    <!-- <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu> -->
    <!-- <el-menu-item index="3" disabled>Info</el-menu-item> -->
    <!-- <el-menu-item index="4">Orders</el-menu-item> -->
  </el-menu>
  </el-affix>
</template>
<script>
import {User} from '@element-plus/icons-vue'
import { ref } from 'vue'
export default {
  name: "Nav",
  data() {
    return {
      activeIndex: "/"
    }
  },
  computed: {
    activeIndex: function() {
      return this.$route.path;
    }
  },
  created() {
    
  },
  watch:{
    activeIndex() {
      return this.$route.path;
    },
    $route() {
      // console.log(">>>" + this.$route.path)
      this.handleSelect(this.$route.path);
    },
  },
  methods: {
    handleSelect(keyPath) {
      this.activeIndex = keyPath
        // this.$router.push(keyPath);
    },
  }
}
</script>

<style scoped>

    a {
      text-decoration: none;
    }
    
    .router-link-active {
      text-decoration: none;
    }

    /deep/.el-menu .el-menu-item:hover{
    outline: 0 !important;
    color: #292828 !important;
    background: linear-gradient(270deg, #F2F7FC 0%, #FEFEFE 100%)!important;
    }
    /* /deep/.el-menu .el-menu-item.is-active {
        color: #2E95FB !important;
        background: linear-gradient(270deg, #F2F7FC 0%, #FEFEFE 100%)!important;
    }
    .el-submenu /deep/.el-submenu__title:hover {
      color: #2E95FB !important;
      background: linear-gradient(270deg, #F2F7FC 0%, #FEFEFE 100%)!important;
    } */

    .el-menu-demo{
      display: flex;
      flex-direction: row-reverse;
      /* background-color: #507fd6; */
      background-color: #90271c;
    }
    /* el-menu-item{
      font: #ffffff;
    } */
.image {
  width:40px;
  /* height:60px; */
  position: fixed;
  float:left;
  left:3%;
  top:8px;
  
  /* background-color: white; */
}
/* #title{
  border: 1px solid red;
  float: left;
  margin-top: 12px;  
  font-size: 25px;
  z-index: 1px;
  font-style: white;
  background-color: #507fd6;
} */
.el-menu{
  /* position: relative; */
}
.el-menu::before{
content:'本术语知识库建设由国家社会科学基金资助';
font-family:  '微软雅黑' !important;
position: absolute;
left: 10px;
top: 10px;
font-size: 25px;
color: white;
font-weight: bold;
text-shadow: 2px 2px 2px rgb(66, 66, 66);
}
</style>