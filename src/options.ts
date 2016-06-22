/// <reference path="../typings/chrome/chrome.d.ts" />
// todo: fix
class Options {

    static keyMap = ['searchKey', 'translateKey', 'jumpToLinkLink', 'translateFrom', 'translateTo', 'searchEngine', 'translateSite'];

    constructor(public searchKey = 'g', public translateKey = 'e', public jumpToLinkKey = 'b', public searchEngine = 'google', public translateSite = 'cn', public translateFrom = 'en', public translateTo = 'zh-CN') {

        for (let key of Options.keyMap) {
            this.chromeGet(key);
        }
    }

    chromeGet = (key:string) => {

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

    optionSelect(key:string) {

        let options = document.getElementById(key).options;
        for (let i = 0; i < options.length; i++) {
            if (key == options[i].value) {
                options[i].selected = 'selected';
            }
        }
    }

    checkboxCheck(key:string) {

        document.getElementById(key).setAttribute('checked', 'checked');
    }
}