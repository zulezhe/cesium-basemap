/*
 * @Author: zulezhe
 * @Date: 2022-07-20 14:11:20
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-09 14:03:23
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
import * as Cesium from "cesium";
/**
 * OSM底图类
 * @extends Cesium.OpenStreetMapImageryProvider
 */
 class OSMImageryProvider extends Cesium.OpenStreetMapImageryProvider {
  /**
   * 添加 OSM 地图底图
   * @param {object} options 
   * @param {string} options.type=vec 底图类型  矢量底图 vec 暗色矢量 vec_dark 
   * @param {string} options.minimumLevel=4
   * @param {string} options.maximumLevel=8
   * @example
   * 
   *  var layer = new OSMImageryProvider({
   *        type: "img",
   *        minimumLevel: 4,
   *        maximumLevel: 18
   *    })
   *  viewer.imageryLayers.addImageryProvider(layer);
   */
   constructor(options) {
     let VEC_URL = `https://a.tile.openstreetmap.org/`
     let DARK_URL = `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png`
     let LIGHT_URL=`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png`
    super({
      url: options.type === 'vec_dark' ? DARK_URL :options.type === 'vec_light'?LIGHT_URL: VEC_URL,
      subdomains: ["a", "b", "c", "d"],
    });   
  }
}
export default OSMImageryProvider;
