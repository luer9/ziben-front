<template>
    
    

    <el-row :gutter="20">
    <el-col :span="4"><div /></el-col>
    <el-col :span="16">
        <div class="grid-content bg-purple">
          <h1> 《〈资本论〉汉英术语知识库》简介</h1>
            <span> 本项目由国家社会科学基金资助</span>
           
          <DocumentInfor/>
          <br/>
          <div style="text-align: center; ">
              <img src="@/assets/maxs.jpg" style="width:50%;"/>
          </div>
        
        </div>
         
    </el-col>
     
    <el-col :span="4"><div /></el-col>
  </el-row>
</template>

<script>
import DocumentInfor from '@/components/DocumentInfor.vue'
export default {
    name: 'DocumentPage',
    components: {DocumentInfor}
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
span {
    color: #c1c4cb;
    font-family: '宋体', 'Times New Roman', Times, serif;
    font-size: 14px;
    display: block;
    margin-top: -20px;
    margin-left: 20px;
}
h1{
    font-family: '宋体', 'Times New Roman', Times, serif;
}
</style>