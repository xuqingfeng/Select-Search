/// <reference path="../typings/chrome/chrome.d.ts" />

class Content {

    static keyMap = {
        a: 65,
        b: 66,
        c: 67,
        d: 68,
        e: 69,
        f: 70,
        g: 71,
        h: 72,
        i: 73,
        j: 74,
        k: 75,
        l: 76,
        m: 77,
        n: 78,
        o: 79,
        p: 80,
        q: 81,
        r: 82,
        s: 83,
        t: 84,
        u: 85,
        v: 86,
        w: 87,
        x: 88,
        y: 89,
        z: 90
    };

    constructor(public selectStatus:boolean = false, public selectedText:string = '', public searchKey:string = 'g', public translateKey:string = 'e', public jumpToLinkKey:string = 'b') {

        chrome.storage.sync.get('searchKey', function (items) {
            this.searchKey = items['searchKey'] || 'g';
        });
        chrome.storage.sync.get('translateKey', function (items) {
            this.translateKey = items['translateKey'] || 'e';
        });
        chrome.storage.sync.get('jumpToLinkKey', function (items) {
            this.jumpToLinkKey = items['jumpToLinkKey'] || 'b';
        });
    }

    // fix
    mouseUp = () => {

        let selection = window.getSelection();
        let selectedText = selection.toString();
        if (selectedText.length > 0 && selectedText.trim().length > 0) {
            this.selectedText = selectedText.trim();
            this.selectStatus = true;
        } else {
            this.selectStatus = false;
        }
    }

    // fixed
    keyDown = (e) => {
        if (this.selectStatus) {
            if (e.metaKey) {
                switch (e.keyCode) {
                    case Content.keyMap[this.searchKey]:
                        e.preventDefault();
                        chrome.runtime.sendMessage({
                            selectedText: this.selectedText,
                            type: 'search'
                        });
                        break;
                    case Content.keyMap[this.translateKey]:
                        e.preventDefault();
                        chrome.runtime.sendMessage({
                            selectedText: this.selectedText,
                            type: 'translate'
                        });
                        break;
                    case Content.keyMap[this.jumpToLinkKey]:
                        e.preventDefault();
                        chrome.runtime.sendMessage({
                            selectedText: this.selectedText,
                            type: 'link'
                        });
                        break;
                    default:
                        //
                }
            }
        }
    }
}

let cs = new Content();
document.addEventListener('mouseup', cs.mouseUp);
document.addEventListener('keydown', cs.keyDown);