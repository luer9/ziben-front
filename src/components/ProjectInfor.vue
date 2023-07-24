<template>

 <el-row>
    <el-col :span="23">
        <div class="grid-content bg-purple-dark" >
            <el-timeline>
                <el-timeline-item >
                <el-card>
                     <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple" >
                                <!-- <h4>Update Github template</h4> -->
                                <img src="@/assets/test.png">
                            </div></el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <h1>这一块介绍我们这个项目是什么</h1>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
                </el-timeline-item>
                <el-timeline-item >
                <el-card>

                     <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <h1>这一块介绍我们这个项目的开源项目【工具】</h1>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple" >
                                <!-- <h4>Update Github template</h4> -->
                                <img src="@/assets/test1.png">
                            </div>
                        </el-col>
                    </el-row>
                    <!-- <h4>Update Github template</h4> -->
                    
                </el-card>
                </el-timeline-item>
                <el-timeline-item >
                <el-card>
                     <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <!-- <h4>Update Github template</h4> -->
                                <img src="@/assets/test.png">
                            </div></el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <h1>如果后续项目有api的话，这一块可以介绍然后链接到api的那个页面</h1>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
                </el-timeline-item>
                <el-timeline-item >
                <el-card>
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <h1>这一块可以介绍应用</h1>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <!-- <h4>Update Github template</h4> -->
                                <img src="@/assets/test1.png">
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
                </el-timeline-item>
            </el-timeline>  
        </div>
    </el-col>
  </el-row>

</template>
<script>
export default {
    name: 'ProjectInfor',
    data(){},

}
</script>

<style scoped>
img{
    max-width: 100%; 
}
</style>