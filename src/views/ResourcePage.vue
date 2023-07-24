<template>


  <el-row :gutter="20">
    <el-col :span="2"><div /></el-col>
    <el-col :span="20">
        <div class="grid-content bg-purple">
          <h1> xxxx数据已公开 </h1>

          <h4> <router-link to="/documentPage">  xxxx知识图谱构建技术 </router-link>已同步公开，包含总体技术路线和实体对齐、术语聚合、关系抽取、术语翻译等技术研究论文。</h4>
          <hr/>
          <ResourceDown class="resouceStyle" /> 
        </div>
    </el-col>
    <el-col :span="4"><div /></el-col>
  </el-row>
   
</template>

<script>
import ResourceDown from '@/components/ResourceDown.vue'
export default {
    name: 'ResourcePage',
    components: {
        ResourceDown
    }
}
</script>
<style scoped>
.grid-content.bg-purple {
    /* border: 1px solid red; */
    padding: 20px;
    background-color: white;
    text-align: left;
    box-shadow: 0 3px 6px rgba(62, 64, 65, 0.24),0 0 1px rgba(79, 81, 82, 0.12);
    /* height: 1000px; */
}
a {
color: #5a9cf8;
text-decoration: none;
}

.router-link-active {
text-decoration: none;
}

.resouceStyle {
    margin-top: 40px;
}
</style>