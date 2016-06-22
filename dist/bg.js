/// <reference path="../typings/chrome/chrome.d.ts" />
class Background {
    constructor(selectStatus = false, selectedText = '', searchKey = 'g', translateKey = 'e', jumpToLinkKey = 'b', keyCode = {}) {
        this.selectStatus = selectStatus;
        this.selectedText = selectedText;
        this.searchKey = searchKey;
        this.translateKey = translateKey;
        this.jumpToLinkKey = jumpToLinkKey;
        this.keyCode = keyCode;
        // get searchKey form chrome storage
        chrome.storage.sync.get('searchKey', function (items) {
            this.searchKey = items['searchKey'] || 'g';
        });
        chrome.storage.sync.get('translateKey', function (items) {
            this.translateKey = items['translateKey'] || 'e';
        });
        chrome.storage.sync.get('jumpToLinkKey', function (items) {
            this.jumpToLinkKey = items['jumpToLinkKey'] || 'b';
        });
        this.keyCode = {
            'a': 65,
            'b': 66,
            'c': 67,
            'd': 68,
            'e': 69,
            'f': 70,
            'g': 71,
            'h': 71,
            'i': 73,
            'j': 74,
            'k': 75,
            'l': 76,
            'm': 77,
            'n': 78,
            'o': 79,
            'p': 80,
            'q': 81,
            'r': 82,
            's': 83,
            't': 84,
            'u': 85,
            'v': 86,
            'w': 87,
            'x': 88,
            'y': 89,
            'z': 90
        };
    }
    getSelectedText() {
        let selection = window.getSelection();
        return selection.toString();
    }
    mouseUp() {
        let selectedText = this.getSelectedText();
        if (selectedText.length > 0 && selectedText.trim().length > 0) {
            // highlight icon todo: verify
            chrome.browserAction.setIcon({
                path: '../icons/icon48.png'
            }, function () {
            });
            this.selectedText = selectedText.trim();
            this.selectStatus = true;
        }
        else {
            this.selectStatus = false;
        }
    }
    keyDown(e) {
        if (this.selectStatus) {
            if (e.metaKey) {
                switch (e.keyCode) {
                    case this.keyCode[this.searchKey]:
                        e.preventDefault();
                        chrome.runtime.sendMessage({
                            selectedText: this.selectedText,
                            type: 'search'
                        });
                        break;
                    case this.keyCode[this.translateKey]:
                        e.preventDefault();
                        chrome.runtime.sendMessage({
                            selectedText: this.selectedText,
                            type: 'translate'
                        });
                        break;
                    case this.keyCode[this.jumpToLinkKey]:
                        e.preventDefault();
                        chrome.runtime.sendMessage({
                            selectedText: this.selectedText,
                            type: 'link'
                        });
                        break;
                }
            }
        }
    }
}
let bg = new Background();
document.addEventListener('mouseup', bg.mouseUp);
document.addEventListener('keydown', bg.keyDown);
