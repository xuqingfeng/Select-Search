/// <reference path="../typings/chrome/chrome.d.ts" />
class Content {
    constructor(searchEngine = 'google', translateSite = 'cn', translateFrom = 'en', translateTo = 'zh-CN') {
        this.searchEngine = searchEngine;
        this.translateSite = translateSite;
        this.translateFrom = translateFrom;
        this.translateTo = translateTo;
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
            let selectedText = request.selectedText;
            switch (request.type) {
                case 'search':
                    chrome.storage.sync.get('searchEngine', function (items) {
                        this.searchEngine = items['searchEngine'] || 'google';
                        this.search(selectedText, this.searchEngine);
                    });
                    break;
                case 'translate':
                    let word = encodeURIComponent(selectedText.trim());
                    let googleTranslateUrl;
                    switch (this.translateSite) {
                        case 'cn':
                            googleTranslateUrl = Content.GOOGLE_TRANSLATE_CN_URL;
                            break;
                        case 'com':
                            googleTranslateUrl = Content.GOOGLE_TRANSLATE_COM_URL;
                            break;
                        default:
                            googleTranslateUrl = Content.GOOGLE_TRANSLATE_CN_URL;
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
    search(selectedText, searchEngine) {
        let searchUrl = '';
        switch (searchEngine) {
            case 'google':
                searchUrl += Content.GOOGLE + encodeURIComponent(selectedText);
                break;
            case 'yahoo':
                searchUrl += Content.YAHOO + encodeURIComponent(selectedText);
                break;
            case 'bing':
                searchUrl += Content.BING + encodeURIComponent(selectedText);
                break;
            case 'duckduckgo':
                searchUrl += Content.DUCKDUCKGO + encodeURIComponent(selectedText);
                break;
            case 'baidu':
                searchUrl += Content.BAIDU + encodeURIComponent(selectedText);
                break;
            case 'yandex':
                searchUrl += Content.YANDEX + encodeURIComponent(selectedText);
                break;
            default:
        }
        this.createTab(searchUrl);
    }
    createTab(url) {
        chrome.tabs.create({
            url: url,
            active: true
        }, function (tab) {
        });
    }
}
Content.GOOGLE = 'https://www.google.com/search?q=';
Content.YAHOO = 'https://search.yahoo.com/search?p=';
Content.BING = 'https://www.bing.com/search?q=';
Content.DUCKDUCKGO = 'https://www.duckduckgo.com/?q=';
Content.BAIDU = 'https://www.baidu.com/s?wd=';
Content.YANDEX = 'https://yandex.ru/yandsearch?text=';
Content.GOOGLE_TRANSLATE_CN_URL = 'https://translate.google.cn';
Content.GOOGLE_TRANSLATE_COM_URL = 'https://translate.google.com';
let cs = new Content();
