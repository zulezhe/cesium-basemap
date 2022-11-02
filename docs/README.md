# zu-cesium-basemap

## 描述

cesium 的底图加载插件

## 使用方法

### 安装

```powershell
    npm install zu-cesium-basemap
```

### 使用

- 添加天地图

```js
import { TdtImageryProvider } from "zu-cesium-basemap";
// 加载天地图
let imgLayer = {
  style: "default",
  layer: "img_w", //影像墨卡托投影底图
  type: "img",
  name: "图层",
  key: "you key",
};
viewer.imageryLayers.addImageryProvider(new TdtImageryProvider(imgLayer));
var ciaLayer = {
  layer: "cia_w", //影像注记墨卡托投影
  style: "default",
  type: "cia",
  key: "you key",
};
viewer.imageryLayers.addImageryProvider(new TdtImageryProvider(ciaLayer));
```

- 添加高德底图

```js
import { AmapImageryProvider } from "./dist/zu-cesium-basemap.esm.js";
const viewer = new Cesium.Viewer("cesium-container", {
  imageryProvider: new AmapImageryProvider({
    type: "img",
    minimumLevel: 4,
    maximumLevel: 18,
  }),
});
```

[![](./static//images/amap.jpg#=1000x800)](https://zulezhe.github.io/zu-cesium-basemap/amap.html)

- 添加百度底图

- 添加智图

```js
import { GeoqImageryProvider } from "zu-cesium-basemap";
const viewer = new Cesium.Viewer("cesium-container", {
  imageryProvider: new GeoqImageryProvider({
    type: "img",
    minimumLevel: 4,
    maximumLevel: 18,
  }),
});
```
[![](./static//images/geoq.jpg#=1000x800)](https://zulezhe.github.io/zu-cesium-basemap/geomap.html)
- 添加 mapbox 底图

- 添加 arcgis 底图

- 添加 osm 底图

```js
import { OSMImageryProvider } from "zu-cesium-basemap";

const viewer = new Cesium.Viewer("cesium-container", {
  imageryProvider: new OSMImageryProvider({
    type: "vec",
  }),
});
```

[![](./static//images/osm.jpg#=1000x800)](https://zulezhe.github.io/zu-cesium-basemap/osmmap.html)

- 添加单张图片底图

- 添加自定义底图

## api 文档

[API](./api/index.html)
