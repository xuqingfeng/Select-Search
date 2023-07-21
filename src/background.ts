class Background {

    static GOOGLE: string = 'https://www.google.com/search?q=';
    static BING: string = 'https://www.bing.com/search?q=';
    static DUCKDUCKGO: string = 'https://www.duckduckgo.com/?q=';
    static SOGOU: string = 'https://www.sogou.com/web?query=';
    static BAIDU: string = 'https://www.baidu.com/s?wd=';
    static YAHOO: string = 'https://search.yahoo.com/search?p=';
    static YANDEX: string = 'https://yandex.ru/yandsearch?text=';

    static GOOGLE_TRANSLATE_URL: string = 'https://translate.google.com';
    static BAIDU_TRANSLATE_URL: string = 'https://fanyi.baidu.com';

    constructor(public searchEngine: string = 'google', public translateSite: string = 'googleTrans', public translateFrom: string = 'en', public translateTo: string = 'zh-CN') {

        let self = this;
        chrome.storage.sync.get('translateFrom', function (items) {
            self.translateFrom = items['translateFrom'] || 'en';
        });
        chrome.storage.sync.get('translateTo', function (items) {
            self.translateTo = items['translateTo'] || 'zh-CN';
        });

        chrome.runtime.onMessage.addListener(function (request) {

            let selectedText = request.selectedText;
            switch (request.type) {
                case 'translate':

                    chrome.storage.sync.get(['translateSite', 'translateFrom', 'translateTo'], function (items) {

                        self.translateSite = items['translateSite'] || 'googleTrans';
                        self.translateFrom = items['translateFrom'] || 'en';
                        self.translateTo = items['translateTo'] || 'zh-CN';
                        let word = encodeURIComponent(selectedText.trim());

                        let translateUrl = '';
                        switch (self.translateSite) {
                            case 'baiduTrans':
                                if (self.translateFrom === 'zh-CN') self.translateFrom = 'zh';
                                if (self.translateTo === 'zh-CN') self.translateTo = 'zh';
                                translateUrl = Background.BAIDU_TRANSLATE_URL + '#' + self.translateFrom + '/' + self.translateTo + '/' + word;
                            default:
                                translateUrl = Background.GOOGLE_TRANSLATE_URL + '?sl=auto&tl=' + self.translateTo + '&text=' + word + '&op=translate';
                        }
                        self.createTab(translateUrl);
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

                    chrome.storage.sync.get('searchEngine', function (items) {
                        self.searchEngine = items['searchEngine'] || 'google';
                        self.search(selectedText, self.searchEngine);
                    });
                    break;
            }
        });
    }

    search = (selectedText: string, searchEngine: string) => {

        let searchUrl = '';
        switch (searchEngine) {
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
            case 'yahoo':

                searchUrl += Background.YAHOO + encodeURIComponent(selectedText);
                break;
            case 'yandex':

                searchUrl += Background.YANDEX + encodeURIComponent(selectedText);
                break;
            default:
                searchUrl += Background.GOOGLE + encodeURIComponent(selectedText);
                break;
        }

        this.createTab(searchUrl);
    };

    createTab(url: string) {

        chrome.tabs.create({
            url: url,
            active: true
        }, function (tab) {
        });
    }
}

let bg = new Background();
