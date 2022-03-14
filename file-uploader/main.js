import style from './style.css';
import templateHtml from './template.html';

class FileUploader {
    constructor(containerElement) {
        let temp = document.createElement('template');
        temp.innerHTML = templateHtml;
        this.warpEle = temp.content.querySelector('.ren1244-ui-file-uploader');
        containerElement.appendChild(temp.content);

        this.warpEle.addEventListener('dragover', this._stopHandler.bind(this), true);
        this.warpEle.addEventListener('dragleave', this._stopHandler.bind(this), true);
        this.warpEle.addEventListener('drop', this._dropHandler.bind(this), true);
        this.warpEle.addEventListener('click', this._clickHandler.bind(this));

        this.uploderElement = document.createElement('input');
        this.uploderElement.setAttribute('type', 'file');
        this.uploderElement.multiple = true;
        this.uploderElement.addEventListener('change', (evt)=>{
            this._sendFileUploadEvent(evt.target.files);
        });
    }

    _stopHandler(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }

    _dropHandler(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        console.log(evt.files);
        this._sendFileUploadEvent(evt.dataTransfer.files);
    }

    _clickHandler(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.uploderElement.click();
    }

    _sendFileUploadEvent(files) {
        let cusEvt = new CustomEvent('upload-files',{
            bubbles: true,
            detail:{
                files: files,
                component: this
            }
        });
        this.warpEle.dispatchEvent(cusEvt);
    }
}
export default FileUploader;