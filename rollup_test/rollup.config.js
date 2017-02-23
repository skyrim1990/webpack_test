import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
	entry: 'app/dev/js/main.js',
	format: 'cjs',
	plugins: [json(), babel()],
	dest: './app.js'
}
