/*
 * @Author: zulezhe
 * @Date: 2022-10-29 15:29:13
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-29 15:47:45
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
const config = require('../package.json');

const { name, version } = config;
const file = (type) => `dist/${name}.${type}.js`;

export { name, file };

export default {
	input: 'src/index.js',
	plugins: [
		resolve({
			mainFields: ['module', 'jsnext:main', 'main', 'browser'],
		}),
		babel({
			exclude: 'node_modules/**',
			runtimeHelpers: true,
			extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
		}),
		cjs(),
		replace({
			VERSION: JSON.stringify(version),
		}),
	],
	watch: {
		include: 'src/**',
	},
};
