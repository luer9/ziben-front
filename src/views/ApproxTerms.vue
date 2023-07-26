<template>

  <el-row :gutter="20">
    <el-col :span="4"><div /></el-col>
    <el-col :span="16">
        <div class="grid-content bg-purple">
          <div style="font-size:60px;font-weight:bold; padding:30px; color:#000000 ">
            《资本论》汉英术语知识库
          </div>
          <div style="font-size:30px;font-weight:bold; margin-bottom: 10px; color:#000000 ">
            <!-- {{input}}  -->
            近似术语
          </div>
       
          <div style="width: 80%; margin: 0 auto;">
            <AnswerInfor v-bind:tableData='tableData'  />
          </div>
        </div>
    </el-col>
    <el-col :span="4"><div /></el-col>
  </el-row>
   
</template>

<script >
import AnswerInfor from '@/components/AnswerInfor.vue'
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import {useRoute} from "vue-router";
export default {
    name: 'ApproxTerms',
    components: {
        AnswerInfor
    },
    data() {
      return {
          tableData: [],
          input: ''
      }
    },
    created() {
       const route = useRoute();
        const _content = route.params.content;
        const _type = route.params.type;
        // 没有参数 跳转 别的页面
        // console.log("参数接收到了！appro！", _content, " " , _type)
        this.input = _content
        // this.article = this.articleInfor

        // let url =
        // process.env.NODE_ENV === "production"
        //   ? "/vue-demo/example.json"
        //   : "/example.json";



        if(_content == undefined || _content == '') {
            //  this.$router.push('/allTermSearch')
          
            this.$alert('抱歉！暂无此术语查询！', '提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        }).then(() => {
                            // 点击确定进行的操作
                            this.$router.go(-1)
            })
        }else {

                  
            let url = '/api/term/selectByName';
            this.$ajax.get(url, {
                    params: {
                        name: this.input
                    }
                })
                .then(response => {
                    if(response.data.length !== 0) {
                        var list = []
                        list.push({id: 1, name: response.data[0]['startTerm'].name})
                        for(var i in response.data) {
                          list.push({id:(parseInt(i) + 2), name: response.data[i]['endTerm'].name})
                        }
                        this.tableData = list
                    }else {
                        this.$alert('抱歉！暂无此术语查询！', '提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        }).then(() => {
                          // this.input = ''
                          // this.tableData = ''
                            // 点击确定进行的操作
                            this.$router.go(-1)
                        })
                    }
                    
                })
                .catch(err => console.log("[error]" + err));
      
        }
    },
    methods: {
   
    },
    watch: {
    },
    setup() {
      return {
 
      }
    },
}
</script>
<style scoped>
.grid-content.bg-purple{
  background-color: white;
  padding: 20px;
  box-shadow: 0 3px 6px rgba(62, 64, 65, 0.24),0 0 1px rgba(79, 81, 82, 0.12);
}
.input-with-select {
  margin-top: 30px;
  margin-bottom: 40px;
  box-shadow: 0 3px 6px rgba(62, 64, 65, 0.24),0 0 1px rgba(79, 81, 82, 0.12);
}
._input{
  margin: 0 auto;
  width: 60%;
 
  /* border: 1px solid blue; */
}

#tips {
    color: #c1c4cb;
    font-family: '宋体', 'Times New Roman', Times, serif;
    font-size: 14px;
    /* display: block; */
 
    /* margin-top: -20px; */
    /* margin-left: 20px; */
}
</style>
