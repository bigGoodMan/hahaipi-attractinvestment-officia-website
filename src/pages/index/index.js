import './index.styl'
import ChangeScroll from '@lib/changeScroll'
/* eslint-disable no-new */
new ChangeScroll({
  clickClsEle: '.nav-menu',
  controlClsEle: '.index-menu-block',
  callback (obj) {
    console.log(obj)
  }
})
