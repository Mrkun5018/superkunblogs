<script setup lang="ts">
import Tags from './Tags.vue'
import { reactive } from "vue"
import requests from '../../utils/requests'
import { useRouter } from 'vue-router'
import { RespondType } from '../../utils/models'

const router = useRouter()
const ITSkills:string[] = ["Hadoop", "HDFS", "Java", "MapReduce", "Yarn", "大数据", "Python", "JavaScript", "NodeJs", "CSS", "JQuery",  "C/C++"]
const amusements = ["英雄联盟", "我的世界", "王者荣耀", "国漫", "网易云10级", "金铲铲", "佛系", "己所不欲勿施于人", "飞天螳螂", "索子哥", "瞎儿爷", "十年老后羿"]

const state = reactive({
    token: "",
})

async function verifyEditToken() {
    const params = { token: state.token }
    const respond: RespondType = await requests.post('/verify/token', params)
    if (respond.reason.code == 200) {
        router.push('/editor')
    }
    state.token = ""
}

</script>
<template>
    <div class="author-container" id="author-box">
        <div class="author-container-draggable" id="draggable"></div>
        <div class="author-container-content">
            <div class="author-container-aside">
                <div class="aside-items">
                    <el-avatar size="large" src="http://127.0.0.1:8080/avatar/1667401317650.jpeg" />
                </div>

                <div class="aside-items"> 
                    <el-link>月光下的闰土</el-link> 
                    <el-link>2220138602@QQ.COM</el-link>
                    <el-link>13377380532</el-link> 
                </div>

                <div class="aside-items">
                    <el-link>路漫漫其修远兮</el-link>
                    <el-link>吾将上下而求索</el-link>
                </div>

                <div class="aside-items">
                    <el-avatar size="small" src="http://127.0.0.1:8080/avatar/1667401317650.jpeg" />
                    <el-avatar size="small" src="http://127.0.0.1:8080/avatar/1667401317650.jpeg" />
                    <el-avatar size="small" src="http://127.0.0.1:8080/avatar/1667401317650.jpeg" />
                    <el-avatar size="small" src="http://127.0.0.1:8080/avatar/1667401317650.jpeg" />
                </div>

            </div>

            <div class="author-container-box">
                <el-link v-for="skill, index in ITSkills" :key="index">{{ skill }}</el-link>
                <el-divider/>
                <el-link v-for="skill, index in amusements" :key="index">{{ skill }}</el-link>
                <el-divider/>
                <Tags :show-home="false" :left="3"></Tags>
                <el-divider/>

                <div class="author-container-info">

                </div>

                <div class="author-container-token">
                    <el-input v-model="state.token" placeholder="Please input token" size="small" @keyup.enter.native="verifyEditToken()"/>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.author-container{
    display: flex;
    flex-direction: column;

    width: 600px;
    height: 400px;

    border-radius: 5px;
    box-sizing: border-box;
    text-align: center;
    overflow-y: auto;

    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color:var(--cadetblue);

    &-content {
        display: flex;
        height: 100%;
    }

    &-draggable {
        height: 15px;
        background-color: red;
    }

    &-aside {
        box-sizing: border-box;
        padding-top: 15px;
        width: 200px;
        height: 100%;
        background-color: rgb(89, 164, 167);
    }

    &-box {
        box-sizing: border-box;
        padding-top: 15px;
        width: 100%;
    }
    
    &-token {
        padding: 0 5px;
    }
}

.aside-items + .aside-items {
    margin-bottom: 15px;
}
.el-avatar + .el-avatar {
    margin-left: 5px;
}

.el-link + .el-link {
    margin-left: 5px;
}

.el-input {
    margin: 5px 0;
}

.el-divider--horizontal  {
    margin: 7.5px 0;
}
</style>
