# zu-cesium-basemap

## 描述

cesium 的底图加载插件

## 使用方法

### 安装

```powershell
    npm install zu-cesium-basemap
```

### 注册

```javascript
import 'zu-cesium-basemap';
```

### 使用

- 添加天地图

```js
import { TdtImageryProvider } from 'zu-cesium-basemap';
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

- 添加高德底图

- 添加百度底图 

- 添加智图

- 添加 mapbox 底图

- 添加 arcgis 底图

- 添加 osm 底图

- 添加单张图片底图

- 添加自定义底图