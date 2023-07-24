<template>


  <el-tabs :tab-position="tabPosition" class="demo-tabs">
    <el-tab-pane label="更新变化">
      xxxx 2022v1(beta) 发布文件
      <ResourceFile class="resourceFileStyle"/>
      </el-tab-pane>
    <el-tab-pane label="元数据说明">元数据说明——xxxx 2022v1(beta)
      <MetaData />
    </el-tab-pane>
    <el-tab-pane label="数据统计">数据统计——xxxx 2022v1(beta)
      <DataStatis/>
    </el-tab-pane>
    <el-tab-pane label="许可协议">许可协议——xxxx 2022v1(beta)
      <ArgeeMent/>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" >

import ResourceFile from '@/components/ResourceFile.vue'
import DataStatis from '@/components/DataStatis.vue'
import ArgeeMent from  '@/components/ArgeeMent.vue'
import MetaData from '@/components/MetaData.vue'
export default {
  name: 'ResourceDown',
  data() {
    return{
      tabPosition: 'left'
    }
  },
  components: {
    ResourceFile,
    DataStatis,
    ArgeeMent,
    MetaData
  }
}
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 30px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
.resourceFileStyle{
  margin-top: 30px;
}
</style>
