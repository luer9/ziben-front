<template>
  <div class="hello">
  <!--搜索区-->
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark" id="bg" :style="background" >
        <div style="font-size:70px;font-weight:bold; padding:80px; color:#000000; text-shadow: 3px 3px 5px rgb(66, 66, 66);">
          {{ msg }}
        </div>
      <!-- <h1></h1> -->
       <SearchInput/>
      </div>    
  </el-col>
  </el-row>
  <!--内容区-->
  <el-row :gutter="24">
   
    <el-col :span="24"> 
       <el-card shadow="hover" class="grid-content bg-purple" style="background: linear-gradient(to right, #f8f9fa, #e9ecef); padding:0px">    
          <h3> <strong>术语推荐  <el-icon size="20px"> <Filter /> </el-icon></strong></h3>
          <el-divider border-style="dashed" />
          <recommand-list v-bind:tableData='tableData'/>
      </el-card>
    </el-col>
   
    <!-- <el-col :span="12">
      <router-link to="/main">
      <el-card shadow="hover" class="grid-content bg-purple" style="background: linear-gradient(to right, #f8f9fa, #e9ecef); padding:0px">    
          <h3> <strong>《资本论》汉英术语知识库</strong> <el-icon><promotion /></el-icon> </h3>
          <el-divider border-style="dashed" />
          本项目由国家社科基金赞助, 智慧型资源将极大地提升知识服务水平。
           <span style="float: right"> 立即查阅   <el-icon size="20px"><share /></el-icon></span>
      </el-card>
        </router-link>
    </el-col>  -->
  </el-row>
  </div>
</template>

<script>
import searchInput from '@/components/InputSearch.vue'
import recommandList from '@/components/Recommand.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String
    }
  },
  data() {
    return {
      // 背景图设置
      background: {
        backgroundImage: 'url(' + require('@/assets/background3.jpeg') + ')',
        //  backgroundImage: 'url(' + require('@/assets/background2.jpg') + ')',
        //  backgroundPosition: 'center top',
        backgroundPosition: 'center center',
        // backgrounRepeat: no-repeat,
        
      },
      tableData:[]
    } 
  },
  components:{
    SearchInput: searchInput,
    recommandList: recommandList
  },
  created() {
     let url = '/api/term/getTermRank';
        this.$ajax.get(url, {
            params: {
                
            }
        })
        .then(data => {
            var list = []
            for(var i in data.data) {
              // console.log(i, " ", data.data[i])
              list.push({id:(parseInt(i) + 1), name: data.data[i]})
            }
            // console.log(list)
            this.tableData = list
            
        })
        .catch(err => console.log("[error]" + err));
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1{
  margin-bottom: 50px;
  margin-top: 100px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

  a {
    text-decoration: none;
  }
 
  .router-link-active {
    text-decoration: none;
  }

#bg {
  border: 1px solid rgb(228, 218, 218);
  height: 580px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-shadow: 0 3px 6px rgba(62, 64, 65, 0.24),0 0 1px rgba(79, 81, 82, 0.12);
  // box-shadow: 0px 5px 5px #656B79;;
}
.grid-content.bg-purple{
  // border: 1px solid blue;
  padding: 15px;
  text-align: left;
  // width: 90%;
  height: 250px;
  // background: linear-gradient(to bottom, #ffffff, #e5e5e5);
  margin: 0 auto;
  // margin-top: -100px;
  margin-bottom: 60px;
  box-shadow: 0 6px 6px rgba(62, 64, 65, 0.24),0 0 1px rgba(79, 81, 82, 0.12);
}
.el-divider{
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>
