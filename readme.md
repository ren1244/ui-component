前端元件工具

## 使用方式

### 打包元件

1. 用 `npm install` 安裝需要的 rollup 相關套件
2. 編輯 build.js，選擇要打包出來的元件
3. `npx rollup -c` 打包

### 開發元件

1. 用 `node create.js {[{css-prefix}/]class-name}` 產生目錄，裡面會有預先寫好的一些程式碼。
2. 寫好後，重新打包給瀏覽器使用。

## 範例

元件打包好後，使用的方式可以參考 file-uploader/test.html
