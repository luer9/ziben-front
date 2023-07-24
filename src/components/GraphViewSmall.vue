<template>
 

 
<div id="network" :style="{width: svgSize.width +'px', height: svgSize.height+'px'}">
   <!-- <div id="svg_container" :style="{minWidth: resizeWidth}" > -->
    <!-- <div
      class="linkText"
      :style="linkTextPosition"
      v-show="linkTextVisible"
      v-text="linkTextContent"
    ></div> -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :width="svgSize.width"
      :height="svgSize.height"
      :style="{'background-color': theme.bgcolor}"
      ref="svg_wrapper"
      @click="oneclickEle"
      @dblclick="twoclickEle"
      @mouseover.prevent="svgMouseover"
      @mouseout="svgMouseout"
      
    >
    <!-- @dblclick="twoclick" -->
      <g id="container">
        <!-- links and link-text 注：先绘制边 -->
        <g>
          <g v-for="link in links" :key="link.index">
            <line
              :class="`${link[linkTypeKey]} ${link.selected} link element`"
              class="topo-line"
              :stroke="theme.linkStroke"
              :stroke-width="linkWidth"
            ></line>
            <!-- dx dy 文字左下角坐标 -->
            
            <!-- <text
              v-if="showLinkText"
              dx="0"
              dy="0"
              class="link-text"
              :fill="theme.textFill"
              :font-size="linkTextFrontSize"
            >{{link[linkTextKey]}}</text> -->
          </g>
        </g>

        <!-- node and node-text -->
        <g id="node-group">
          <g v-for="node in nodes" :key="node.index">
            <pattern v-if="node.href" :id="'avatar' + node.index" width="100%" height="100%" patternContentUnits="objectBoundingBox">
              <image width="1" height="1" :href="node.href"/>
              <!-- <image width="1" height="1" :href="require('../assets/'+node.href)"/> -->
            </pattern>
            <circle
              v-if="node.href"
              :fill="'url(#avatar'+ node.index + ')'"
              :stroke-width="highlightNodes.indexOf(node.id) == -1? 3:10"
              :stroke="highlightNodes.indexOf(node.id) == -1? theme.nodeStroke: 'gold' "
              :class="`${node[nodeTypeKey]} ${true?'selected' : ''} node element`"
              :r="nodeSize"
            ></circle>
            <circle
              v-else
              :fill="nodeColor(node[nodeTypeKey])"
              :stroke-width="highlightNodes.indexOf(node.id) == -1? 3:10"
              :stroke="highlightNodes.indexOf(node.id) == -1? theme.nodeStroke: 'gold' "
              :class="`${node[nodeTypeKey]} ${true?'selected' : ''} node element`"
              :r="nodeSize"
            ></circle>
            <text
              v-show="true"
              dx="0"
              dy="0"
              class="node-text"
              :fill="theme.textFill"
              :font-size="nodeTextFontSize"
            >{{node[nodeTextKey].length <= 5 ? node[nodeTextKey]: node[nodeTextKey].slice(0,4) + "..."}}</text>
          </g>
           <!-- :dx="0"
              dy="0" -->
          <g></g>
        </g>
      </g>
    </svg>
  <!-- </div> -->
</div>


</template>

<script>
import * as d3 from "d3";
import { setup } from 'vue-class-component';
import { useRouter } from 'vue-router'
// import * as d3Force from 'd3-force'
// import * as d3Zoom from 'd3-zoom'
// import * as d3Scale from 'd3-scale'
// import * as d3Selection from 'd3-selection'
// import * as d3Drag from 'd3-drag'
// import * as d3ScaleChromatic from 'd3-scale-chromatic'

// import d3SelectionMulti from "d3-selection-multi";

// const d3 = Object.assign({}, d3Force, d3Zoom, d3Scale, d3Selection, d3Drag)

// 元素的 classList 是 DOMTokenList
DOMTokenList.prototype.indexOf = Array.prototype.indexOf;

export default {
  name: "GraphViewSmall",
  props: {
    datas: {
      type: Object,
      default: function () {
        return {
          nodeList: Array,
          linkList: Array,
         
        }
      }
    },
    // node
    nodeSize: {
      type: Number,
      default: 18
    },
    nodeTextKey: {
      type: String,
      default: "name"
    },
    nodeTypeKey: {
      type: String,
      default: "flag"
    },
    nodeTextFontSize: {
      type: Number,
      default: 14
    },
    // link
    linkWidth: {
      type: Number,
      default: 2
    },
    showLinkText: {
      type: Boolean,
      default: false
    },
    linkTextKey: {
      type: String,
      default: "value"
    },
    linkTypeKey: {
      type: String,
      default: "type"
    },
    linkTextFrontSize: {
      type: Number,
      default: 10
    },
    linkDistance: {
      type: Number,
      default: 50
    },
    // svg
    svgSize: {
      type: Object,
      default: () => {
        return {
            // width: document.documentElement.clientWidth || document.body.clientWidth ||  window.innerWidth,
	          // height: document.documentElement.clientHeight || document.body.clientHeight ||  window.innerHeight
            width: 600,
            height: 600
        };
      }
    },
    svgTheme: {
      type: String,
      default: "light" // dark or light
    },
    bodyStrength: {
      type: Number,
      default: -150
    },
    // others
    highlightNodes: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      selection: {
        links: [],
        nodes: []
      },
      _data: this.datas,
      pinned: [], // 被订住的节点的下标
      force: null,
      zoom: d3.zoom(),
      nodeColor: d3.scaleOrdinal(d3.schemeCategory10),
      linkTextVisible: false,
      linkTextPosition: {
        top: 0,
        left: 0
      },
      linkTextContent: "",
      timer: null,
      curTerm: '',
      preTerm: '',
    };
  },
  computed: {
    nodes() {
     
      // 去重
      // let nodes = this.datas.nodeList;
      // let nodeIds = [];
      // nodes = nodes.filter(node => {
      //   if (nodeIds.indexOf(node.id) === -1) {
      //     nodeIds.push(node.id);
      //     return true;
      //   } else {
      //     return false;
      //   }
      // });
      // if(this.datas != undefined && this.datas.nodeList != '') {
      //   console.log("this[nodess] -> " + this.datas.nodeList)
      //     console.log("this[nodess] -> " + this.datas.nodeList[0].name)
      //     return this.datas.nodeList;
      // }
       
      return this.datas.nodeList;
    },
    links() {
      return this.datas.linkList;
    },
    theme() {
      if (this.svgTheme === "light") {
        return {
          bgcolor: "white",
          nodeStroke: "white",
          linkStroke: "lightgray",
          textFill: "black"
        };
      } else {
        // dark
        return {
          bgcolor: "black",
          nodeStroke: "white",
          linkStroke: "rgba(200,200,200)",
          textFill: "white"
        };
      }
    }
  },
  watch: {
    bodyStrength: function() {
      this.initData();
      this.$nextTick(function() {
        this.initDragTickZoom();
      });
    },
    linkDistance: function() {
      this.initData();
      this.$nextTick(function() {
        this.initDragTickZoom();
      });
    },
    nodes: function() {
      this.initData();
      this.$nextTick(function() {
        // 以下这个函数重新在 node 上调用了拖拽
        // 只有在 mounted 后才有用
        // 所以要使用 $nextTick
        this.initDragTickZoom();
      });
    },
     // 当请求到新的数据时，重新渲染
    _data (newData, oldData) {
        
        // console.log("new " + newData.nodes)
        // console.log("old " + oldData.nodes)
        // this._data = newData
        // // this.nodeList = Object.assign({}, newData.nodes)
        // // this.linkList = Object.assign({}, newData.links)
        // // 移除svg和元素注册事件，防止内存泄漏
        // console.log(">>>>>>>> 来么")
        // console.log("修改之后" + this.datas.nodeList)
        // d3.select('svg').on('svg', null)
        // d3.select('svg').selectAll('*').on('.', null)
        // console.log(">>watch _data")
        this.initData();
        this.initDragTickZoom();
    },
    
    // datas(newValue, oldValue) {
    //   this._data = newValue
    
    // }
  },
  created() {
    // console.log("created ... ")
   
  },
  beforeMount() {
    // console.log("beforeMount ... ")
    this._data = this.datas 
  },
  mounted() {

     
    // console.log("mount ... ")
    this.initData();
    
    this.initDragTickZoom();
    
 
  },
  methods: {

  returnTerm(){
      //  console.log('preTerm: ' + this.preTerm)
 
      this.$ajax.get('/api/term/selectByName', {
          params: {
            name: this.preTerm
          }
        }).then((data) => {
          if (data.data.length !== 0) {             
             _this.$emit("getData", data); // 监听 input 在修改时发起事件，由父组件修改 modelValue 的值
          } else {
  
          }
        })
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
              interpret:  item.startTerm.interpret
              
            })
          }
          if (nodeSet.indexOf(item.endTerm.term_id) == -1) {
            nodeSet.push(item.endTerm.term_id)
            nodes.push({
              id: item.endTerm.term_id,
              label: 'term',
              flag: item.endTerm.flag,
              name: item.endTerm.name,
              interpret: item.endTerm.interpret
            })
          }
          links.push({
            source: item.startTerm.term_id,
            target: item.endTerm.term_id,
            type: item.rel,
            name: item.rel
            
          })
      }
    //  console.log("nodes: " + nodes) 
    //  console.log("links: " + links)
     this._data = { nodeList: nodes, linksList: links }
      // this.data = { nodes, links }
      // return { nodes, links }
    },
    getRandom(min, max) { //根据最小值和最大值产生一个随机数
        return Math.floor(Math.random() * (max - min) + min);
    },
    initData() { 
      this.d3render()
    },
    d3render() {
      // console.log(">>> render")
      this.force = d3
        .forceSimulation(this.nodes)
        .force("collision", 
          d3.forceCollide()
          .radius(d => { return 13 * 3})
          .iterations(0.35)
          .strength(0.3)
        )
        .force(
          "link",
          d3
            .forceLink(this.links)
            .id(d => d.id)
            .distance(d => { // 每一边的长度
                let distance = this.getRandom(30, 60) 
                return distance * 2
            }) // 距离
        )
        .force("charge", d3.forceManyBody().strength(this.bodyStrength)) //The strength of the attraction or repulsion
        .force(
          "center",
          d3.forceCenter(this.svgSize.width / 2, this.svgSize.height / 2)
        );
    },
    initDragTickZoom() {
      // console.log(">>> tick")
        // console.log(this.links)
        // console.log(this.nodes)
    // 给图添加拖拽
      // d3.select("svg").call(this.drag(this.force));
      
      this.force.on("tick", () => {

     
        // 更新连线坐标
        d3.selectAll(".link")
          .data(this.links)
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
           
        // 更新节点坐标
        d3.selectAll(".node")
          .data(this.nodes)
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
          .attr("fill", d => {
            if(d.flag == "1") this.curTerm = d.name
            // console.log(":::::核心词  " + this.curTerm)
            // if(d.properties.name == this.preTerm) return this.preColors[0]
            if(d.flag == "1") {
              return "#ca635f"
            }else {
              return "#3faaef"
            }
          })
          .attr("name", d => d.name)
    
        
          // 更新文字坐标
        d3.selectAll(".node-text")
          .data(this.nodes)
          .attr("x", d => d.x)
          .attr("y", d => d.y)
          
          // .attr('name', d => d.name)
          .attr("text-anchor", "middle");
        // d3.selectAll(".link-text")
        //   .data(this.links)
        //   .attr("x", d => (d.source.x + d.target.x) / 2)
        //   .attr("y", d => (d.source.y + d.target.y) / 2);
 
      
          // 初始化 zoom
        this.zoom.
          scaleExtent([0.1, 4]).on("zoom", this.zoomed)
        d3.select("svg")
         .append("center")
          .call(this.zoom)
          .on("dblclick.zoom", null);
      });
    },

    clickLink(e) {
      // this.$emit("clickLink", e, e.target.__data__);
      // console.log(e, e.target.__data__);
    },
    clickNode(e) {
      // console.log("cur node " + e.target.__data__.name)
      if (this.pinned.length === 0) {
        this.pinnedState(e);
      } else {
        // d3.selectAll(".element").style("opacity", 0.2);
        this.pinned = [];
      }
      this.$emit("clickNode", e, e.target.__data__);
    },
    
    oneclickEle(e) {
       
      if(e.target.__data__ != undefined) {
        var _this = this;
        clearTimeout(_this.timer); //清除未执行的定时器
        _this.timer = setTimeout(function () {
            // console.log('单击'); //单击要执行的事件处理
            // console.log("node " + e.target.__data__.name)
            // 单击的话进行图谱展示
            // /api/term/selectByName 展示与当前节点有关的节点
                    // 强制刷新
          // _this.$forceUpdate();  
          // _this.handleClick(e.target.__data__.name)

                
            _this.$ajax.get('/api/term/selectByName', {
            params: {
                name: e.target.__data__.name
              }
            }).then((data) => {
               this.preTerm = this.curTerm
              //  console.log(data)
             
             _this.$emit("getData", data); // 监听 input 在修改时发起事件，由父组件修改 modelValue 的值
            // _this.nodeList = _this.selection.nodes
            // _this.linkList = _this.selection.links
          
            // console.log(_this.selection.nodes)
            // console.log(_this.selection.links)
  
            // this.data = data
            //.data(this.data, data)
            //this.$emit('getData', this.data)
    
          })
     
        }, 400);
       
      }
   
 
    },
     twoclickEle(e) {
      
      if(e.target.__data__ != undefined) {
        clearTimeout(this.timer); //清除未执行的定时器
        // 双击的话 进行 信息展示
        this.handledbClick(e.target.__data__.name)
      }
     
    },
  
    svgMouseover(e) {
      // if (e.target.nodeName === "circle") { // 这里是鼠标路过节点的显示
      //   if (this.pinned.length === 0) {
      //     this.selectedState(e);
      //   }
      //   // 强制刷新
      //   this.$forceUpdate();
      //   this.$emit("hoverNode", e, e.target.__data__);
      // } else if (e.target.nodeName === "line") { // 鼠标路过线的操作
        // 显示关系文本 
        // this.linkTextPosition = {
        //   left: e.clientX + "px",
        //   top: e.clientY - 50 + "px"
        // };
        // console.log('e.target.__data__', e.target.__data__);
        // console.log('this.linkTextKey', this.linkTextKey); // 这个是控制对象的键
        // console.log('e.target.__data__[this.linkTextKey]', e.target.__data__[this.linkTextKey]);
        // console.log('=============================================');
        // this.linkTextContent = e.target.__data__[this.linkTextKey];
        // this.linkTextVisible = true;
        // this.$emit("hoverLink", e, e.target.__data__);
      // }
    },
    svgMouseout(e) {
      this.linkTextVisible = false;
      if (e.target.nodeName === "circle") {
        if (this.pinned.length === 0) {
          this.noSelectedState(e);
        }
        // 强制刷新
        this.$forceUpdate();
      }
    },
    selectedState(e) {
      // 节点自身显示文字、增加 selected class、添加进 selection
      e.target.__data__.showText = true;
      e.target.classList.add("selected");
      this.selection.nodes.push(e.target.__data__);
      // 周围节点显示文字、边和结点增加 selected class、添加进 selection
      // this.lightNeibor(e.target.__data__);
      // // 除了 selected 的其余节点透明度减小
      // d3.selectAll(".element").style("opacity", 0.2);  // 鼠标选中经过的地方 图标透明
    },
    noSelectedState(e) {
      // 节点自身不显示文字、移除 selected class
      e.target.__data__.showText = false;
      // e.target.classList.remove("selected");
      // 周围节点不显示文字、边和结点移除 selected class
      this.darkenNerbor();
      // 所有节点透明度恢复
      // d3.selectAll(".element").style("opacity", 1);   // 鼠标选中经过的地方 图标透明
    },
    pinnedState(e) {
      this.pinned.push(e.target.__data__.index);
      // d3.selectAll(".element").style("opacity", 0.05);  // 点击之后未点击的都透明
    },
    lightNeibor(node) {
      this.links.forEach(link => {
        if (link.source.index === node.index) {
          link.selected = "selected";
          this.selection.links.push(link);
          this.selection.nodes.push(link.target);
          this.lightNode(link.target);
        }
        if (link.target.index === node.index) {
          link.selected = "selected";
          this.selection.links.push(link);
          this.selection.nodes.push(link.source);
          this.lightNode(link.source);
        }
      });
    },
    lightNode(selectedNode) {
      this.nodes.forEach(node => {
        if (node.index === selectedNode.index) {
          node.showText = true;
        }
      });
    },
    darkenNerbor() {
      this.links.forEach(link => {
        this.selection.links.forEach(selectedLink => {
          if (selectedLink.id === link.id) {
            link.selected = "";
          }
        });
      });
      this.nodes.forEach(node => {
        this.selection.nodes.forEach(selectednode => {
          if (selectednode.id === node.id) {
            node.showText = false;
          }
        });
      });
      // 清空 selection
      this.selection.nodes = [];
      this.selection.links = [];
    },
    zoomed() {
      // 缩放中：以鼠标所在的位置为中心
      // d3.
      // select("#container").attr(
      //   "transform",
      //   "translate(" +
      //     d3.event.transform.x +
      //     "," +
      //     d3.event.transform.y +
      //     ") scale(" +
      //     d3.event.transform.k +
      //     ")"
      // )
      // .event.sourceEvent.stopPropagation(); 
    },
    
    drag(simulation) {
      // console.log("force: " + simulation.alphaTarget)
      // console.log("[d3.event.active]: " + d3.event)
      function dragstarted(d) {
        // console.log(">>>>> dragstarted")
        // if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        // d.fx = d.x;
        // d.fy = d.y;
        if (!d.active) {
            // simulation.alphaTarget(0.3).restart();
        }
        d.subject.fx = d.subject.x;
        d.subject.fy = d.subject.y;
      }

      function dragged(d) {
        //  console.log(">>>>> drag")
          d.subject.fx = d.x;
          d.subject.fy = d.y;
      }

      function dragended(d) {
        // console.log(">>>>> draged")
        // if (!d3.event.active) simulation.alphaTarget(0);
        // d.fx = null;
        // d.fy = null;
        if (!d.active) {
            // simulation.alphaTarget(0);
        }
        d.subject.fx = null;
        d.subject.fy = null;

      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    },
    
  },
  setup() {
    const _router = useRouter();
    //  处理双击
    const handledbClick = (name) => {
      // console.log("双击操作")
        _router.push({
            name: "infor",
            params: {
                content: name,
            // type: select.value
            }
        })     
    }
    // 处理单击
    const handleClick = (name) => {
      // console.log("单击操作")
      // console.log(">>>>[来没]" + name + " 怎么不跳转")
       location.reload();
        _router.push({
          name: "graphViewPage",
          params: {
            initialNode: name
          // type: select.value
          }
        })   
     
    }
    return {
        handledbClick,
        handleClick
    }
  }
};
</script>

<style scoped>
svg {
  /* border-radius: 5px; */
}
text{
  cursor: pointer;
}
.element {
  transition: opacity 0.5s ease;
}
.selected {
  opacity: 1 !important;
}
.node,
.link {
  cursor: pointer;
}
.linkText {
  position: absolute;
  z-index: 10;
  background-color: rgba(75, 75, 75, 0.596);
  border-radius: 10px;
  color: white;
  padding: 10px;
}
 
</style>
<style>
/* 线条链接走向 虚线 */
/* .topo-line {
  stroke-linecap: round;
  stroke-width: 1.3px !important;
  stroke-dasharray: 13 7;
  fill: none;
  animation: topo-dash 1s linear infinite !important;
}
@keyframes topo-dash {
  from {
    stroke-dashoffset: 20;
  }
  to {
    stroke-dashoffset: 0;
  }
} */
 

#network {
  display: block;
  margin: 0 auto;
  /* border: 1px solid red; */
}
svg{
  /* border: 1px solid blue; */
}
</style>

