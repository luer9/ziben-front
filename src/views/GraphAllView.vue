<template>
 

  <div class="btn" style="float: left" v-if="isShow">
        <el-button plain @click="returnBtn">返回 </el-button>
  </div>
  <div class="div" >
    <el-alert
      title="双击查看当前术语详细信息"
      type="info"
      description="单击查看当前术语的相关术语"
      show-icon>
    </el-alert>
  </div>
    
  
  <div id="GraphAllView" >

    
   
       
      <!-- <div class="clearfix">
        <span>设置</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="showSettingCard=!showSettingCard"
        >关闭</el-button>
      </div>节点大小
      <el-slider v-model="nodeSize" show-input :max="50"></el-slider>连线宽度
      <el-slider v-model="linkWidth" show-input :max="20"></el-slider>连线长度
      <el-slider v-model="linkDistance" show-input :max="300" :step="50" show-stops></el-slider>作用力
      <el-slider v-model="bodyStrength" show-input :min="-1000" :max="0" :step="50" show-stops></el-slider>
      <br>
      <div>
        <el-switch v-model="svgTheme" active-text="黑暗模式" inactive-text="明亮模式"></el-switch>
      </div> -->
   

    <el-row>
    <el-col :span="24">
        <div class="grid-content bg-purple-dark" style="  max-width: 100%;">
            <GraphView  
                :datas="data"
                :nodeSize="nodeSize"
                :linkWidth="linkWidth"
                :linkDistance="linkDistance"
                :bodyStrength="bodyStrength"
                 @getData="update" 
             ></GraphView>
             <!-- :nodeList="data.nodes"
                :linkList="data.links" -->
        </div>
    </el-col>
  </el-row>
   
  </div>
</template>

<script>
import GraphView from '@/components/GraphView.vue'
import axios from 'axios'
export default {
  name: "GraphAllView",
  components: {
    GraphView 
  },
  props: {
    initialNode: {
      type: String
    }
  },
  data() {
    return {
      svgSize:{
        width: '1000px',
        height: '1000px'
      },  
      data: {
        nodeList: [],
        linkList: []
      },    
      showSettingCard: false,
      nodeSize:   
            (Math.floor(Math.random() * (18 - 16) + 16)) * 2,
      linkWidth: 2,
      linkDistance: 90,
      bodyStrength: -200,
      svgTheme: false, // light
      curNode: "《资本论》",
      preNode: [],
      isShow: false
    };
  },
  created(){
     
     this.curNode = this.initialNode
     if(this.initialNode == undefined || this.initialNode == "《资本论》" ) {
       
        let url = "/api/term/getRandomTerm"
         
            this.$ajax.get(url).then((response) => {
                // this.d3jsonParser(response)
                this.d3jsonParser(response)
              
            }).catch(err => console.log(err));    
     }else {
         let url = "/api/term/selectByName"
            //  let url =
            //     process.env.NODE_ENV === "production"
            //       ? "/vue-demo/example.json"
            //       : "/example.json";
            this.$ajax.get(url,  {
                  params: {
                    name: this.initialNode
                  }
                }).then((response) => {
                // this.d3jsonParser(response)
                this.d3jsonParser(response)
             
            }).catch(err => console.log(err));    
     }
 
  },
  methods: {
    returnBtn() {
      // console.log(">>> return")
      // console.log("cur" + this.curNode)
      // console.log("pre" + this.preNode)
      // if(this.preNode == undefined) this.preNode = "《资本论》"
      if(this.preNode != "" ) {
        var preName = this.preNode.pop()
        this.$ajax.get('/api/term/selectByName', {
          params: {
            name: preName
          }
        }).then((data) => {
          if (data.data.length !== 0) {             
              this.returnUpdate(data)
          } else {
  
          }
        })
        
      }else if(this.preNode == "《资本论》") {
         let url = "/api/term/getRandomTerm"
         
            this.$ajax.get(url).then((response) => {
                // this.d3jsonParser(response)
                this.update(response)
              
            }).catch(err => console.log(err));    
      }
      
    },
    returnUpdate(json) {
 
      this.d3jsonParser(json)
      this.curNode = this.data.nodeList[0].name
 
    },
     update (json) {
    
      this.d3jsonParser(json)
      this.preNode.push(this.preNode == '' ?'《资本论》': this.curNode )
      this.curNode = this.data.nodeList[0].name
 
    },
     modifyText(msg) {
        // console.log(">>>>?? " + " > " + msg.indexOf("释义") + msg.substring(0, msg.indexOf("释义")))
        var lis = ['外译方案：','外译方案:', '译文来源：', '译文来源:']
        msg = msg.substring(msg.indexOf("外译方案"), msg.length)
        // console.log(">>>> " + msg)
        // msg = msg.replaceAll('　　', '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
        msg = msg.replace("外译方案：", '<span style="font-weight:900;font-style: bold;"> 外译方案：</span><br>')
        msg = msg.replace("译文来源：", '<br><br><span style="font-weight:900;font-style: bold;"> 译文来源：</span><br>')
        msg = msg.replace("译文来源:", '<br><br><span style="font-weight:900;font-style: bold;"> 译文来源:</span><br>')
        msg = msg.replace("[2]", '<br>[2]')
        msg = msg.replace("[3]", '<br>[3]')
        msg = msg.replace("[4]", '<br>[4]')
        msg = msg.replace("[5]", '<br>[5]')
        msg = msg.replace("[6]", '<br>[6]')

        msg = msg.substring(0, msg.indexOf("释义"))
        return msg
    },
     // 解析json数据，主要负责数据的去重、标准化
    d3jsonParser (json) {
      // console.log("----> "+json.data)
      // 出度>入度 --> start 1  else 0
      let outdeg = []// 出度
      let indeg = [] // 入度
      // 初始化
      for(let item of json.data) {
        outdeg[parseInt(item.startTerm['term_id'])] = 0 // start，id的出度
        indeg[parseInt(item.endTerm['term_id'])] = 0 
        outdeg[parseInt(item.endTerm['term_id'])] = 0 // start，id的出度
        indeg[parseInt(item.startTerm['term_id'])] = 0 
      }
      for(let item of json.data) {
        // 
        // 统计节点的 出度和 入度  根据id
        // console.log("item: ", item)
        outdeg[parseInt(item.startTerm['term_id'])] = outdeg[parseInt(item.startTerm['term_id'])] + 1  // start，id的出度
        indeg[parseInt(item.endTerm['term_id'])] = indeg[parseInt(item.endTerm['term_id'])] + 1
     
      }
      for(let item of json.data) {
        if(outdeg[parseInt(item.startTerm['term_id'])] >= indeg[parseInt(item.startTerm['term_id'])]) {
            item.startTerm['flag'] = "1"
        }else {
            item.startTerm['flag'] = "0"
        }
        if(outdeg[parseInt(item.endTerm['term_id'])] >= indeg[parseInt(item.endTerm['term_id'])]) {
            // console.log("===> ",item.endTerm.name)
            item.endTerm['flag'] = "1"
        }else {
            item.endTerm['flag'] = "0"
        }
      }
     
      const nodes =[]
      const links = [] // 存放节点和关系
      const nodeSet = [] // 存放去重后nodes的id

      // // 使用vue直接通过require获取本地json，不再需要使用d3.json获取数据
   
      for (let item of json.data) {
       
          if (nodeSet.indexOf(item.startTerm.term_id) == -1) {
            nodeSet.push(item.startTerm.term_id)
            nodes.push({
              id: item.startTerm.term_id,
              label: 'term',
              flag: item.startTerm.flag,
              name: item.startTerm.name,
              interpret:  this.modifyText(item.startTerm.interpret) 
              
            })
          }
          if (nodeSet.indexOf(item.endTerm.term_id) == -1) {
            nodeSet.push(item.endTerm.term_id)
            nodes.push({
              id: item.endTerm.term_id,
              label: 'term',
              flag: item.endTerm.flag,
              name: item.endTerm.name,
              interpret: this.modifyText(item.endTerm.interpret)
            })
          }
          links.push({
            source: item.startTerm.term_id,
            target: item.endTerm.term_id,
            type: item.rel,
            name: item.rel
            
          })
      }
     
      this.data = { nodeList: nodes, linkList: links }
      // return { nodes, links }
    },
  },
  mounted() {
  
  },
  watch: {
    preNode: {
      handler(newVal, oldVal) {
        // console.log(">>> + ", newVal)
        if(newVal.length == 0) this.isShow = false
        else this.isShow = true
      },
      deep: true
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
.setting-box-button {
  position: fixed;
  overflow: auto;
  top: 100px;
  z-index: 20;
  right: 40px;
  border: 2px solid rebeccapurple;
}
.setting-box-card {
  position: fixed;
  z-index: 30;
  overflow: auto;
  top: 20px;
  right: 15px;
  width: 500px;
  max-height: 700px;
}
#GraphAllView{
    max-width: 100%;
    background-color: white;
    box-shadow: 0 3px 6px rgba(62, 64, 65, 0.24),0 0 1px rgba(79, 81, 82, 0.12);
    text-align: center;
}
.div {
  width: 15%;
  /* border: 1px solid red; */
  top: 80px;
  right: 20px;
  position: fixed;
  z-index: 999;
}
</style>