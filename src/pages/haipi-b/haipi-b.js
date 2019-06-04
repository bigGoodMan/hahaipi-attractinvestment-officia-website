import './haipi-b.styl'
import { getWebType } from '@lib/tools'
import screenSize from '@lib/screenSize'
screenSize()
function haipiPhoneDown () {
  let webType = getWebType()
  $('.haipi-phone-down-mask').click(() => {
    $('.haipi-phone-down-mask').hide()
  })
  if (webType.isWx) {
    if (webType.isIOS) {
      window.location.href = 'https://itunes.apple.com/cn/app/hai-pi-shang-jia/id1377936046?mt=8'
    }
    $('.haipi-phone-down-mask').show()
    $('.haipi-phone-down-button-ios').click(() => {
      $('.haipi-phone-down-mask').show()
    })
    $('.haipi-phone-down-button-android').click(() => {
      $('.haipi-phone-down-mask').show()
    })
    return
  }
  if (webType.isIOS) {
    window.location.href = 'https://itunes.apple.com/cn/app/hai-pi-shang-jia/id1377936046?mt=8'
  } else if (webType.isAndroid) {
    window.location.href = 'http://download-hahaipi.oss-cn-hangzhou.aliyuncs.com/mct/1x/haipishangjia_1_6_8_2.apk'
  }
  $('.haipi-phone-down-button-ios').click(() => {
    window.location.href = 'https://itunes.apple.com/cn/app/hai-pi-shang-jia/id1377936046?mt=8'
  })
  $('.haipi-phone-down-button-android').click(() => {
    window.location.href = 'http://download-hahaipi.oss-cn-hangzhou.aliyuncs.com/mct/1x/haipishangjia_1_6_8_2.apk'
  })
}
haipiPhoneDown()
