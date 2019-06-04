function getParentsOffsetTop (selfEle, parentsEle) {
  parentsEle = parentsEle || document.documentElement || document.body // 祖级dom
  let parentEle = selfEle.parentNode // 父级dom
  let distance = selfEle.offsetTop
  if (parentEle === parentsEle) {
    return distance
  }
  return distance + getParentsOffsetTop(parentEle, parentsEle)
}
// 防抖动
function eventThrottle ({ callback, time = 200, first = false, last = true }) {
  let [preTimeStamp, now, arg, timer, wait, cxt] = [0] // preTimeStamp 上次执行的时间
  const later = () => {
    preTimeStamp = +new Date()
    callback.apply(cxt, arg)
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
  return function () {
    now = +new Date()
    cxt = this
    arg = arguments
    // 第一次是否执行
    if (!preTimeStamp && !first) {
      preTimeStamp = now
    }
    wait = time - (now - preTimeStamp)
    // 执行时间还未超过规定时间或者执行时间超过规定时间（说明已经执行过）
    // wait > time 防止用户调时间
    if (wait <= 0 || wait > time) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      later()
    } else if (!timer && last) {
      timer = setTimeout(later, wait)
    }
  }
}
function getWebType () {
  const ua = window.navigator.userAgent
  return {
    isIE: ua.toLocaleLowerCase().indexOf('msie') >= 1 || ua.toLocaleLowerCase().indexOf('trident') >= 1 || !!window.ActiveXObject || 'ActiveXObject' in window,
    isEdge: ua.toLocaleLowerCase().indexOf('edge') >= 1,
    isFirefox: ua.toLocaleLowerCase().indexOf('firefox') !== -1,
    isChrome: ua.toLocaleLowerCase().indexOf('chrome') !== -1,
    isSafari: ua.toLocaleLowerCase().indexOf('safari') !== -1,
    isAndroid: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1,
    isIOS: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isWx: ua.indexOf('micromessenger') > -1
  }
}
export {
  getParentsOffsetTop,
  eventThrottle,
  getWebType
}
