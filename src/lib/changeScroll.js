import { eventThrottle, getParentsOffsetTop } from './tools'
import animate from './animate'
class ChangeScroll {
  /**
   * @param {*} idEle 滚动的dom
   * @param {*} clickClsEle 点击的dom
   * @param {*} controlClsEle 被控制的dom
   * @param {*} callback 回调
   */
  constructor ({ idEle, clickClsEle, controlClsEle, callback = () => {} }) {
    this.w = idEle ? document.querySelector(idEle) : window
    this.idEle = idEle ? document.querySelector(idEle) : document.documentElement || document.body
    this.clickClsEle = clickClsEle
    this.controlClsEle = controlClsEle
    this.callback = callback
    this.clickClsEleArr = []
    this.scrollFunc = eventThrottle({ callback: this.scrollDeal.bind(this), time: 200 })
    this.w.addEventListener('scroll', this.scrollFunc)
    this.srollDomFunc()
  }
  // dom处理与记录
  srollDomFunc () {
    const {
      clickClsEle,
      controlClsEle,
      idEle
    } = this
    document.querySelectorAll(clickClsEle).forEach(ele => {
      let sign = ele.getAttribute('data-sign')
      let clickEle = ele
      let controlEle = document.querySelector(`${controlClsEle}[data-sign="${sign}"]`)
      let top = getParentsOffsetTop(controlEle, idEle)
      let height = controlEle.offsetHeight
      let clientHeight = idEle.clientHeight
      let scrollHeight = idEle.scrollHeight
      let bottomScrollTop = scrollHeight - clientHeight
      let originScroll = top > bottomScrollTop ? bottomScrollTop : top // 当offsetTop 超出到底部scrollTop的时候以实际只能滚动底部的scrollTop距离
      console.log(top, originScroll)
      ele.onclick = (e) => {
        // if (typeof window.getComputedStyle(document.body).scrollBehavior === void 0) {
        //   // 传统的JS平滑滚动处理代码...
        // }
        animate.easeOut(idEle.scrollTop, originScroll, 10, function (val) {
          console.log(val)
          idEle.scrollTop = val
        })
      }
      this.clickClsEleArr.push({
        clickEle,
        controlEle,
        top,
        height
      })
    })
  }
  scrollDeal (e) {
    const clientHeight = this.idEle.clientHeight
    const scrollHeight = this.idEle.scrollTop
    this.clickClsEleArr.some(v => {
      // console.log(v.top >= scrollHeight, clientHeight + scrollHeight > v.top)
      if (v.top >= scrollHeight && (clientHeight + scrollHeight > v.top)) {
        this.callback({ ...v, clientHeight, scrollHeight })
        return true
      }
      return false
    })
  }
  clearScroll () {
    this.idEle.removeEventListener('scroll', this.scrollFunc)
  }
}
export default ChangeScroll
