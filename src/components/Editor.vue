<script setup lang="ts">
import requests from '../utils/requests'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { reactive, ref, onMounted } from 'vue'
import { getCurrentTime } from '../utils/public'
import { TagType, NoteFormType } from '../utils/models'
import { Folder, Timer, User, Suitcase } from '@element-plus/icons-vue'
import { GetTags } from '../utils/utils'

const dialogFormVisible = ref(false)
const NoteForm = reactive<NoteFormType>({ author: 'Mr.Kun', title: '', tags: [], content: '', createTime: getCurrentTime() })
type stateType = { options: TagType[] }
const state = reactive<stateType>({
    options: []
})

function onsubmit(value: string, h: Promise<string>) {
    dialogFormVisible.value = true
    // if (!value.length) return alert("保存失败，内容为空")
    // const respond: RespondType = await requests.post('admin/update', state)
    // if (respond.status === "succeed") {
    //     alert("保存成功")
    // }
}

const onUploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
    const res = await Promise.all(
        files.map((file) => {
            return new Promise(async (resolved, rejected) => {
                const form = new FormData()
                form.append('note-image', file)
                const headers = { headers: { 'Content-Type': 'multipart/form-data' } }
                const respond = await requests.post('upload/image', form, headers)
                resolved(respond)
            })
        })
    )
    callback(res.map((item: any) => requests.getUri() + item.data.url));
}

onMounted(
    async function() {
        state.options = await GetTags()
    }
)
</script>
<template>
    <div class="editor-container">
        <MdEditor v-model="NoteForm.content" class="editor" @on-save="onsubmit" @on-upload-img="onUploadImg" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="Set Note Info">
        <el-form :model="NoteForm">
            <el-form-item>
                <el-input size="small" placeholder="notes title" v-model="NoteForm.title" clearable
                    :prefix-icon="Folder"></el-input>
            </el-form-item>

            <el-form-item>
                <el-input size="small" disabled placeholder="create time" v-model="NoteForm.createTime"
                    :prefix-icon="Timer"></el-input>
            </el-form-item>

            <el-form-item>
                <el-input size="small" disabled placeholder="Author" v-model="NoteForm.author"
                    :prefix-icon="User"></el-input>
            </el-form-item>

            <el-form-item>
                <el-select v-model="NoteForm.tags" multiple filterable allow-create size="small" 
                    placeholder="请选择文章标签" tag-type="success" default-first-option clearable>
                    <el-option v-for="(item, idx) in state.options" :key="idx" :label="item.tag" :value="item.tag"></el-option>
                    <template #prefix>
                        <el-icon> <Suitcase /> </el-icon>
                    </template>
                </el-select>
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="small">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false" size="small">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style lang="less" scoped>
.editor-container {
    height: 100%;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
}

.editor {
    border-radius: 3px;
    height: 100%;
    background-color: var(--cadetblue);
}

.el-select {
    width: 100%;
}
.option-prefix{
    height: 100%;
}
:deep(.el-select--small .el-select-tags-wrapper.has-prefix) {
    margin-left: 19px;
}
:deep(.el-dialog__header) {
    padding: 0;
}
:deep(.el-dialog__body) {
    padding: 0 !important;
}
</style>