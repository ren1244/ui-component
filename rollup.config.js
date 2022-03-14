import path from 'path';
import postcss from 'rollup-plugin-postcss';
import html from 'rollup-plugin-html';
import { terser } from "rollup-plugin-terser";

export default {
    input: path.resolve(__dirname, './build.js'),
    output: {
        file: path.resolve(__dirname, './my-component.bundle.js'),
        format: 'umd',
        name: 'MyComponent'
    },
    plugins: [
        postcss({
            plugins: []
        }),
        html({
            include: '**/*.html'
        }),
        terser()
    ]
};
