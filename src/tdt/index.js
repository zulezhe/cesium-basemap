/*
 * @Author: zulezhe
 * @Date: 2021-07-08 08:36:43
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-09 14:03:29
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
import * as Cesium from "cesium";
/**
 * 天地图底图类
 * @extends Cesium.WebMapTileServiceImageryProvider
 */
class TdtImageryProvider extends Cesium.WebMapTileServiceImageryProvider {
  /**
   * 添加天地图底图
   * @param {object} options
   * @param {string} options.type=img 底图类型 影像底图 img 矢量底图 vec 经纬度投影 c 墨卡托投影 w 默认 img 参考 http://lbs.tianditu.gov.cn/server/MapService.html
   * @param {string} options.projMode=w 投影方式 经纬度投影 c 墨卡托投影 w 默认 w 参考 http://lbs.tianditu.gov.cn/server/MapService.html
   * @param {string} options.key  天地图key 去官网申请
   * @param {string} options.minimumLevel=4
   * @param {string} options.maximumLevel=18
   * @example
   *
   *  var layer = new TdtImageryProvider({
   *        type: "img",
   *        projMode: "w",
   *        key: "你的key",
   *        minimumLevel: 4,
   *        maximumLevel: 18
   *    })
   *  viewer.imageryLayers.addImageryProvider(layer);
   */
  constructor(
    options = {
      type: "img",
      projMode: "w",
      key: "",
      minimumLevel: 4,
      maximumLevel: 18,
    }
  ) {
    let type = options.type + "_" + options.projMode;
    let layer = options.type;
    super({
      url: `http://t{s}.tianditu.gov.cn/${type}/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=${layer}&tileMatrixSet=${options.projMode}&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${options.key}`,
      layer: type,
      style: "default",
      format: "tiles",
      subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
      minimumLevel: 0,
      maximumLevel: 18,
    });
  }
}
export default TdtImageryProvider;
