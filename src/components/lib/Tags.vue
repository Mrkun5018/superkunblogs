<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { HomeFilled } from '@element-plus/icons-vue'      // StringConstructor
import { TagType } from '../../utils/models'
import { GetTags } from '../../utils/utils'

const router = useRouter()
const tagArray = reactive<TagType[]>([])

const props = defineProps({
  showHome: { default: false, type: Boolean, required: false },
  left: { default: 0, type: Number }
})

const PushTo = function (tag: string) { router.push({ path: '/menu', query: { tag: tag } }) }
const PushIndex = function (url: string) { router.push(url) }

async function loadLocalTags() {
  let index = 0
  const tagList: TagType[] = await GetTags()
  const len = tagList.length - 1
  tagList.forEach(items => {
    const left = index > 0 || index < len ? `${props.left}px` : '0px'
    items.margin = { marginLeft: left, marginTop: '3px' }
    index++
  })

  tagArray.push(...tagList)
}

onMounted(loadLocalTags)

</script>
<template>
  <div class="container" v-if="tagArray.length">
    <el-button v-for="(items, index) in tagArray" :key="index" :type="items.type" :style="items.margin"
      @click="PushTo(items.tag)" size="small">{{ items.tag }}
    </el-button>

    <el-button @click="PushIndex('/')" type="success" size="small" v-if="props.showHome"
      :style="{ marginLeft: `${props.left}px`, marginTop: '3px' }" :icon="HomeFilled">
    </el-button>

  </div>
</template>
<style lang="less" scoped>
.container {
  box-sizing: border-box;
}
</style>