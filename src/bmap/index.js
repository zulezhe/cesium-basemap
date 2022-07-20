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
      rectangleNortheastInMeters: new Cesium.Cartesian2(33554054, 33746824),
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
    let url = this._url
      .replace('{x}', x - xTiles / 2)
      .replace('{y}', yTiles / 2 - y - 1)
      .replace('{z}', level)
      .replace('{s}', 1)
      .replace('{style}', this._type);
    return Cesium.ImageryProvider.loadImage(this, url);
  }
}
export default BmapImageryProvider;
