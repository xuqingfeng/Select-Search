/// <reference path="../typings/chrome/chrome.d.ts" />

class Background {

    static GOOGLE:string = 'https://www.google.com/search?q=';
    static YAHOO:string = 'https://search.yahoo.com/search?p=';
    static BING:string = 'https://www.bing.com/search?q=';
    static DUCKDUCKGO:string = 'https://www.duckduckgo.com/?q=';
    static SOGOU:string = 'https://www.sogou.com/web?query=';
    static BAIDU:string = 'https://www.baidu.com/s?wd=';
    static YANDEX:string = 'https://yandex.ru/yandsearch?text=';

    static GOOGLE_TRANSLATE_CN_URL:string = 'https://translate.google.cn';
    static GOOGLE_TRANSLATE_COM_URL:string = 'https://translate.google.com';

    constructor(public searchEngine:string = 'google', public translateSite:string = 'cn', public translateFrom:string = 'en', public translateTo:string = 'zh-CN') {

        let self = this;
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
                        self.searchEngine = items['searchEngine'] || 'google';
                        self.search(selectedText, self.searchEngine);
                    });
                    break;
                case 'translate':

                    chrome.storage.sync.get(['translateSite', 'translateFrom', 'translateTo'], function (items) {

                        self.translateSite = items['translateSite'] || 'cn';
                        self.translateFrom = items['translateFrom'] || 'en';
                        self.translateTo = items['translateTo'] || 'zh-CN';
                        let word = encodeURIComponent(selectedText.trim());
                        let googleTranslateUrl:string;
                        switch (self.translateSite) {
                            case 'cn':

                                googleTranslateUrl = Background.GOOGLE_TRANSLATE_CN_URL;
                                break;
                            case 'com':

                                googleTranslateUrl = Background.GOOGLE_TRANSLATE_COM_URL;
                                break;
                            default:

                                googleTranslateUrl = Background.GOOGLE_TRANSLATE_CN_URL;
                        }

                        self.createTab(googleTranslateUrl + '/#' + self.translateFrom + '/' + self.translateTo + '/' + word);
                    });
                    break;
                case 'link':

                    let httpProtocol = selectedText.substr(0, 7),
                        httpsProtocol = selectedText.substr(0, 8);
                    if ('http://' == httpProtocol || 'https://' == httpsProtocol) {
                        self.createTab(selectedText);
                    } else {
                        self.createTab('http://' + selectedText);
                    }
                    break;
                default:
                //
            }
        });
    }

    search = (selectedText:string, searchEngine:string) => {

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
            case 'sogou':

                searchUrl += Background.SOGOU + encodeURIComponent(selectedText);
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

    createTab(url:string) {

        chrome.tabs.create({
            url: url,
            active: true
        }, function (tab) {
        });
    }
}

let bg = new Background();