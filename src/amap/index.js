class AmapImageryProvider extends Cesium.UrlTemplateImageryProvider {
	constructor(options = {}) {
		super({
			url: `https://webst0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=${options.type === 'img' ? 6 : 8}&x={x}&y={y}&z={z}`,
			subdomains: ['1', '2', '3', '4'],
		});
	}
}
export default AmapImageryProvider;
