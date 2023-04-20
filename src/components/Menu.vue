<script setup lang="ts">
import Library from './lib/Library.vue'
import Tags from './lib/Tags.vue'
import { useRoute } from 'vue-router'
import { reactive, onMounted, watch } from 'vue'
import { NoteModle } from '../utils/models'
import requests from '../utils/requests'

const route = reactive(useRoute())
let tag = route.query.tag as string
let notelist = reactive<NoteModle[]>([])

watch(route, (from, to)=>{
  if (from.query.tag === to.query.tag) {
      tag = to.query.tag as string
      queryNoteByTag(tag)
  }
})

const queryNoteByTag  = async function(tag: string) {
  const params = { params: { tag } }
  const respond: any = await requests.get('/query/filter/tags', params)
  if (respond.reason.code === 200) {
    notelist.splice(0,notelist.length);
    notelist.push(...respond.data)
  }
}

onMounted(()=>{  queryNoteByTag(tag) })
</script>
<template>
    <div class="menu-container">
      <Tags :left="3" show-home class="menu-container-tags"></Tags>
      <Library :title="tag" :data="notelist" class="menu-container-library"></Library>

    </div>
</template>
<style lang="less" scoped>
.menu-container {
  display: flex;
  height: 100%;
  &-tags {
    width: 200px;
    padding: 15px;
    height: 100%;
    background-color: gainsboro;
  }
  &-library {
    flex: 1;
    margin-left: 15px;
  }
}
</style>
