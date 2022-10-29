/*
 * @Author: zulezhe
 * @Date: 2022-10-29 15:29:13
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-29 15:58:25
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
'use strict';
module.exports = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure'],
  },
  // 指定输入文件
  source: {
    include: ['src/', './README.md'], //包含
    exclude: ['myProject/lib/ignore.js'], //忽略
    includePattern: '.+\\.js(doc)?$', //包含目录下以.js或者.jsdoc结尾的文件将被扫描
    excludePattern: '(^|\\/|\\\\)_', //下划线开头的文件（或以下划线开头的目录下的所有文件）将被忽略
  },
  plugins: ['plugins/markdown'],
  markdown: {
    parser: 'gfm',
    hardwrap: true,
    idInHeadings: true,
  },
  templates: {
    cleverLinks: false,
    monospaceLinks: false,
    default: {
      outputSourceFiles: true,
      includeDate: false,
      useLongnameInNav: true,
      staticFiles: {
        include: ['./docs/static'],
      },
    },
  },
  // 合并命令行选项到配置文件
  opts: {
    template: 'node_modules/docdash',
    encoding: 'utf8',
    destination: './docs/api/',
    recurse: true,
    verbose: true,
  },
  docdash: {
    static: true,
    sort: true,
    disqus: '',
    sectionOrder: [
      // Order the main section in the navbar (default order shown here)
      'Classes',
      'Modules',
      'Externals',
      'Events',
      'Namespaces',
      'Mixins',
      'Tutorials',
      'Interfaces',
    ],
    openGraph: {
      title: 'zu-cesium-basemap',
      type: 'website',
      image: 'https://cloud.githubusercontent.com/assets/447956/13398144/4dde7f36-defd-11e5-8909-1a9013302cb9.png',
      site_name: 'zu-cesium-basemap',
      url: 'http://zulezhe.github.io/zu-cesium-basemap/',
    },
    meta: {
      title: 'zu-cesium-basemap',
      description: 'cesium公开底图服类,更方便添加/切换底图',
      keyword: 'cesium, zu-cesium-basemap,cesium底图',
    },
    search: true,
    collapse: true,
    typedefs: true,
    removeQuotes: 'none',
    scripts: ['./index.js'], //把自定义的静态资源注入到html中
    menu: {
      源码: {
        href: 'https://github.com/zulezhe/zu-cesium-basemap',
        target: '_blank',
        class: 'menu-item',
        id: 'repository',
      },
    },
  },
};
