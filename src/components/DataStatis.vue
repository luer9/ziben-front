<template>
 

   <span class="Updatetime"> 更新时间：2022.05.01</span> 
    <h1> 核心词库规模统计</h1>
    <span> 概念数量: {{conceptSize}}</span>
    <span> 术语总量: {{termSize}}</span>
    <span> 关系三元组数量: {{tripleSize}} </span>
    <h1> 概念语义类型分布</h1>

        <el-table :data="conceptData" style="width: 100%">
            <el-table-column prop="id" label="语义类型ID" width="180" />
            <el-table-column prop="name" label="语义类型名称" width="180" />
            <el-table-column prop="sum" label="概念数量" />
            <el-table-column prop="percent" label="占比（%）" />
        </el-table>
    <div>
    <BarChart> </BarChart>
    </div>

    <h1> 三元组关系类型分布</h1>
        <el-table :data="tripleData" style="width: 100%">
                <el-table-column prop="id" label="关系类型ID" width="180" />
                <el-table-column prop="name" label="关系类型名称" width="180" />
                <el-table-column prop="sum" label="关系三元组数量" />
                <el-table-column prop="percent" label="占比（%）" />
        </el-table>
    <div>
        <PieChart> </PieChart>
    </div>

    <h1> 术语语言分布</h1>
        <el-table :data="termDis" style="width: 100%">
                <el-table-column prop="encoder" label="语言简码" width="180" />
                <el-table-column prop="language" label="语言" width="180" />
                <el-table-column prop="sum" label="术语数量" />
                <el-table-column prop="percent" label="占比（%）" />
        </el-table>

    <div>
        <G2Line :charData="serverData" :id="'c1'"></G2Line>
    </div>
      
    <div> 

          <BarSimpleChart > </BarSimpleChart>
    </div>
        
    <div>    
        测试1
        <TestChart> </TestChart>
    </div>

    <div>    
        测试2
        <LineChart> </LineChart>
    </div>

    <div>    
        测试3
        <PieChartTest> </PieChartTest>
    </div>

      <div>    
        测试4
        <PointChart> </PointChart>
    </div>

    <div> 
        测试5
        <StripChart> </StripChart>
    </div>
</template>


<script >
import G2Line from '@/components/G2Line.vue'
import PieChart from '@/components/PieChart.vue'
import BarChart from '@/components/BarChart.vue'
import BarSimpleChart from '@/components/BarSimpleChart.vue'
import TestChart from '@/components/BarChartDir/TestChart6.vue'
import LineChart from '@/components/LineChartDir/LineChart7.vue'
import PieChartTest from '@/components/PieChartDir/PieChart5.vue'
import PointChart from '@/components/PointChartDir/PointChart3.vue'

import StripChart from '@/components/StripChartDir/StripChart5.vue'

export default {
    name: 'DataStatis',
    components: {
        G2Line,
        PieChart,
        BarChart,
        BarSimpleChart,
        TestChart,
        LineChart,
        PieChartTest,
        PointChart,
        StripChart
    },
    data(){
        return {
            'conceptSize': 100000,
            'termSize': 2132131,
            'tripleSize': 12213213,
             conceptData: [
                {
                    id: 2,
                    name: '疾病',
                    sum: 3131312,
                    percent: 20.1,
                },
                {
                    id: 64,
                    name: '治疗或预防程序',
                    sum: 31213312,
                    percent: 10,
                },
                {
                    id: 1,
                    name: '症状、体征、临床所见',
                    sum: 312312,
                    percent: 56,
                },
                {
                    id: 10,
                    name: '诊断程序',
                    sum: 3123312,
                    percent: 1,
                },
            ],
             tripleData:[
                   {
                    id: 1,
                    name: '是一种',
                    sum: 31312,
                    percent: 22.1,
                },
                {
                    id: 24,
                    name: '包含部分',
                    sum: 322,
                    percent: 1.5,
                },
                {
                    id: 13,
                    name: '发现',
                    sum: 312,
                    percent: 1.4,
                },
                {
                    id: 11,
                    name: '表达',
                    sum: 31,
                    percent: 0.5,
                }
            ],
             termDis: [
                {
                    encoder: 'ENG',
                    language: '英文',
                    sum: 31311232132,
                    percent: 70.6,
                },
                {
                    encoder: 'CHS',
                    language: '简体中文',
                    sum: 3131122,
                    percent: 29.4,
                }
            ],
             serverData: [
                {
                    year: '2010',
                    value: 3
                }, {
                    year: '2011',
                    value: 4
                }, {
                    year: '2012',
                    value: 3.5
                }, {
                    year: '2013',
                    value: 5
                }, {
                    year: '2014',
                    value: 4.9
                }, {
                    year: '2015',
                    value: 6
                }, {
                    year: '2016',
                    value: 7
                }, {
                    year: '2017',
                    value: 9
                }, {
                    year: '2018',
                    value: 13
                }
            ]
        } 
    },
    methods: {
        // 此处省略从服务器获取数据并且赋值给this.serverData
        // 推荐使用axios请求接口
    }
}

</script>

<style scoped>
h1{
    color: #303133;
    font-size: 22px;
    margin-top: 40px;
}
.Updatetime {
    color: #c1c4cb;
    font-size: 14px;
}
span{
    display: block;
    font-size: 16px;
    color: #444444;
}
</style>