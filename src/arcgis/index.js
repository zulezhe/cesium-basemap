/*
 * @Author: zulezhe
 * @Date: 2022-07-20 14:11:20
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-07-20 14:14:53
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
/**
 * arcgis底图类
 * @extends Cesium.ArcGisMapServerImageryProvider
 */
 class ArcgisImageryProvider extends Cesium.ArcGisMapServerImageryProvider {
  /**
   * 添加arcgis地图底图
   * @param {object} options 
   * @param {string} options.type=img 底图类型 影像底图 img 矢量底图 vec 默认 img
   * @param {string} options.minimumLevel=4
   * @param {string} options.maximumLevel=8
   * @example
   * 
   *  var layer = new ArcgisImageryProvider({
   *        type: "img",
   *        minimumLevel: 4,
   *        maximumLevel: 18
   *    })
   *  viewer.imageryLayers.addImageryProvider(layer);
   */
   constructor() {
     let IMG_URL = `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer`;
     let STREET_URL=`https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer`
    super({
      url: options.type==="img"?IMG_URL:STREET_URL
    });   
  }
}
export default ArcgisImageryProvider;
