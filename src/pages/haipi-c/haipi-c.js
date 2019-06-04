import '@/pages/haipi-b/haipi-b.styl'
import screenSize from '@lib/screenSize'
import { getWebType } from '@lib/tools'
screenSize()
function haipiPhoneDown () {
  let webType = getWebType()
  $('.haipi-phone-down-mask').click(() => {
    $('.haipi-phone-down-mask').hide()
  })
  if (webType.isWx) {
    console.log(webType.isIOS, window.navigator.userAgent)
    $('.haipi-phone-down-mask').show()
    $('.haipi-phone-down-button-ios').click(() => {
      $('.haipi-phone-down-mask').show()
    })
    $('.haipi-phone-down-button-android').click(() => {
      $('.haipi-phone-down-mask').show()
    })
    if (webType.isIOS) {
      window.location.href = 'https://itunes.apple.com/cn/app/hai-pi-shi-guang/id1149185654?mt=8'
    }
    return
  }
  if (webType.isIOS) {
    window.location.href = 'https://itunes.apple.com/cn/app/hai-pi-shi-guang/id1149185654?mt=8'
  } else if (webType.isAndroid) {
    window.location.href = 'http://download-hahaipi.oss-cn-hangzhou.aliyuncs.com/mct/1x/haipishangjia_1_6_8_2.apk'
  }
  $('.haipi-phone-down-button-ios').click(() => {
    window.location.href = 'https://itunes.apple.com/cn/app/hai-pi-shi-guang/id1149185654?mt=8'
  })
  $('.haipi-phone-down-button-android').click(() => {
    window.location.href = 'http://download-hahaipi.oss-cn-hangzhou.aliyuncs.com/happy/3x/haipishiguang_3_3_5_2.apk'
  })
}
haipiPhoneDown()
