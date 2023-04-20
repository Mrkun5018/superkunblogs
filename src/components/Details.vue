<script setup lang="ts">
import requests from '../utils/requests'
import { onMounted, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { User, Timer } from '@element-plus/icons-vue' 
import { TocItem } from 'md-editor-v3/lib/MdEditor/extensions/MdCatalog'

import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

type ContentFrame = {author: string, createTime: string, tags: string[], outline: string, title: string}
type detailsFrame = {  content: string, theme: boolean, id: string }

const route = useRoute()
const router = useRouter()
const state = reactive<ContentFrame>({ tags: [], author: '', createTime: '', outline: '', title: '' })
const theme = computed(() => { return details.theme ? 'light' : 'dark' })
const MdCatalog = MdEditor.MdCatalog
const scrollElement = document.documentElement
const details = reactive<detailsFrame>({
  content: '',
  theme: true,
  id: 'preview'
})

function onClickCatalog (e: MouseEvent, t: TocItem) {
  console.log("=======",e, t);       
}
const markedHeadingId = (_text: string, _level: number, index: number) => {return`heading-${index}`};

MdEditor.config({
  markedRenderer(renderer) {
    // 这里的'headingId'是通过你提供的'markedHeadingId'方法生成的。
    renderer.heading = (text, level, _raw, _s, _index, headingId) => {
      // 这种方式通常用与处理使用配置了 'renderer.heading'，
      // 同时又设置的具体编辑器的'markedHeadingId'属性带来的优先级问题。
      console.log(`<h${level} id="${headingId}">${text}</h${level}>`);
      
      return `<h${level} id="${headingId}">${text}</h${level}>`;
    }
    renderer.link = (href: string, title: string, text: string) => {
      return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
    }
    return renderer;
  }
})
onMounted( async function(){ 
  const params = { 
    md5: route.query.md5, 
    author: route.query.author 
  }

  const respond: any = await requests.get('/query/details', { params })
  if (respond.reason.code === 200) {

    details.content = respond.data.content

    const RspData: ContentFrame = respond.data

    state.author = RspData.author
    state.createTime = RspData.createTime
    state.tags = RspData.tags
    state.outline = RspData.outline
    state.title = RspData.title
  }

})
</script>
<template>
  <div class="details-container">

    <div class="details-header">
      <el-switch v-model="details.theme" inline-prompt active-text="light" inactive-text="dark" size="small"/> 
      <div class="details-header-title"> {{ state.title }}</div>

      <div class="details-header-user">
        <el-tag effect="dark" size="small">
          <el-icon style="vertical-align: middle"> <User /> </el-icon>
          {{state.author}}
        </el-tag>

        <el-tag effect="dark" size="small">
          <el-icon style="vertical-align: middle"> <Timer /> </el-icon>
          {{state.createTime}}
        </el-tag>
      </div>

      <div class="details-header-tag">
        <el-tag v-for="tag in state.tags" :key="tag" size="small" effect="dark"> {{tag.toLocaleUpperCase()}}</el-tag>
      </div>

      <div class="details-header-back">
        <el-tag size="small" type="warning" @click="router.go(-1)" effect="dark" >返回</el-tag>
        <el-tag size="small" type="warning" @click="router.push('/')" effect="dark" >主页</el-tag>
      </div>
    </div>

    <div class="details-content">

      <div class="details-content-body">
        <MdEditor 
        v-model="details.content" 
        :markedHeadingId="markedHeadingId"
        :editorId="details.id" 
        :theme="theme" 
        showCodeRowNumber 
        previewOnly 
        class="details-content-editor" />
      </div>
      
      <div class="details-content-aside">
        <MdCatalog 
        :markedHeadingId="markedHeadingId"
        :editorId="details.id" 
        :scrollElement="scrollElement" 
        :theme="theme" 
        :onClick="onClickCatalog"/>
      </div>

    </div>
      
  </div>
</template>
<style lang="less" scoped>
.details-container {
  height: 100%;
  width: 100%;
}

.details-header {
  width: 100%;
  padding: 3px;
  box-sizing: border-box;
  background-image: url("../assets/img/0001.jpg");
  &-title {
    text-align: center;
  }
  &-user {
    text-align: center;
    margin-top: 5px;
  }
  &-tag {
    text-align: center;
    margin-top: 5px;
  }
  &-back {
    display: flex;
    justify-content: space-between;
  }
}

.details-content {
  width: 100%;
  height: calc(80vh);
  display: flex;
  // padding: 15px;
  box-sizing: border-box;
  // overflow-y: scroll;
  &-body {
    flex: 1;
    height: 100%;
  }
  &-aside {
    width: 200px;
    height: 100%;
  }
  &-editor {
    padding: 0 0 0 15px;
    height: 100%;
    border-radius: 3px;
  }
}

.el-tag { cursor: pointer; }

.el-tag + .el-tag {
  margin-left: 10px ;
}

/deep/.md-editor-content .md-editor-preview-wrapper {
  padding-right: 15px !important;
}
.details-content::-webkit-scrollbar {
    width: 4px;    
    height: 4px;
}

.details-content::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    background: rgba(0,0,0,0.2);
}

.details-content::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
</style>
