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
      search() {
        let url = '/api/term/selectByName';
        // let params = {
        //   name: this._input
        // }
        // this.$ajax.get(url, {
        //         params: {
        //             name: _content
        //         }
        //     })
        //     .then(response => {
        //         if(response.data.length !== 0) {
        //             // console.log(">>>>> " + response.data)
        //             // 这里需要转换一下数据
        //             const dataSet = this.dataFormat(response.data)

        //             this.originNodes = dataSet.coreNode; //核心
        //             this.smNodes = dataSet.smNodes;
        //             this.d3jsonParser(response)
        //             this.articleInfor = dataSet.coreNode;
        //             this.article = this.articleInfor
        //         //    console.log(">>>> " + this.data.nodeList)
        //         }else {
        //              this.$alert('抱歉！暂无此术语查询！', '提示', {
        //                 confirmButtonText: '确定',
        //                 type: 'warning'
        //             }).then(() => {
        //                 // 点击确定进行的操作
        //                 this.$router.go(-1)
        //             })
        //         }
                
        //     })
        //     .catch(err => console.log("[error]" + err));
      }
    },
    created() {  
       
    },
    computed: {
    },
    setup() {
      const _router = useRouter();
      const handle = (row: any) => {
        _router.push({
            name: "infor",
            params: {
              content: row.name,
              // type: select.value
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