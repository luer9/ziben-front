<template>
     <el-table
       :data="tableData"
       v-if="tableData == '' ? false : true "
        style="60%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        height="400"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
        id="termlist"
        @row-click="handle"
        >
        <!-- <el-table-column
          prop="id"
          label="ID"
          width="60"
        ></el-table-column> -->
        <el-table-column
          prop="name"
          label="术语名称"
        >
        </el-table-column>
     </el-table>
</template>

<script lang="ts"  >
import { alertProps } from 'element-plus/lib/components'
import { useRouter } from 'vue-router'
import {useRoute} from "vue-router";
export default {
    name: 'AnswerInfor',
    components: {
      
    },
    props: {
       tableData: {
         type: Object
       }
    },
    data() {
      return {
        _input: '' // input 框绑定的输入值
      }
    },
    methods: {
   
    },
    created() {  
      // const route = useRoute();
      // const _content = route.params.content;
      // const _type = route.params.type;
      //   // 没有参数 跳转 别的页面
      // console.log("参数接收到了！！", _content)
       
    },
    computed: {
    },
    setup() {
      // console.log("参数接收到了》〉》", useRoute().params.content)
      const  curterm = useRoute().params.content
      const  _type = useRoute().params.type
      const _router = useRouter();
      const handle = (row: any) => {
        _router.push({
            name: "infor",
            params: {
              content: row.name,
              curTerm: curterm,
              type: _type
            }
        })     
      }
      return {
         handle
      }
  },
}
</script>
<style scoped>
  #termlist {
 
    cursor: pointer;
  }
</style>