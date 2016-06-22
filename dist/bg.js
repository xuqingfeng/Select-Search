/// <reference path="../typings/chrome/chrome.d.ts" />
class Background {
    constructor(searchEngine = 'google', translateSite = 'cn', translateFrom = 'en', translateTo = 'zh-CN') {
        this.searchEngine = searchEngine;
        this.translateSite = translateSite;
        this.translateFrom = translateFrom;
        this.translateTo = translateTo;
        this.search = (selectedText, searchEngine) => {
            let searchUrl = '';
            switch (searchEngine) {
                case 'google':
                    searchUrl += Background.GOOGLE + encodeURIComponent(selectedText);
                    break;
                case 'yahoo':
                    searchUrl += Background.YAHOO + encodeURIComponent(selectedText);
                    break;
                case 'bing':
                    searchUrl += Background.BING + encodeURIComponent(selectedText);
                    break;
                case 'duckduckgo':
                    searchUrl += Background.DUCKDUCKGO + encodeURIComponent(selectedText);
                    break;
                case 'baidu':
                    searchUrl += Background.BAIDU + encodeURIComponent(selectedText);
                    break;
                case 'yandex':
                    searchUrl += Background.YANDEX + encodeURIComponent(selectedText);
                    break;
                default:
            }
            this.createTab(searchUrl);
        };
        console.info('constructor');
        let self = this;
        chrome.storage.sync.get('translateSite', function (items) {
            this.translateSite = items['translateSite'] || 'cn';
        });
        chrome.storage.sync.get('translateFrom', function (items) {
            this.translateFrom = items['translateFrom'] || 'en';
        });
        chrome.storage.sync.get('translateTo', function (items) {
            this.translateTo = items['translateTo'] || 'zh-CN';
        });
        chrome.runtime.onMessage.addListener(function (request) {
            console.info('listen');
            // highlight icon todo: verify
            chrome.browserAction.setIcon({
                path: '../icons/icon48.png'
            }, function () {
            });
            let selectedText = request.selectedText;
            switch (request.type) {
                case 'search':
                    chrome.storage.sync.get('searchEngine', function (items) {
                        self.searchEngine = items['searchEngine'] || 'google';
                        self.search(selectedText, self.searchEngine);
                    });
                    break;
                case 'translate':
                    let word = encodeURIComponent(selectedText.trim());
                    let googleTranslateUrl;
                    switch (this.translateSite) {
                        case 'cn':
                            googleTranslateUrl = Background.GOOGLE_TRANSLATE_CN_URL;
                            break;
                        case 'com':
                            googleTranslateUrl = Background.GOOGLE_TRANSLATE_COM_URL;
                            break;
                        default:
                            googleTranslateUrl = Background.GOOGLE_TRANSLATE_CN_URL;
                    }
                    this.createTab(googleTranslateUrl + '/#' + this.translateFrom + '/' + this.translateTo + '/' + word);
                    break;
                case 'link':
                    let httpProtocol = selectedText.substr(0, 7), httpsProtocol = selectedText.substr(0, 8);
                    if ('http://' == httpProtocol || 'https://' == httpsProtocol) {
                        this.createTab(selectedText);
                    }
                    else {
                        this.createTab('http://' + selectedText);
                    }
                    break;
                default:
            }
        });
    }
    createTab(url) {
        chrome.tabs.create({
            url: url,
            active: true
        }, function (tab) {
        });
    }
}
Background.GOOGLE = 'https://www.google.com/search?q=';
Background.YAHOO = 'https://search.yahoo.com/search?p=';
Background.BING = 'https://www.bing.com/search?q=';
Background.DUCKDUCKGO = 'https://www.duckduckgo.com/?q=';
Background.BAIDU = 'https://www.baidu.com/s?wd=';
Background.YANDEX = 'https://yandex.ru/yandsearch?text=';
Background.GOOGLE_TRANSLATE_CN_URL = 'https://translate.google.cn';
Background.GOOGLE_TRANSLATE_COM_URL = 'https://translate.google.com';
let bg = new Background();
console.info('bg');