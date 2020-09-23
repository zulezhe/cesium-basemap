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
			maximumLevel: 18,
		});
	}
}
export default TdtImageryProvider;
