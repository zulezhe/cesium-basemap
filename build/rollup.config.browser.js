/*
 * @Author: zulezhe
 * @Date: 2021-07-08 08:36:43
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-09 10:23:14
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
import base, { pkgName, file } from './rollup.config.base'
import { terser } from 'rollup-plugin-terser'

const cname = pkgName.split('-').reduce((acc, cur) => acc + cur.replace(cur[0], cur[0].toUpperCase()), '')

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: cname,
    file: file('min'),
    format: 'iife'
  }
})

config.plugins.push(terser())

export default config
