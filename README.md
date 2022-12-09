# @zcesium/cesium-basemap

## 描述

cesium 的底图加载插件

## 使用方法

### 安装

+ esModule使用

```bash
    npm install @zcesium/cesium-basemap
    or
    yarn add @zcesium/cesium-basemap
```
+ 浏览器使用

```html
<script src="https://unpkg.com/@zcesium/cesium-basemap@1.0.0/dist/cesium-basemap.min.js"></script>

```


### 使用

- 添加天地图

```js
import { TdtImageryProvider } from "@zcesium/cesium-basemap";
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
import { AmapImageryProvider } from "@zcesium/cesium-basemap";
const viewer = new Cesium.Viewer("cesium-container", {
  imageryProvider: new AmapImageryProvider({
    type: "img",
    minimumLevel: 4,
    maximumLevel: 18,
  }),
});
```

[![](./static/amap.jpg#=1000x800)](https://zulezhe.github.io/cesium-basemap/examples/amap.html)

- 添加百度底图

- 添加智图

```js
import { GeoqImageryProvider } from "@zcesium/cesium-basemap";
const viewer = new Cesium.Viewer("cesium-container", {
  imageryProvider: new GeoqImageryProvider({
    type: "img",
    minimumLevel: 4,
    maximumLevel: 18,
  }),
});
```
[![](./static/geoq.jpg#=1000x800)](https://zulezhe.github.io/cesium-basemap/examples/geomap.html)
- 添加 mapbox 底图

- 添加 arcgis 底图

- 添加 osm 底图

```js
import { OSMImageryProvider } from "@zcesium/cesium-basemap";

const viewer = new Cesium.Viewer("cesium-container", {
  imageryProvider: new OSMImageryProvider({
    type: "vec",
  }),
});
```

[![](./static/osm.jpg#=1000x800)](https://zulezhe.github.io/cesium-basemap/examples/osmmap.html)

- 添加单张图片底图

- 添加自定义底图

## API文档

[文档](https://zulezhe.github.io/cesium-basemap/docs/index.html)