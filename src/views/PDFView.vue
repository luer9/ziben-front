<template>
 
 <pdfview v-bind:curitemName='curitemName' />   
   <!-- v-bind:preitemName='preitemName'  -->
</template>
<script>
// import pdfview from '@/components/pdfview.vue';
import pdfview from '@/components/PdfVUE3.vue';
import {useRoute} from "vue-router";
export default {
    name: 'PdfPage',
    components: {
        pdfview
    },
    props:{},
    data(){
        return {
            curitemName: "",
            preitemName: ""
        }
      
    },
    created() {
        const route = useRoute();
        // const _content = route.query.itemName;
        this.curitemName = route.query.curitemName
        
        // this.preitemName = route.query.preitemName
        // console.log("[PDF PDF VIEW cur]" + this.curitemName)
        // console.log("[PDF PDF VIEW pre] " + this.preitemName)
    },
    watch: {
        
    }
}
</script>
