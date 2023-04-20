import requests from './requests'
import { RandomNum } from './public'
import { ButtonType } from 'element-plus'
import { TagType } from './models'

const tagTypeList: ButtonType[] = ["success", "danger", "warning", "info", "primary"]

async function queryNoteTags(): Promise<TagType[]> {
    const respond = await requests.get('/query/tags')

    let tagArray: TagType[] = []

    respond.data.forEach((element: string) => {
        const random = RandomNum(0, tagTypeList.length)
        const items: TagType = {
            tag: element,
            type: tagTypeList[random],
            margin: null
        }
        tagArray.push(items)
    });

    return tagArray

}
export async function GetTags(): Promise<TagType[]> {
    const tags = sessionStorage.getItem("super-note-tags")
    if (tags) return JSON.parse(tags)
    const tagList: TagType[] = await queryNoteTags()
    return tagList
}

export default async function init() {
    const tags = await GetTags()
    const tagString = JSON.stringify(tags)
    sessionStorage.setItem("super-note-tags", tagString)
}
