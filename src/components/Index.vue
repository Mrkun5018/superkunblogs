<script setup lang="ts">
import Tags from './lib/Tags.vue'
import Library from './lib/Library.vue'
import requests from '../utils/requests'
import {reactive, onMounted} from 'vue'
import { NoteModle } from '../utils/models'

type stateType = {
  hottest: NoteModle[],
  laster: NoteModle[]
}

const state = reactive<stateType>({
  hottest: [],
  laster: []
})

const queryNotesByPath = async function(path: string, params: Object={}) {
    const respond: any = await requests.get(path, params)
    return respond.reason.code === 200 ? respond.data : []
}

onMounted(async()=>{
    const hotList = await queryNotesByPath('/query/order/hottest')
    state.hottest.push(...hotList)
    const lasList = await queryNotesByPath('/query/order/later')
    state.laster.push(...lasList)
    
})

</script>
<template>
  <div class="container-box">
    <pre class="text-container">
              _____________ __________________________________     _____              ____  __.             
      /   _____/    |   \______   \_   _____/\______   \   /     \   _______  |    |/ _|__ __  ____  
      \_____  \|    |   /|     ___/|    __)_  |       _/  /  \ /  \  \_  __ \ |      &lt; |  |  \/    \ 
      /        \    |  / |    |    |        \ |    |   \ /    Y    \  |  | \/ |    |  \|  |  /   |  \
      /_______  /______/  |____|   /_______  / |____|_  / \____|__  /  |__| /\ |____|__ \____/|___|  /
              \/                           \/         \/          \/        \/         \/          \/ 
    </pre>

    <div class="menu-container">
      <Tags class="tags" :left="3"></Tags>
    </div>

    <div class="node-container">
      <Library title="TOP5" :data="state.hottest"></Library>
      <Library title="最近更新" :data="state.laster"></Library>
    </div>

    <div class="fozu-container">
      <pre>
                     _ooOoo_
                    o8888888o
                    88" . "88
                    (| -_- |)
                     O\ = /O
                 ____/`---'\____
               .   ' \\| |// `.
                / \\||| : |||// \
              / _||||| -:- |||||- \
                | | \\\ - /// | |
              | \_| ''\---/'' | |
               \ .-\__ `-` ___/-. /
            ___`. .' /--.--\ `. . __
         ."" '&lt; `.___\_&lt;|>_/___.' >'"".
        | | : `- \`.;`\ _ /`;.`/ - ` : | |
          \ \ `-. \_ __\ /__ _/ .-` / /
  ======`-.____`-.___\_____/___.-`____.-'======
                     `=---='
 
  .............................................
           佛祖保佑             永无BUG
      </pre>
      <pre>
                     _ooOoo_
                    o8888888o
                    88" . "88
                    (| -_- |)
                     O\ = /O
                 ____/`---'\____
               .   ' \\| |// `.
                / \\||| : |||// \
              / _||||| -:- |||||- \
                | | \\\ - /// | |
              | \_| ''\---/'' | |
               \ .-\__ `-` ___/-. /
            ___`. .' /--.--\ `. . __
         ."" '&lt; `.___\_&lt;|>_/___.' >'"".
        | | : `- \`.;`\ _ /`;.`/ - ` : | |
          \ \ `-. \_ __\ /__ _/ .-` / /
  ======`-.____`-.___\_____/___.-`____.-'======
                     `=---='
 
  .............................................
           佛祖保佑             永无BUG
      </pre>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container-box {
  width: 100%;
  height: 100%;
}
.text-container {
  text-align: center;
  margin: 0;
} 
.menu-container {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
}
.node-container {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
}

.fozu-container {
  display: flex;
  justify-content: space-evenly;
}
</style>
