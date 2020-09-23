# w-cesium-basemap

## 描述

cesium 的底图加载插件

## 使用方法

-   安装

```powershell
    npm install w-cesium-basemap
```

-   注册

```javascript
import 'w-cesium-basemap';
```

-   使用

```js
let imgLayer = {
	style: 'default',
	layer: 'img_w',
	type: 'img',
	name: '图层',
	key: 'you key',
};
viewer.imageryLayers.addImageryProvider(new TdtImageryProvider(imgLayer));
var ciaLayer = {
	layer: 'cia_w',
	style: 'default',
	type: 'cia',
	key: 'you key',
};
viewer.imageryLayers.addImageryProvider(new TdtImageryProvider(ciaLayer));
```
