(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['zu-cesium-basemap'] = {}));
}(this, (function (exports) { 'use strict';

  /**
   * 添加百度底图服务类
   */
  class BmapImageryProvider {
    /**
     * 创建百度底图服务
     * @param  {object} options     创建百度底图的配置项
     * @param {string} options.type=img 底图类型 影像底图 img 矢量底图 vec
     * @example
     * 
     *  var layer = new BmapImageryProvider({
     *        type: "img",
     *        minimumLevel: 4,
     *        maximumLevel: 18
     *  })
     *  viewer.imageryLayers.addImageryProvider(layer);
     */
    constructor(options = {}) {
      const IMG_URL = 'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46';
      const VEC_URL = 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020';
      const CUSTOM_URL = 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid={style}';
      this._url = options.type === 'img' ? IMG_URL : options.type === 'vec' ? VEC_URL : CUSTOM_URL;
      this._tileWidth = 256;
      this._tileHeight = 256;
      this._maximumLevel = 18;
      this._tilingScheme = new Cesium.WebMercatorTilingScheme({
        rectangleSouthwestInMeters: new Cesium.Cartesian2(-33554054, -33746824),
        rectangleNortheastInMeters: new Cesium.Cartesian2(33554054, 33746824)
      });
      this._rectangle = this._tilingScheme.rectangle;
      this._credit = undefined;
      this._type = options.type || 'normal';
    }

    get url() {
      return this._url;
    }

    get token() {
      return this._token;
    }

    get tileWidth() {
      if (!this.ready) {
        throw new Cesium.DeveloperError('在影像提供者准备就绪之前，不得调用 tileWidth.');
      }

      return this._tileWidth;
    }

    get tileHeight() {
      if (!this.ready) {
        throw new Cesium.DeveloperError('在影像提供者准备就绪之前，不得调用 tileHeight.');
      }

      return this._tileHeight;
    }

    get maximumLevel() {
      if (!this.ready) {
        throw new Cesium.DeveloperError('最大在影像提供程序准备就绪之前不得调用级别.');
      }

      return this._maximumLevel;
    }

    get minimumLevel() {
      if (!this.ready) {
        throw new Cesium.DeveloperError('最小值在影像提供者准备就绪之前不得调用级别.');
      }

      return 0;
    }

    get tilingScheme() {
      if (!this.ready) {
        throw new Cesium.DeveloperError('在影像提供程序准备就绪之前，不得调用切片方案.');
      }

      return this._tilingScheme;
    }

    get rectangle() {
      if (!this.ready) {
        throw new Cesium.DeveloperError('在影像提供程序准备就绪之前，不得调用矩形.');
      }

      return this._rectangle;
    }

    get ready() {
      return !!this._url;
    }

    get credit() {
      return this._credit;
    }

    get hasAlphaChannel() {
      return true;
    }

    getTileCredits(x, y, level) {}
    /**
     * 图片请求
     * @param  {} x
     * @param  {} y
     * @param  {} level
     * @exception {DeveloperError} 在图像提供者准备好之前不得调用 requestImage
     * @returns {object} 加载底图后的返回对象
     */


    requestImage(x, y, level) {
      if (!this.ready) {
        throw new Cesium.DeveloperError('请求在影像提供程序准备就绪之前不得调用影像.');
      }

      let xTiles = this._tilingScheme.getNumberOfXTilesAtLevel(level);

      let yTiles = this._tilingScheme.getNumberOfYTilesAtLevel(level);

      let url = this._url.replace('{x}', x - xTiles / 2).replace('{y}', yTiles / 2 - y - 1).replace('{z}', level).replace('{s}', 1).replace('{style}', this._type);

      return Cesium.ImageryProvider.loadImage(this, url);
    }

  }

  /*
   * @Author: zulezhe
   * @Date: 2021-07-08 08:36:43
   * @LastEditors: zulezhe
   * @LastEditTime: 2022-07-20 14:10:53
   * @Path: https://gitee.com/zulezhe/
   * @Description: 
   */

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
    constructor(options = {
      type: "img",
      minimumLevel: 4,
      maximumLevel: 18
    }) {
      super({
        url: `https://${options.type === 'img' ? 'webst0{s}' : 'webrd02'}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=${options.type === "img" ? 6 : 8}&x={x}&y={y}&z={z}`,
        subdomains: ["1", "2", "3", "4"],
        minimumLevel: 3,
        maximumLevel: 18
      });
    }

  }

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
    constructor(options = {
      type: "img",
      projMode: "w",
      key: "",
      minimumLevel: 4,
      maximumLevel: 18
    }) {
      let type = options.type + "_" + options.projMode;
      let layer = options.type;
      super({
        url: `http://t{s}.tianditu.gov.cn/${type}/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=${layer}&tileMatrixSet=${options.projMode}&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${options.key}`,
        layer: type,
        style: "default",
        format: "tiles",
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        minimumLevel: 0,
        maximumLevel: 18
      });
    }

  }

  const ELEC_URL = 'http://mt{s}.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile';
  const IMG_URL = 'http://mt{s}.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali';
  const TER_URL = 'http://mt{s}.google.cn/vt/lyrs=t@131,r@227000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galile';

  class GoogleImageryProvider extends Cesium.UrlTemplateImageryProvider {
    constructor(options = {}) {
      options['url'] = options.style === 'img' ? IMG_URL : options.style === 'ter' ? TER_URL : ELEC_URL;

      if (!options.subdomains || !options.subdomains.length) {
        options['subdomains'] = ['1', '2', '3'];
      }

      super(options);
    }

  }

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
      let STREET_URL = `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer`;
      super({
        url: options.type === "img" ? IMG_URL : STREET_URL
      });
    }

  }

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
        url: "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
      });
    }

  }

  /*
   * @Author: zulezhe
   * @Date: 2022-07-20 14:11:20
   * @LastEditors: zulezhe
   * @LastEditTime: 2022-07-20 15:31:30
   * @Path: https://gitee.com/zulezhe/
   * @Description: 
   */

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
      let VEC_URL = `https://a.tile.openstreetmap.org/`;
      let DARK_URL = `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png`;
      let LIGHT_URL = `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png`;
      super({
        url: options.type === 'vec_dark' ? DARK_URL : options.type === 'vec_light' ? LIGHT_URL : VEC_URL,
        subdomains: ["a", "b", "c", "d"]
      });
    }

  }

  /*
   * @Author: zulezhe
   * @Date: 2022-07-20 14:11:20
   * @LastEditors: zulezhe
   * @LastEditTime: 2022-07-20 15:22:12
   * @Path: https://gitee.com/zulezhe/
   * @Description:
   */

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
      accessToken: "你的accessToken"
    }) {
      super({
        username: options.username,
        styleId: options.styleId,
        accessToken: options.accessToken
      });
    }

  }

  exports.AmapImageryProvider = AmapImageryProvider;
  exports.ArcgisImageryProvider = ArcgisImageryProvider;
  exports.BmapImageryProvider = BmapImageryProvider;
  exports.GeoqImageryProvider = GeoqImageryProvider;
  exports.GoogleImageryProvider = GoogleImageryProvider;
  exports.MapboxImageryProvider = MapboxImageryProvider;
  exports.OSMImageryProvider = OSMImageryProvider;
  exports.TdtImageryProvider = TdtImageryProvider;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
