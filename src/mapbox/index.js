/*
 * @Author: zulezhe
 * @Date: 2022-07-20 14:11:20
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-09 14:03:19
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import * as Cesium from "cesium";
/**
 * geoq底图类
 * @extends Cesium.UrlTemplateImageryProvider
 */
class MapboxImageryProvider extends Cesium.MapboxStyleImageryProvider {
  /**
   * 添加geoq地图底图
   * @param {object} options
   * @param {string} options.username 你的账号名称
   * @param {string} options.styleId  你的地图Id
   * @param {string} options.accessToken 你的accessToken
   * @example
   *
   *  var layer = new MapboxImageryProvider({
   *        type: "img",
   *        minimumLevel: 4,
   *        maximumLevel: 18
   *    })
   *  viewer.imageryLayers.addImageryProvider(layer);
   */
  constructor(options = {
    username: "你的账号名称",
    styleId: "你的地图Id",
    accessToken: "你的accessToken",
  }) {
    super({
      username: options.username,
      styleId: options.styleId,
      accessToken: options.accessToken,
    });
  }
}
export default MapboxImageryProvider;
