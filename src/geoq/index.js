/*
 * @Author: zulezhe
 * @Date: 2022-07-20 14:11:20
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-07-20 15:03:31
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
/**
 * geoq底图类
 * @extends Cesium.UrlTemplateImageryProvider
 */
 class GeoqImageryProvider extends Cesium.UrlTemplateImageryProvider {
  /**
   * 添加geoq地图底图
   * @param {object} options 
   * @param {string} options.type=img 底图类型 影像底图 img 矢量底图 vec 默认 img
   * @param {string} options.minimumLevel=4
   * @param {string} options.maximumLevel=8
   * @example
   * 
   *  var layer = new GeoqImageryProvider({
   *        type: "img",
   *        minimumLevel: 4,
   *        maximumLevel: 18
   *    })
   *  viewer.imageryLayers.addImageryProvider(layer);
   */
   constructor() {
    super({
      url: "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
    });   
  }
}
export default GeoqImageryProvider;
