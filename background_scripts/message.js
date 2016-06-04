var google = 'https://www.google.com/search?q=',
    yahoo = 'https://search.yahoo.com/search?p=',
    bing = 'https://www.bing.com/search?q=',
    duckduckgo = 'https://www.duckduckgo.com/?q=',
    baidu = 'https://www.baidu.com/s?wd=',
    yandex = 'https://yandex.ru/yandsearch?text=';

var googleTranslateCnUrl = 'https://translate.google.cn',
    googleTranslateComUrl = 'https://translate.google.com';

var googleTranslateUrl = googleTranslateCnUrl;

var searchEngine = 'google',
    translateSite = 'cn',
    translateFrom = 'en',
    translateTo = 'zh-CN';

chrome.runtime.onMessage.addListener(function (request) {

    // get in listen
    chrome.storage.sync.get('searchEngine', function (items) {
        if (items.searchEngine) {
            searchEngine = items.searchEngine;
        }
    });
    chrome.storage.sync.get('translateSite', function (items) {
        if (items.translateSite) {
            translateSite = items.translateSite;
        }
    });
    chrome.storage.sync.get('translateFrom', function (items) {
        if (items.translateFrom) {
            translateFrom = items.translateFrom;
        }
    });
    chrome.storage.sync.get('translateTo', function (items) {
        if (items.translateTo) {
            translateTo = items.translateTo;
        }
    });

    var selectedText = request.selectedText;
    var type = request.type;
    if ('search' == type) {
        chrome.storage.sync.get('searchEngine', function (items) {
            if (items.searchEngine) {
                searchEngine = items.searchEngine;
            }
            search(selectedText, searchEngine);
        });
    } else if ('translate' == type) {
        var words = encodeURIComponent(selectedText.trim());

        switch (translateSite) {
            case 'cn':
                googleTranslateUrl = googleTranslateCnUrl;
                break;
            case 'com':
                googleTranslateUrl = googleTranslateComUrl;
                break;
            default:
                googleTranslateUrl = googleTranslateCnUrl;
        }
        chrome.tabs.create({
            url: googleTranslateUrl + "/#" + translateFrom + "/" + translateTo + "/" + words,
            active: true
        }, function (tab) {
        });
    } else if ('link' == type) {
        var httpProtocol = selectedText.substr(0, 7);
        var httpsProtocol = selectedText.substr(0, 8);
        if ('http://' == httpProtocol || 'https://' == httpsProtocol) {
            chrome.tabs.create({
                url: selectedText,
                active: true
            }, function (tab) {
            });
        } else {
            chrome.tabs.create({
                url: 'http://' + selectedText,
                active: true
            }, function (tab) {
            });
        }
    }

});

function search(selectedText, searchEngine) {

    var searchUrl = '';
    if ('google' == searchEngine) {
        searchUrl += google + encodeURIComponent(selectedText);
    } else if ('yahoo' == searchEngine) {
        searchUrl += yahoo + encodeURIComponent(selectedText);
    } else if ('bing' == searchEngine) {
        searchUrl += bing + encodeURIComponent(selectedText);
    } else if ('duckduckgo' == searchEngine) {
        searchUrl += duckduckgo + encodeURIComponent(selectedText);
    } else if ('baidu' == searchEngine) {
        searchUrl += baidu + encodeURIComponent(selectedText);
    } else if ('yandex' == searchEngine) {
        searchUrl += yandex + encodeURIComponent(selectedText);
    }
    chrome.tabs.create({
        url: searchUrl,
        active: true
    }, function (tab) {
    });
}