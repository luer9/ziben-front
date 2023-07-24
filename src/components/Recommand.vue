<template>
<el-scrollbar ref="scrollbarRef" height="150px" always @scroll="scroll">
  <el-space wrap>
    <div v-for="(node) in tableData" :key="node"  @click='handleClick(node.name)' >
      <el-button> {{node.name}} </el-button>
    </div>
  </el-space>
     
</el-scrollbar>
 
</template>
<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
// import { ElScrollbar } from 'element-plus'

const max = ref(0)
// const value = ref(0)
const innerRef = ref<HTMLDivElement>()
// const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

onMounted(() => {
  max.value = innerRef.value!.clientHeight - 380
})
 
export default {
    name: "recommandList",
    props: {
        tableData:{
          type: Object
        },
        scroll: {
          type: String
        }
    },
    methods: {
    },
    setup() {
        const _router = useRouter();
        const handleClick = (name: any) => {
            _router.push({
                name: "infor",
                params: {
                    content: name,
                // type: select.value
                }
            })     
        }
        return {
            handleClick 
        }
    }
}
</script>
<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

</style>