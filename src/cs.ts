/// <reference path="../typings/chrome/chrome.d.ts" />

class Content {

    static GOOGLE:string = 'https://www.google.com/search?q=';
    static YAHOO:string = 'https://search.yahoo.com/search?p=';
    static BING:string = 'https://www.bing.com/search?q=';
    static DUCKDUCKGO:string = 'https://www.duckduckgo.com/?q=';
    static BAIDU:string = 'https://www.baidu.com/s?wd=';
    static YANDEX:string = 'https://yandex.ru/yandsearch?text=';

    static GOOGLE_TRANSLATE_CN_URL:string = 'https://translate.google.cn';
    static GOOGLE_TRANSLATE_COM_URL:string = 'https://translate.google.com';

    constructor(public searchEngine:string = 'google', public translateSite:string = 'cn', public translateFrom:string = 'en', public translateTo:string = 'zh-CN') {

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
                    let googleTranslateUrl:string;
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

                    let httpProtocol = selectedText.substr(0, 7),
                        httpsProtocol = selectedText.substr(0, 8);
                    if ('http://' == httpProtocol || 'https://' == httpsProtocol) {
                        this.createTab(selectedText);
                    } else {
                        this.createTab('http://' + selectedText);
                    }
                    break;
                default:
                // do nothing
            }
        });
    }

    search(selectedText:string, searchEngine:string) {

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

    createTab(url:string) {
        chrome.tabs.create({
            url: url,
            active: true
        }, function (tab) {
        });
    }
}

let cs = new Content();