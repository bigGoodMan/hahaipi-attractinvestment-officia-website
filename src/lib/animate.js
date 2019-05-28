
// startPlace是起始位置；
// endPlace是目标位置；
// rate是缓动速率；
// callback是变化的位置回调，支持两个参数，value和isEnding，表示当前的位置值（数值）以及是否动画结束了（布尔值）
const animate = {
  easeOut (startPlace, endPlace, rate, callback = () => {}) {
    if (startPlace === endPlace || typeof startPlace !== 'number') {
      return
    }
    let start = startPlace
    let end = endPlace || 0
    rate = rate || 2
    let step = function () {
      start = start - (start - end) / rate
      if (Math.abs(start - endPlace) <= 1) {
        callback(endPlace, true)
        return
      }
      callback(start, false)
      requestAnimationFra(step)
    }
    step()
  }
}
// let requestAnimationFra = fn => setTimeout(fn, 1000)
let requestAnimationFra = window.requestAnimationFrame || (fn => setTimeout(fn, 17))
export default animate
// 84.64262026460288 88 0.33573797353971174
