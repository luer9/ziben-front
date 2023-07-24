<template>
    <img src="@/assets/agreement.png"/>

    <span> 

        特殊注明除外，xxxxx本体系统（xxxx Informatics Ontology System，xIOS）网站上全部内容，以及从网站上下载的xIOS源数据文件，
        均采用 <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a>（Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International license，CC BY-NC-ND 4.0）进行管理。 <br/>
        如需用于商业用途，请联系我们获取授权，联系邮箱：<a href="mailto:luluyang@tju.edu.cn"> luluyang@tju.edu.cn </a>。 <br/>
        天津大学认知与智能实验室对使用XIOS数据造成的任何损害或损失，不负任何直接或间接的法律责任，亦不予以赔偿。
    </span>
</template>

<script>
export default {
    name: 'ArgeeMent'
}
</script>

<style scoped>
    img {
        display: block;
        width: 400px;
        margin-top: 40px;
    }
    span{
        display: block;
        margin-top: 20px;
        color: #444444;
        font-size: 16px;
    }
    a{
        color: #5a9cf8;
        text-decoration: none;
    }
</style>
