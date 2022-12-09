/*
 * @Author: zulezhe
 * @Date: 2021-07-08 08:36:43
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-09 14:02:48
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import * as Cesium from "cesium";
/**
 * 高德影像底图类
 * @extends Cesium.UrlTemplateImageryProvider
 */
class AmapImageryProvider extends Cesium.UrlTemplateImageryProvider {
  /**
   * 添加高德地图底图
   * @param {object} options
   * @param {string} options.type=img 底图类型 影像底图 img 矢量底图 vec 默认 img
   * @param {string} options.minimumLevel=4
   * @param {string} options.maximumLevel=8
   * @example
   *
   *  var layer = new AmapImageryProvider({
   *        type: "img",
   *        minimumLevel: 4,
   *        maximumLevel: 18
   *    })
   *  viewer.imageryLayers.addImageryProvider(layer);
   */
  constructor(
    options = {
      type: "img",
      minimumLevel: 4,
      maximumLevel: 18,
    }
  ) {
    super({
      url: `https://${
        options.type === "img" ? "webst0{s}" : "webrd02"
      }.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=${
        options.type === "img" ? 6 : 8
      }&x={x}&y={y}&z={z}`,
      subdomains: ["1", "2", "3", "4"],
      minimumLevel: 3,
      maximumLevel: 18,
    });
  }
}
export default AmapImageryProvider;
