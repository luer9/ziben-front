<template>
  <el-table :data="tableData" height="400px" style="width: 100%">
    <el-table-column prop="date" label="发布日期" width="100" />
    <el-table-column prop="name" label="文件" width="150" />
    <el-table-column prop="zip" label="文件大小" width="100" />
    <el-table-column prop="id" label="下载"  width="150"> 
         <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            :icon="InfoFilled"
            icon-color="red"
            title="Are you sure to download this?"
            @confirm="confirmEvent"
            @cancel="cancelEvent" >
            <template #reference>
            <el-button>Download</el-button>
            </template>
        </el-popconfirm>
    </el-table-column>
    <el-table-column prop="state" label="描述" />
    
  </el-table>
</template>

<script lang="ts" >
import { InfoFilled } from '@element-plus/icons-vue'

export default {
    name: 'ResourceFile',
    data() {
        return {
            tableData: [
            {
                id: 'id22221231e1',
                date: '2016-05-03',
                name: 'Full Release(BIOS 2022v1(beta).zip)',
                state: '完整发布文件包由BIOS核心词库（Core-data, 包含概念、术语、关系三元组以及概念的定义和语义类型数据)、语义网络（Semantic Network）、MYSQL数据库加载脚本、元数据说明文件和许可声明等组成。共现分析数据将在后续发布版本中包括进来。',
                zip: '1.1G',
            },
            {
                id: 'id22221231e1',
                date: '2016-05-03',
                name: 'Full Release(BIOS 2022v1(beta).zip)',
                state: '完整发布文件包由BIOS核心词库（Core-data, 包含概念、术语、关系三元组以及概念的定义和语义类型数据)、语义网络（Semantic Network）、MYSQL数据库加载脚本、元数据说明文件和许可声明等组成。共现分析数据将在后续发布版本中包括进来。',
                zip: '1.1G',
            },
            {
                id: 'id22221231e1',
                date: '2016-05-03',
                name: 'Full Release(BIOS 2022v1(beta).zip)',
                state: '完整发布文件包由BIOS核心词库（Core-data, 包含概念、术语、关系三元组以及概念的定义和语义类型数据)、语义网络（Semantic Network）、MYSQL数据库加载脚本、元数据说明文件和许可声明等组成。共现分析数据将在后续发布版本中包括进来。',
                zip: '1.1G',
            }
            ],
            InfoFilled:{}
        }
    },
    methods: {
        confirmEvent(){
            console.log('confirm!')
        },
        cancelEvent(){
            console.log('cancel!')
        }
    }
}

</script>
