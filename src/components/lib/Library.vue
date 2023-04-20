<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NoteModle } from '../../utils/models'
const router = useRouter()


const pushDetailsLink = (md5:string, author:string)=> router.push(`/details?md5=${md5}&author=${author}`)
const props = defineProps<{ title: string, data: NoteModle[] }>()

</script>
<template>
    <div class="main">
        <div class="tag-title"> {{ props.title }} </div>
        <ul>
            <li v-for="(items, idx) in props.data" :key="idx">
                <span>{{idx+1}}.&nbsp;</span>
                <el-link @click="pushDetailsLink(items.md5, items.author)">{{items.title}}</el-link>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
ul {padding-left: 10px;}
ul li { list-style: none; }
.tag-title{
    cursor: pointer;
    background-color: #409eff;
    font-size: 12px;
    height: 16px;
    line-height: 16px;
    vertical-align: middle;
    text-align: center;
    border-radius: 3px;
}
</style>
