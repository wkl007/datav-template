/*
 * @Author: Calamus
 * @Description:
 * @FilePath: /my/postcss.config.js
 * @Date: 2019-12-08 09:52:10
 * @LastEditors: Calamus
 * @LastEditTime: 2019-12-19 16:40:52
 */
const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
  plugins: [
    autoprefixer(),
    pxtoviewport({
      unitToConvert: 'px',
      viewportWidth: 1920,
      unitPrecision: 5,
      propList: ['*', '!border', '!background'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['ant-', 'meow-'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568
    })
  ]
}
