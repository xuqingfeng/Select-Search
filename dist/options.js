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
        this.chromeGet = (key) => {
            let self = this;
            chrome.storage.sync.get(key, function (items) {
                let keyValue;
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
                }
            });
        };
        for (let key of Options.keyMap) {
            this.chromeGet(key);
        }
    }
    optionSelect(key, value) {
        let options = document.getElementById(key).options;
        for (let i = 0; i < options.length; i++) {
            if (value == options[i].value) {
                options[i].selected = 'selected';
            }
        }
    }
    checkboxCheck(value) {
        document.getElementById(value).checked = true;
    }
}
Options.keyMap = ['searchKey', 'translateKey', 'jumpToLinkKey', 'translateFrom', 'translateTo', 'searchEngine', 'translateSite'];
let options = new Options();
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
