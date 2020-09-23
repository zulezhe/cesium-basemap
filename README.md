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
import { TdtImageryProvider } from 'w-cesium-basemap';
// 加载天地图
let imgLayer = {
	style: 'default',
	layer: 'img_w', //影像墨卡托投影底图
	type: 'img',
	name: '图层',
	key: 'you key',
};
viewer.imageryLayers.addImageryProvider(new TdtImageryProvider(imgLayer));
var ciaLayer = {
	layer: 'cia_w', //影像注记墨卡托投影
	style: 'default',
	type: 'cia',
	key: 'you key',
};
viewer.imageryLayers.addImageryProvider(new TdtImageryProvider(ciaLayer));
```
