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

            let keyValue:string;
            switch (key) {
                case 'searchKey':

                    keyValue = items[key] || 'g';
                    self.optionSelect(key, keyValue);
                    break;
                case 'translateKey':

                    keyValue = items[key] || 'e';
                    self.optionSelect(key, keyValue);
                    break;
                case 'jumpToLinkKey':

                    keyValue = items[key] || 'b';
                    self.optionSelect(key, keyValue);
                    break;
                case 'translateFrom':

                    keyValue = items[key] || 'en';
                    self.optionSelect(key, keyValue);
                    break;
                case 'translateTo':

                    keyValue = items[key] || 'zh-CN';
                    self.optionSelect(key, keyValue);
                    break;
                case 'searchEngine':

                    keyValue = items[key] || 'google';
                    self.checkboxCheck(keyValue);
                    break;
                case 'translateSite':

                    keyValue = items[key] || 'cn';
                    self.checkboxCheck(keyValue);
                    break;
                default:
                //
            }
        });
    };

    optionSelect(key:string, value:string) {

        let options = document.getElementById(key).options;
        for (let i = 0; i < options.length; i++) {
            if (value == options[i].value) {
                options[i].selected = 'selected';
            }
        }
    }

    checkboxCheck(value:string) {

        document.getElementById(value).checked = true;
    }
}

let options = new Options();
console.info('options');

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', function () {
    let searchKey = document.getElementById('searchKey').value;
    let translateKey = document.getElementById('translateKey').value;
    let jumpToLinkKey = document.getElementById('jumpToLinkKey').value;
    let searchEngine = document.querySelector('input[name=searchEngine]:checked').value;
    let translateSite = document.querySelector('input[name=translate-site]:checked').value;
    let translateFrom = document.getElementById('translateFrom').value;
    let translateTo = document.getElementById('translateTo').value;

    // change SAVE button class
    saveButton.classList.remove('primary');
    saveButton.classList.add('secondary');

    chrome.storage.sync.set({
        searchKey: searchKey,
        translateKey: translateKey,
        jumpToLinkKey: jumpToLinkKey,
        searchEngine: searchEngine,
        translateSite: translateSite,
        translateFrom: translateFrom,
        translateTo: translateTo
    }, function () {

        let messageArea = document.getElementById('messageArea');
        messageArea.classList.remove('hidden');
        messageArea.classList.add('positive');
        messageArea.classList.add('animated');
        messageArea.classList.add('fadeInDown');
        window.setTimeout(function () {
            messageArea.classList.remove('positive');
            messageArea.classList.remove('animated');
            messageArea.classList.remove('fadeInDown');
            messageArea.classList.add('hidden');

            saveButton.classList.remove('secondary');
            saveButton.classList.add('primary');
        }, 2000);
    });
});