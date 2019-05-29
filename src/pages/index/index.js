import './index.styl'
import ChangeScroll from '@lib/changeScroll'
console.log(document.querySelectorAll('.index-menu-block')[1], document.querySelectorAll('.index-menu-block')[1].offsetTop)
new ChangeScroll({
  clickClsEle: '.nav-menu',
  controlClsEle: '.index-menu-block',
  callback (obj) {
    console.log(obj)
  }
})
