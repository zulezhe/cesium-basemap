(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['w-cesium-basemap'] = {}));
}(this, (function (exports) { 'use strict';

	class BmapImageryProvider {
	  constructor(options = {}) {
	    const IMG_URL = 'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46';
	    const VEC_URL = 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020';
	    const CUSTOM_URL = 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid={style}';
	    this._url = options.style === 'img' ? IMG_URL : options.style === 'vec' ? VEC_URL : CUSTOM_URL;
	    this._tileWidth = 256;
	    this._tileHeight = 256;
	    this._maximumLevel = 18;
	    this._tilingScheme = new Cesium.WebMercatorTilingScheme({
	      rectangleSouthwestInMeters: new Cesium.Cartesian2(-33554054, -33746824),
	      rectangleNortheastInMeters: new Cesium.Cartesian2(33554054, 33746824)
	    });
	    this._rectangle = this._tilingScheme.rectangle;
	    this._credit = undefined;
	    this._style = options.style || 'normal';
	  }

	  get url() {
	    return this._url;
	  }

	  get token() {
	    return this._token;
	  }

	  get tileWidth() {
	    if (!this.ready) {
	      throw new Cesium.DeveloperError('tileWidth must not be called before the imagery provider is ready.');
	    }

	    return this._tileWidth;
	  }

	  get tileHeight() {
	    if (!this.ready) {
	      throw new Cesium.DeveloperError('tileHeight must not be called before the imagery provider is ready.');
	    }

	    return this._tileHeight;
	  }

	  get maximumLevel() {
	    if (!this.ready) {
	      throw new Cesium.DeveloperError('maximumLevel must not be called before the imagery provider is ready.');
	    }

	    return this._maximumLevel;
	  }

	  get minimumLevel() {
	    if (!this.ready) {
	      throw new Cesium.DeveloperError('minimumLevel must not be called before the imagery provider is ready.');
	    }

	    return 0;
	  }

	  get tilingScheme() {
	    if (!this.ready) {
	      throw new Cesium.DeveloperError('tilingScheme must not be called before the imagery provider is ready.');
	    }

	    return this._tilingScheme;
	  }

	  get rectangle() {
	    if (!this.ready) {
	      throw new Cesium.DeveloperError('rectangle must not be called before the imagery provider is ready.');
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

	  requestImage(x, y, level) {
	    if (!this.ready) {
	      throw new Cesium.DeveloperError('requestImage must not be called before the imagery provider is ready.');
	    }

	    let xTiles = this._tilingScheme.getNumberOfXTilesAtLevel(level);

	    let yTiles = this._tilingScheme.getNumberOfYTilesAtLevel(level);

	    let url = this._url.replace('{x}', x - xTiles / 2).replace('{y}', yTiles / 2 - y - 1).replace('{z}', level).replace('{s}', 1).replace('{style}', this._style);

	    return Cesium.ImageryProvider.loadImage(this, url);
	  }

	}

	class AmapImageryProvider extends Cesium.UrlTemplateImageryProvider {
	  constructor(options = {}) {
	    super({
	      url: `https://webst0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=${options.type === 'img' ? 6 : 8}&x={x}&y={y}&z={z}`,
	      subdomains: ['1', '2', '3', '4']
	    });
	  }

	}

	class TdtImageryProvider extends Cesium.WebMapTileServiceImageryProvider {
	  constructor(options = {}) {
	    console.log(options);
	    super({
	      url: `http://t{s}.tianditu.gov.cn/${options.layer}/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=${options.type}&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${options.key}`,
	      layer: options.layer || 'img_c',
	      tileMatrixSetID: 'c',
	      style: 'default',
	      format: 'tiles',
	      tileMatrixSetID: 'GoogleMapsCompatible',
	      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
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

	exports.AmapImageryProvider = AmapImageryProvider;
	exports.BmapImageryProvider = BmapImageryProvider;
	exports.GoogleImageryProvider = GoogleImageryProvider;
	exports.TdtImageryProvider = TdtImageryProvider;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
