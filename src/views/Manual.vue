<template>
    <div class="div" >
      <!-- <el-button @click="prev">上一页</el-button>
      <el-button @click="next">下一页</el-button> -->
      <el-button @click="zoomA">放大</el-button>
      <el-button @click="zoomB">缩小</el-button>
     </div>
<div id="container" :style="scaleFun"> 
      <vue-pdf-embed 
        :source="source"
        class="vue-pdf-embed"
        v-for="i in numPages"
        :key="i"
        :page="i"
      />
      </div>
</template>

<script>

import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs/esm"; // 获得总页数
export default {
  name: "Manual",
//   props: {
//       curitemName: {
//         type: String
//       }
//       // ,
//       // preitemName: {
//       //   type: String
//       // }
//   },
  components: {
    VuePdfEmbed,
  },
  data() {
    return {
      source:
        // "http://storag.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
       "/static/manual/manual.pdf",
      pageNum: 1,
      scale: 1,  // 缩放比例
      numPages: 0, // 总页数
    };
  },
  mounted() {
  
    const loadingTask = createLoadingTask(this.source);
    loadingTask.promise.then((pdf) => {
      this.numPages = pdf.numPages;
    }).catch((err) => {
        // console.log("pdf加载失败！")
        this.$alert('抱歉！使用手册显示失败，请联系管理员处理！', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            // 点击确定进行的操作
            this.$router.go(-1)
          })
      })
  },
  computed: {
    scaleFun(index) { // 缩放
      var scale = this.scale;
      return `transform:scale(${scale});transform-origin: 50% 0;`;
    },
  },
  methods: {
    prev() {
      if (this.pageNum > 1) {
        this.pageNum -= 1;
      }
    },
    next() {
      if (this.pageNum < this.numPages) {
        this.pageNum += 1;
      }
    },
    zoomA() {
      this.scale += 0.1;
    },
    zoomB() {
      this.scale -= 0.1;
    },
    back() {
       
      this.$router.go(-1);
    },
  },
};
</script>
 


<style scoped>

.div {
  /* border: 1px solid red; */
  top: 100px;
  position: fixed;
  z-index: 999;
  left: 10px;
}
#container .vue-pdf-embed:not(:first-child) {
  /* border: 1px solid transparent; */
  text-align: center;
  /* margin-top: -1px; */
}
#container {
 /* border: 1px solid red; */
 
  margin-top: 100px;
  /* padding: 50px; */

}
.grid-content.bg-purple {
    /* border: 1px solid red; */
    padding: 20px;
    background-color: white;
    text-align: left;
    box-shadow: 0 3px 6px rgba(62, 64, 65, 0.24),0 0 1px rgba(79, 81, 82, 0.12);
    /* height: 1000px; */
}
span {
    color: #c1c4cb;
    font-family: '宋体', 'Times New Roman', Times, serif;
    font-size: 14px;
    display: block;
    margin-top: -20px;
    margin-left: 20px;
}
h1{
    font-family: '宋体', 'Times New Roman', Times, serif;
}
</style>