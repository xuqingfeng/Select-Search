/// <reference path="../typings/chrome/chrome.d.ts" />
class Options {
    constructor(searchKey = 'g', translateKey = 'e', jumpToLinkKey = 'b', searchEngine = 'google', translateSite = 'cn', translateFrom = 'en', translateTo = 'zh-CN') {
        this.searchKey = searchKey;
        this.translateKey = translateKey;
        this.jumpToLinkKey = jumpToLinkKey;
        this.searchEngine = searchEngine;
        this.translateSite = translateSite;
        this.translateFrom = translateFrom;
        this.translateTo = translateTo;
        for (let key of Options.keyMap) {
            this.chromeGet(key);
        }
    }
    chromeGet(key) {
        chrome.storage.sync.get(key, function (items) {
            this.key = items[key];
            switch (key) {
                case 'searchKey':
                case 'translateKey':
                case 'jumpToLinkKey':
                case 'translateFrom':
                case 'translateTo':
                    this.optionSelect(key);
                    break;
                case 'searchEngine':
                case 'translateSite':
                    this.checkboxCheck(key);
                    break;
            }
        });
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
