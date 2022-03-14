const path = require('path');
const fs = require('fs');
const { exit } = require('process');
if (process.argv.length !== 3) {
    console.log('syntax: npm create.js {[{css-prefix}/]class-name}');
    console.log('* {class-name} is a lowercase string whose words separated by "-"');
    process.exit();
}
const inputData = ((pathStr) => {
    pathStr = pathStr.toLowerCase();
    //分離出 css-prefix
    let cssPrefix = '';
    let pos = pathStr.lastIndexOf('/');
    if (pos > 0) {
        cssPrefix = pathStr.slice(0, pos);
        cssPrefix = cssPrefix.length > 0 ? cssPrefix + '-' : '';
        pathStr = pathStr.slice(pos + 1);
    }
    classStr = pathStr.split('-').map(s => s.slice(0, 1).toUpperCase() + s.slice(1)).join('');
    return {
        path: pathStr,
        class: classStr,
        fullPath: path.resolve(__dirname, pathStr),
        css: cssPrefix + pathStr
    };
})(process.argv[2]);

//(1)確認元件資料夾是否存在，若無才建立
if (fs.existsSync(inputData.fullPath)) {
    console.log('component already exists');
    process.exit();
}
//(2)建立資料夾與檔案
const htmlContent = `<div class="${inputData.css}">
</div>`;

const cssContent = `.${inputData.css} {
    display: inline-block;
}`;

const jsContent = `import style from './style.css';
import templateHtml from './template.html';

class ${inputData.class} {
    constructor(containerElement) {
        let temp = document.createElement('template');
        temp.innerHTML = templateHtml;
        this.warpEle = temp.content.querySelector('.${inputData.css}');
        containerElement.appendChild(temp.content);
    }
}
export default ${inputData.class};`;

fs.mkdirSync(inputData.fullPath);
fs.writeFileSync(path.resolve(inputData.fullPath, 'template.html'), htmlContent);
fs.writeFileSync(path.resolve(inputData.fullPath, 'style.css'), cssContent);
fs.writeFileSync(path.resolve(inputData.fullPath, 'main.js'), jsContent);
