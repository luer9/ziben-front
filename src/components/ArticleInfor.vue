<template>
 <el-row :gutter="20">
    <el-col :span="2"><div class="grid-content bg-purple"/></el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple" id="interInfor">        
         <el-card class="box-card" style="max-width: 100%;">
          <template #header >
            <div class="card-header">
              <span> <strong>术语外译</strong> </span>
              <el-button plain @click="go">  <strong>术语全文</strong> </el-button>      
            </div> 

          </template>
         <div id="item_info" style="height: 580px;" v-html="coreNode.interpret">  </div>
          <!-- <div id="item_info" style="height: 580px;"> {{coreNode.interpret}} </div> -->
        </el-card>
      </div>
      </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple" id="content" >
          <div class="btn" v-if="isShow">
            <el-button plain @click="returnBtn">返回 </el-button>
          </div>
          <h1 style="text-align: center">{{coreNode.name}}  </h1>
          <hr/>
         
        <div class="grid-content bg-purple-dark" style="max-width: 100%;">
            <GraphView  
                :datas="_data"
                :nodeSize="nodeSize"
                :linkWidth="linkWidth"
                :linkDistance="linkDistance"
                :bodyStrength="bodyStrength"
                :key="Num"
                @getData="update" 
             ></GraphView>
             <!-- :nodeList="data.nodes"
                :linkList="data.links" -->
        </div>
  <!-- :svgSize="svgSize" -->
       </div>
       </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple" id="smaNode">        
         <el-card class="box-card" style="max-width: 100%;">
          <template #header >
            <div class="card-header">
              <span> <strong>近似术语</strong> </span>
            </div> 
          </template>
            
           <el-scrollbar ref="scrollbarRef" height="600px" always @scroll="scroll">
              <div ref="innerRef" id="iterms">
                <span v-for=" node  in smNodes"
                  @click='handleClick(node.name)' 
                 :key="node"
                 class="scrollbar-demo-item"  >
                  {{ node.name}}
             
                </span>
              </div>
          </el-scrollbar>

          <!-- <div v-for="o in 4" :key="o" class="text item"><el-tag>{{ 'List item ' + o }} </el-tag></div> -->
        </el-card>
      </div>
      </el-col>
  </el-row>
</template>

<script  >
 
import NodeList from '@/components/NodeList.vue'
import { onMounted, ref, reactive, defineComponent } from 'vue'
import GraphViewSmall from '@/components/GraphViewSmall.vue'
import  { ElScrollbar } from 'element-plus'
import {useRoute} from "vue-router";
import { useRouter } from 'vue-router'
//  notify
 
import { ElNotification } from 'element-plus'
 



// onMounted(() => {
//   max.value = innerRef.value!.clientHeight - 380
// })

// const inputSlider = (value: number) => {
//   scrollbarRef.value!.setScrollTop(value)
// }

// const formatTooltip = (value: number) => {
//   return `${value} px`
// }

export default defineComponent({
  name: 'article',
  components:{
    NodeList,
    GraphView: GraphViewSmall
  },
  props: {
    articleInfor: {
      type: Object,
      
      default: function() {
        return {title: "资本主义", infor: "xxxxxx", type: "术语"}
      }
    },
    originNodes: {
      type: Object
    },
    smNodesList: {
      type: Object
    },
    scroll: {
      type: String
    },
    // data: {
    //   type: Object,
    //   default: function () {
    //     return {
    //       nodeList: Array,
    //       linkList: Array,
         
    //     }
    //   }
    // }
  },
  data(){
    return {
      msg: "节点信息",
      nodesList: [],
      coreNode: this.articleInfor,
      smNodes: this.smNodesList,
      // dialogFormVisible: false,
      // pdfSrc: '',
      // numPages: 0, // 当前页数,
      // pageNum: 1,
      // pageTotalNum: 1,
      // curPageNum: 0,
      svgSize:{
        width: '600px',
        height: '600px'
      },  
      _data: {
        nodeList: [],
        linkList: []
      },    
      showSettingCard: false,
      nodeSize:   
            (Math.floor(Math.random() * (18 - 13) + 13)) * 2,
      linkWidth: 2,
      linkDistance: 90,
      bodyStrength: -200,
      Num: 0 ,
      curNode:  "",
      preNode: [],
      isShow: false,
      aproNode: "",
      type: ""
    }
  },
  onMounted() {
  
  },
  computed: {},
  watch: {
    articleInfor(news , olds) {
        this.coreNode = news
    },
    smNodesList(news , olds) {
        this.smNodes = news
    },
    data(news, olds) {
      // console.log("[watch data] " + news)
      this._data = news
    },
    preNode: {
      handler(newVal, oldVal) {
        // console.log(">>> + ", newVal)
        if(newVal.length == 0) this.isShow = false
        else this.isShow = true
      },
      deep: true
    }
  },
  created(){
    // this.coreNode = this.articleInfor
      const route = useRoute();
      const _content = route.params.content;
      const _cur = route.params.curTerm;
      const _type = route.params.type;
      const _this = this
      //  console.log("参数接收到>atchxzzzzz> ", _content, " ", _cur, "... " , _type)
      if(_cur != undefined && _type == "1") {
        this.preNode.push(_cur)
        this.aproNode = _cur
        this.type = _type
      }
      let url = "/api/term/selectByName"
      //   //  let url =
      //   //     process.env.NODE_ENV === "production"
      //   //       ? "/vue-demo/example.json"
      //   //       : "/example.json";
      this.curNode = _content
      _this.$ajax.get(url,  {
            params: {
              name: _content
            }
          }).then((response) => {
          _this.d3jsonParser(response)
           _this.Num += 1
      })  
  },
  mounted() {

  
  },
  methods: {   
    // 相似节点，去掉原数据
    filter(smNodes, originNode) {
        return smNodes.filter(function(ele) {
            return ele.name != originNode.name
        })
    },
    // 对文本特殊标题加粗。
    modifyText(msg) {
        // console.log(">>>>?? " + " > " + msg.indexOf("释义") + msg.substring(0, msg.indexOf("释义")))
        var lis = ['外译方案：','外译方案:', '译文来源：', '译文来源:']
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
        // console.log(">>>> " + msg)
        // for(var i in lis) {
        //     if(msg.indexOf(lis[i]) != -1) {
        //     // console.log("---> ", lis[i])
        //         if(lis[i] == '外译方案：')
        //             msg = msg.replace(lis[i], '<span style="font-weight:900;font-style: bold;">'+ lis[i] +'</span>')
        //         // else if(lis[i] == '释义:' || lis[i] == '释义：'){
        //         //     msg = msg.replace(lis[i], '<span style="font-weight:900;font-style: italic;">'+ '<br>' + lis[i] + '<br>' +'</span>')
        //         // }
        //         else {
        //             msg = msg.replace(lis[i], '<span style="font-weight:900;font-style: bold;">'+ '<br>' + lis[i] +'</span>')
        //         }
        //     }
            
        // }
        return msg
    },
    returnUpdate(json) {
 
      this.d3jsonParser(json)
      // console.log(this._data.nodeList[0])
      this.coreNode = this._data.nodeList[0]
      this.smNodes = this.filter(this._data.nodeList, this.coreNode);
      // if(this.preNode.length == 0) this.isShow = false
      // else this.isShow = true
      // this.preNode.push(this.curNode)
      this.curNode = this.coreNode.name
 
    },
    update (json) {

      this.d3jsonParser(json)
      this.coreNode = this._data.nodeList[0]
      this.smNodes = this.filter(this._data.nodeList, this.coreNode);
      this.preNode.push(this.curNode)
      // this.isShow = ture
      this.curNode = this.coreNode.name
      // console.log("[change cur]" + this.curNode)
      // this.data = json
      // 得到st和end的名字
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
              interpret:  this.modifyText(item.startTerm.interpret.slice(item.startTerm.name.length)) 
              
            })
          }
          if (nodeSet.indexOf(item.endTerm.term_id) == -1) {
            nodeSet.push(item.endTerm.term_id)
            nodes.push({
              id: item.endTerm.term_id,
              label: 'term',
              flag: item.endTerm.flag,
              name: item.endTerm.name,
              interpret: this.modifyText(item.endTerm.interpret.slice(item.endTerm.name.length))
            })
          }
          links.push({
            source: item.startTerm.term_id,
            target: item.endTerm.term_id,
            type: item.rel,
            name: item.rel
            
          })
      }
    
    
 

      this._data= {nodeList: nodes, linkList: links }
    },
    handleClick (name){
        // console.log(">handle", name)

      this.$router.push({
          path: "/pdfPage",
          query:{ 
            // preitemName: this.coreNode.name,
            curitemName: name
          } 
      })

        // let url = this.$router.resolve({
        //   path: "/pdfPage",
        //   query:{ 
        //     // preitemName: this.coreNode.name,
        //     curitemName: name
        //   } 
        // })
        // window.open(url.href, '_blank')
        // this.$router.go(-1)
    },
    success(){
      ElNotification({
        title: 'Success',
        message: 'This is a success message',
        type: 'success',
      })
    },
    error(){
      ElNotification({
        title: 'Error',
        message: 'This is an error message',
        type: 'error',
      })
    },
    go() {

       // console.log(">handle", name)
        // let url = this.$router.resolve({
        //   path: "/pdfPage",
        //   query:{ 
        //     // preitemName: this.coreNode.name,
        //     curitemName: this.coreNode.name,
        //   } 
        // })
        // this.$router.go(-1)
        // window.open(url.href, '_blank')
        
      this.$router.push({
          path: "/pdfPage",
          query:{ 
            // preitemName: this.coreNode.name,
            curitemName: this.coreNode.name,
          } 
      })
      
    },
    returnBtn() {

      if(this.preNode != "") {
        
        var preName = this.preNode.pop()
        // console.log(">>> " , this.type)
        if(preName == this.aproNode) {
          this.$router.push(
            { name: "approxTerms", params: { content: this.aproNode, type: this.type}}
          )
        }else {
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
        }
        
        
      }else {
        // this.isShow = true
      }
      
    }
  },
  setup() {
   

  },
})

</script>

<style>
@media only screen and (max-width: 1125px){
  #interInfor, #smaNode{
    display: none !important;
    cursor: pointer;
  }
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
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.box-card {
  /* width: 480px; */
}
.btn{
  display: flex;
  float: right;
}
#content{
  padding: 20px;
  text-align: left;
  background-color: white;
  box-shadow: 0 3px 6px rgba(62, 64, 65, 0.24),0 0 1px rgba(79, 81, 82, 0.12);
}
#item_info {
  /* white-space: pre-line;
	
	letter-spacing:2px;
 
  overflow:hidden;    */
  /* text-overflow:ellipsis; */
  /* white-space: nowrap;   */
  /* text-align: justify; */
  text-align: left;
  /* text-justify:inter-ideograph; */
  /* text-align: left; */
  /* margin-top: -28px; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  /* display: -webkit-box; */
  /* -webkit-line-clamp: 10; */
  /* -webkit-box-orient: vertical; */
    
}
#iterms {
  cursor: pointer;
}
</style>