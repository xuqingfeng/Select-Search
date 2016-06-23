/// <reference path="../typings/chrome/chrome.d.ts" />
// todo: fix
class Options {
    constructor(searchKey = 'g', translateKey = 'e', jumpToLinkKey = 'b', searchEngine = 'google', translateSite = 'cn', translateFrom = 'en', translateTo = 'zh-CN') {
        this.searchKey = searchKey;
        this.translateKey = translateKey;
        this.jumpToLinkKey = jumpToLinkKey;
        this.searchEngine = searchEngine;
        this.translateSite = translateSite;
        this.translateFrom = translateFrom;
        this.translateTo = translateTo;
        this.chromeGet = (key) => {
            let self = this;
            chrome.storage.sync.get(key, function (items) {
                let keyValue = items[key];
                console.info('keyValue:', keyValue);
                switch (key) {
                    case 'searchKey':
                    case 'translateKey':
                    case 'jumpToLinkKey':
                    case 'translateFrom':
                    case 'translateTo':
                        self.optionSelect(key);
                        break;
                    case 'searchEngine':
                    case 'translateSite':
                        self.checkboxCheck(keyValue);
                        break;
                    default:
                }
            });
        };
        for (let key of Options.keyMap) {
            this.chromeGet(key);
        }
    }
    optionSelect(key) {
        let options = document.getElementById(key).options;
        for (let i = 0; i < options.length; i++) {
            if (key == options[i].value) {
                options[i].selected = 'selected';
            }
        }
    }
    checkboxCheck(key) {
        document.getElementById(key).setAttribute('checked', 'checked');
    }
}
Options.keyMap = ['searchKey', 'translateKey', 'jumpToLinkLink', 'translateFrom', 'translateTo', 'searchEngine', 'translateSite'];
let options = new Options();
console.info('options');
