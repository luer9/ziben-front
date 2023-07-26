<template>
  <Article v-bind:articleInfor='articleInfor' 
  v-bind:originNodes="originNodes"
   v-bind:smNodesList="smNodes"
   />
    
</template>

<script>
import Article from '@/components/ArticleInfor.vue'
import GraphView from '@/components/GraphView.vue'
import {useRoute} from "vue-router";
export default {
    name: 'InforView',
    components: {
        Article,
        GraphView
    },
    props:{},
    data(){
        return {
            articleInfor: {
                title: "资本论-劳动者",
                infor: "释义xxxxxxxxxx",
                type: "Term"
            },
            data: {
                nodeList: [],
                linkList: [],
            },
            originNodes: {},
            smNodes: []
            //  nodes: [
            //         {"id": "Myriel", "group": 1},
            //         {"id": "Napoleon", "group": 1},
            //         {"id": "Labarre", "group": 2},
            //         {"id": "Valjean", "group": 2}
            //     ],
            //     links: [
            //         {"source": "Napoleon", "target": "Myriel", "value": 1},
            //         {"source": "Valjean", "target": "Labarre", "value": 1},
            //         {"source": "Napoleon", "target": "Valjean", "value": 2},
            //     ]
        }
    },
    created() {
        const route = useRoute();
        const _content = route.params.content;
        const _cur = route.params.curTerm;
        // 没有参数 跳转 别的页面
        // console.log("参数接收到>11> ", _content, " ", _cur)
        // this.article = this.articleInfor

        // let url =
        // process.env.NODE_ENV === "production"
        //   ? "/vue-demo/example.json"
        //   : "/example.json";
        if(_content == undefined || _content == '') {
             this.$router.push('/allTermSearch')
          
        }else {
            let url = '/api/term/selectByName';
            this.$ajax.get(url, {
                    params: {
                        name: _content
                    }
                })
                .then(response => {
                    if(response.data.length !== 0) {
                        // console.log(">>>>> " + response.data)
                        // 这里需要转换一下数据
                        const dataSet = this.dataFormat(response.data)

                        this.originNodes = dataSet.coreNode; //核心
                        this.smNodes = this.filter(dataSet.smNodes, this.originNodes);
                        // console.log(this.smNodes)
                        this.d3jsonParser(response)
                        this.articleInfor = dataSet.coreNode;
                        this.article = this.articleInfor
                    //    console.log(">>>> " + this.data.nodeList)
                    }else {
                        this.$alert('抱歉！暂无此术语查询！', '提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        }).then(() => {
                            // 点击确定进行的操作
                            this.$router.go(-1)
                        })
                    }
                    
                })
                .catch(err => console.log("[error]" + err));
        }
                   
    },
    watch: {
        articleInfor(news, olds) {
            this.article = news
        }
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
                        properties: {
                        "name": item.startTerm.name,
                        "interpret": this.modifyText(item.startTerm.interpret.slice(item.startTerm.name.length))  
                        }
                    })
                }
                if (nodeSet.indexOf(item.endTerm.term_id) == -1) {
                nodeSet.push(item.endTerm.term_id)
                nodes.push({
                    id: item.endTerm.term_id,
                    label: 'term',
                    flag: item.endTerm.flag,
                    properties: {
                    "name": item.endTerm.name,
                    "interpret": this.modifyText(item.endTerm.interpret.slice(item.endTerm.name.length))
                    }
                })
                }
                links.push({
                    source: item.startTerm.term_id,
                    target: item.endTerm.term_id,
                    type: item.rel,
                    properties: {
                        "name": item.rel
                    }
                })
            }

            this.data = { nodeList: nodes, linkList: links }
            // return { nodes, links }
        },
        // 得到当前核心节点[只有一个]
        
        // 得到当前所有节点
        // 得到与当前节点有关的相似节点
        dataFormat(data) {
            var coreNode = {};    
            var allNode = [];
            var links = [];
            var smNodes = [];
            var flag = 0;
            const nodeSet = [] // 存放去重后nodes的id
            for(let item of data) {
                      
               if (nodeSet.indexOf(item.startTerm.term_id) == -1) {
                   nodeSet.push(item.startTerm.term_id)
                   allNode.push({
                    "id": item.startTerm.term_id,
                    "label": 'term',
                    "name": item.startTerm.name,
                    "interpret": this.modifyText(item.startTerm.interpret.slice(item.startTerm.name.length)) 
                })
               }
               // coreNode
               if (nodeSet.indexOf(item.endTerm.term_id) == -1) {
                    nodeSet.push(item.endTerm.term_id)
                    allNode.push({
                        "id": item.endTerm.term_id,
                        "label": 'term',
                        "name": item.endTerm.name,
                        "interpret": this.modifyText(item.endTerm.interpret.slice(item.endTerm.name.length))
                       
                    })
               }
               if(flag == 0) {
                    coreNode = {
                        "id": item.startTerm.term_id,
                        "label": 'term',
                        "name": item.startTerm.name,
                        "interpret": this.modifyText(item.startTerm.interpret.slice(item.startTerm.name.length))  
                       
                    };
                    flag = 1;
               }
               links.push( {"source": item["startTerm"].name, "target": item["endTerm"].name} )
           }
            
        //    console.log(allNode)
            smNodes = allNode
           return {coreNode, allNode, smNodes, links}
        }
    }
}
</script>

<style>
#board {
    /* border: 1px solid red; */
    max-width: 100%;
    background-color: white;
    box-shadow: 0 3px 6px rgba(62, 64, 65, 0.24),0 0 1px rgba(79, 81, 82, 0.12);
    text-align: center;
}
</style>