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
                    //
            }
        });
    };

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

let options = new Options();
console.info('options');