
function RandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function getTypeList() {
  return ['', 'success', 'info', 'danger', 'warning']
}
module.exports = {
  RandomNum,
  getTypeList
}
