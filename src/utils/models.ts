import { ButtonType } from 'element-plus'

export type NoteModle = {
  author: string,
  md5: string,
  tags: string,
  timestamp: string,
  title: string,
  useful: number
}

export type offsetT = {
  marginLeft: string,
  marginTop: string
}

export type TagType = {
  tag: string,
  type: ButtonType,
  margin: offsetT | null
}

type reasonType = {
  code: number,
  message: string
}

export type RespondType = {
  data: object,
  status: 'succeed' | 'failure',
  reason: reasonType
}

export type NoteFormType = {
  author: string 
  title: string 
  tags: TagType[], 
  content: string 
  createTime: string
}