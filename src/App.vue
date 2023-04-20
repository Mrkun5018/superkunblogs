<script setup lang="ts">
import { Setting, Back, HomeFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { reactive } from "vue"
import Author from './components/lib/Author.vue'
import Settings from './components/lib/Setting.vue'


const state = reactive({
    token: "",
    showSetting: false,
    showBlogsInfo: false
})


const router = useRouter()
const avatarUri = 'http://127.0.0.1:8080/avatar/1667401317650.jpeg'

const pushTo = function (path: string) { router.push(path) }
const showAuthorInfo = function() {
    state.showBlogsInfo = !state.showBlogsInfo
    return state.showBlogsInfo
}

const back = function() {router.go(-1)}

</script>

<template>
    <Author v-show="state.showBlogsInfo"></Author>

    <!-- <el-button :icon="Back" size="small" circle @click="back()"></el-button> -->

    <el-dialog v-model="state.showSetting" title="Warning" width="30%" center>
        <Settings :show-flag="state.showSetting"></Settings>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="state.showSetting = false">Cancel</el-button>
            <el-button type="primary" @click="state.showSetting = false"> Confirm </el-button>
        </span>
        </template>
    </el-dialog>

    <div class="container-box">
        <el-container class="main-container">

            <el-header height="30px" class="header-container">
                
                <el-avatar size="small" :src="avatarUri" @click="showAuthorInfo()"/>
                <div style="display: flex; align-items: center">
                    
                    <el-link @click="pushTo('/')">主页</el-link>
                    <el-link>项目</el-link>
                    <el-link>关于</el-link>
                    
                </div>
                <div>
                    <el-button :icon="HomeFilled" size="small" circle @click="pushTo('/')"></el-button>
                    <el-button :icon="Setting" size="small" circle @click="state.showSetting = true"></el-button>
                </div>

            </el-header>

            <el-main>
                <div class="view-container"> 
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<style lang="less" scoped>
.main-container, 
.container-box {
    height: 100%;
    width: 100%;
}

.el-button + .el-button { margin-left: 0; }

.el-header{
    padding-left: 10px;
    padding-right: 10px;
}

.el-main {
    height: 100%;
    width: 100%;
}

.el-main {
    display: flex;
    padding: 0;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.view-container {
    height: 100%;
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box;
}

.el-link {
    margin-left: 5px;
}
.el-button + .el-button {
    margin-left: 10px;
}
</style>
