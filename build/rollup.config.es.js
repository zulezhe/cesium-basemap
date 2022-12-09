/*
 * @Author: zulezhe
 * @Date: 2021-07-08 08:36:43
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-09 10:23:20
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import base, { pkgName, file } from "./rollup.config.base";

const config = Object.assign({}, base, {
  output: {
    name: pkgName,
    file: file("esm"),
    format: "es",
  },
});

export default config;
