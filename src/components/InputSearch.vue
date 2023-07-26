<template>
  <el-row :gutter="20">
    <el-col :span="10" :offset="7">
      <div class="grid-content bg-purple">
          <el-input placeholder="请输入要检索的术语" v-model="input3" class="input-with-select"  @keyup.enter="go" size='large'>
            <!-- <template #prepend>
              <el-select v-model="select" placeholder="请选择">
                <el-option label="名称" value="1"></el-option>
                <el-option label="类型" value="2"></el-option>
                <el-option label="其他" value="3"></el-option>
              </el-select>
            </template> -->
            <template #append>
              <el-button id="searchbtn" icon='Search' size='large' @click="go"></el-button> 
            </template>
          </el-input>
          
        </div>
        </el-col>
    
    <el-col :span="10" :offset="7">
      <div class="hotword"> 
        <strong>搜索热词：</strong> 
        
        <a href="#"> <router-link :to="{ name:'infor',params:{ content:'劳动' } }">劳动  </router-link> </a>

        <a href="#"> <router-link :to="{ name:'infor',params:{ content:'劳动力' } }">劳动力 </router-link>  </a>

        <a href="#"> <router-link :to="{ name:'infor',params:{ content:'产品价值' } }">产品价值 </router-link>  </a>
 
        <a href="#"> <router-link :to="{ name:'infor',params:{ content:'超额劳动' } }">超额劳动 </router-link>  </a>

        <a href="#"> <router-link :to="{ name:'infor',params:{ content:'资本家' } }">资本家 </router-link> </a>

        <a href="#"> <router-link :to="{ name:'infor',params:{ content:'国民劳动' } }"> 国民劳动 </router-link>  </a>

        <a href="#"> <router-link :to="{ name:'infor',params:{ content:'货币' } }">货币 </router-link> </a>

        <a href="#">  <router-link :to="{ name:'infor',params:{ content:'国际价值' } }">国际价值 </router-link> </a>

        <a href="#"> <router-link :to="{ name:'infor',params:{ content:'工业' } }">工业 </router-link> </a>
        </div>
    </el-col>
  </el-row>


</template>
<script>
import {Search} from '@element-plus/icons-vue'
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import {getCurrentInstance } from 'vue'
export default {
  data() {
      return {
          tableData: [],
          input3: ''
      }
  },
  created() {

        let url = '/api/term/getAllTermName';
        this.$ajax.get(url, {
                params: {
                   
                }
            })
            .then(response => {
                var list = []
                for(var i in response.data) {
                  list.push(response.data[i])
                }
                this.tableData = list
            })
            .catch(err => console.log("[error]" + err));
    
  },
  setup() {
 
    // const input3 = ref("")
    // const select = ref("")
    // const _router = useRouter();
    // const go = () => {
    //   if(input3.value != '') {
    //     _router.push({
    //         name: "infor",
    //         params: {
    //           content: input3.value,
    //           // type: select.value
    //         }
    //     })  
    //   }
    // }
    // return {
    //   input3,
    //   select,
    //   go
    // }
  },
  methods: {
    go() {
      // console.log(this.input3 + " " + this.tableData.indexOf(this.input3))
      if(this.input3 != '' && this.tableData.indexOf(this.input3)!=-1) {
        this.$router.push(
        { name: "infor", params: { content: this.input3}}
        )
      }else if(this.input3 != '' && this.tableData.indexOf(this.input3) ==-1) {
        this.$router.push(
        { name: "approxTerms", params: { content: this.input3, type: "1"}}
        )
      }
      // if(this.input3.value != '') {
        // _router.push({
        //     name: "infor",
        //     params: {
        //       content: this.input3.value,
        //       // type: select.value
        //     }
        // })  
      // }
    }
    // test() {
    //   this.go();
    // }
  }
  
}

</script>
<style>
  .el-select .el-input {
    width: 130px;
   
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  #searchbtn{
    /* background: #558fdd; */
    /* border-color: #558fdd; */
    background: #90271c;
    border-color: #90271c;
    color: #fff;
  }
  .hotword {
    margin-top: 20px;
    font-size: 14px;
  }
  .hotword strong{
    color: #f6ffff;
  }
  .hotword a {
    /* color: #194B87; */
    color: #e1e0e0;
    text-decoration: none;
  }
</style>