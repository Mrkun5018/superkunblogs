
export function getCurrentTime() {
  // const aData = new Date() // Wed Aug 21 2019 10:00:58 GMT+0800 (中国标准时间)
  // return aData.getFullYear() + '-' + (aData.getMonth() + 1) + '-' + aData.getDate()
  const yy = new Date().getFullYear()
  const mm = new Date().getMonth() + 1
  const dd = new Date().getDate()
  const hh = new Date().getHours()
  const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
  const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
  return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
}

export function attrStaticData(name: string) {
  const fileUrl = `../assets/img/${name}`
  const url = new URL(fileUrl, import.meta.url) || ''
  return  url.toString()
}

export function RandomNum (min: number, max: number) { 
  return Math.floor(Math.random() * (max - min)) + min 
}
