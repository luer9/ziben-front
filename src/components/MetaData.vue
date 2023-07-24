<template>
<span class="Updatetime"> 更新时间：2022.05.01</span> 

   <h1> 核心词库列和数据元素说明</h1>
    <span> 本部分将对核心词库文件中，各个数据文件的表头、数据元素及元素描述进行说明。</span>
   
    <h2> 概念术语表 (文件名： ConceptTerms)</h2>

    <el-table :data="ConceptTerms" style="width: 100%">
        <el-table-column prop="col" label="列数" />
        <el-table-column prop="des" label="描述"  />
    </el-table>
    <span class="record"> 样例记录:  CN00000005|ST03950516|tumorous cell|ENG|ET</span>

    <h2> 语义类型表 (文件名：SemanticTypes)</h2>
    <el-table :data="SemanticTypes" style="width: 100%">
        <el-table-column prop="col" label="列数" />
        <el-table-column prop="des" label="描述"  />
    </el-table>
    <span class="record"> 样例记录:  CN00000001|3|Chemical or Drug</span>

    <h2> 定义表 (文件名：Definitions)</h2>
    <el-table :data="Definitions" style="width: 100%"> 
        <el-table-column prop="col" label="列数" />
        <el-table-column prop="des" label="描述"  />
    </el-table>
    <span class="record"> 样例记录:  1|CN00000086|cell type|Wikidata</span>

    <h2> 关系表 (文件名：Relations)</h2>
    <el-table :data="Relations" style="width: 100%"> 
        <el-table-column prop="col" label="列数" />
        <el-table-column prop="des" label="描述"  />
    </el-table>
    <span class="record"> 样例记录:  RL000000021|CN00000024|CN04217347|1|is_a</span>

    <h2> 语义网络表 (文件名：SemanticNetwork)</h2>
    <el-table :data="SemanticNetwork" style="width: 100%"> 
        <el-table-column prop="col" label="列数" />
        <el-table-column prop="des" label="描述"  />
    </el-table>
    <span class="record"> 样例记录:  1|ENG|Anatomy|0|1</span>

    <h2> 关系名称表 (文件名：RelationNames)</h2>
    <el-table :data="RelationNames" style="width: 100%"> 
        <el-table-column prop="col" label="列数" />
        <el-table-column prop="des" label="描述"  />
    </el-table>
    <span class="record"> 样例记录:  1|ENG|is_a</span>
</template>

<script>
export default{
    name: 'MetaData',
    data() {
        return {
            ConceptTerms:[
                {
                    col: 'CID',
                    des: '概念的唯一标识符'
                },
                {
                    col: 'SID',
                    des: '术语的唯一标识码'
                },
                {
                    col: 'STR',
                    des: '术语的名称'
                }
            ],
            SemanticTypes: [
                {
                    col: 'CID',
                    des: '概念的唯一标识符'
                },
                {
                    col: 'SID',
                    des: '术语的唯一标识码'
                },
                {
                    col: 'STR',
                    des: '术语的名称'
                }
            ],
            Definitions: [
                {
                    col: 'CID',
                    des: '概念的唯一标识符'
                },
                {
                    col: 'SID',
                    des: '术语的唯一标识码'
                },
                {
                    col: 'STR',
                    des: '术语的名称'
                }
            ],
            Relations: [
                {
                    col: 'CID',
                    des: '概念的唯一标识符'
                },
                {
                    col: 'SID',
                    des: '术语的唯一标识码'
                },
                {
                    col: 'STR',
                    des: '术语的名称'
                }
            ],
            SemanticNetwork: [
                {
                    col: 'CID',
                    des: '概念的唯一标识符'
                },
                {
                    col: 'SID',
                    des: '术语的唯一标识码'
                },
                {
                    col: 'STR',
                    des: '术语的名称'
                }
            ],
            RelationNames: [
                {
                    col: 'CID',
                    des: '概念的唯一标识符'
                },
                {
                    col: 'SID',
                    des: '术语的唯一标识码'
                },
                {
                    col: 'STR',
                    des: '术语的名称'
                }
            ]
        }
    }
}
</script>
<style scoped>
.Updatetime {
    color: #c1c4cb;
    font-size: 14px;
    display: block;
}
h1{
    color: #303133;
    font-size: 22px;
    margin-top: 40px;
}
h2{
    color: #303133;
    font-size: 20px;
    margin-top: 40px;
}
span{
    display: block;
    font-size: 16px;
    color: #444444;
}
.record {
    display: block;
    margin-top: 20px;
}
</style>