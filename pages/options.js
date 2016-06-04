// default value
var searchKey = 'g',
    translateKey = 'e',
    jumpToLinkKey = 'b',
    searchEngine = 'google',
    translateSite = 'cn',
    translateFrom = 'en',
    translateTo = 'zh-CN';

var saveButton = document.getElementById('save');
saveButton.addEventListener('click', function () {
    searchKey = document.getElementById('searchKey').value;
    translateKey = document.getElementById('translateKey').value;
    jumpToLinkKey = document.getElementById('jumpToLinkKey').value;
    searchEngine = document.querySelector('input[name=searchEngine]:checked').value;
    translateSite = document.querySelector('input[name=translate-site]:checked').value;
    translateFrom = document.getElementById('translateFrom').value;
    translateTo = document.getElementById('translateTo').value;

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

        var messageArea = document.getElementById('messageArea');
        messageArea.classList.remove('hidden');
        messageArea.classList.add('positive');
        messageArea.classList.add('animated');
        messageArea.classList.add('fadeInDown');
        console.info('save success');
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

chrome.storage.sync.get('searchKey', function (items) {
    if (items.searchKey) {
        searchKey = items.searchKey;
    }
    var options = document.getElementById('searchKey').options;
    for (var i = 0; i < options.length; i++) {
        if (searchKey == options[i].value) {
            options[i].selected = 'selected';
        }
    }
});
chrome.storage.sync.get('translateKey', function (items) {
    if (items.translateKey) {
        translateKey = items.translateKey;
    }
    var options = document.getElementById('translateKey').options;
    for (var i = 0; i < options.length; i++) {
        if (translateKey == options[i].value) {
            options[i].selected = 'selected';
        }
    }
});
chrome.storage.sync.get('jumpToLinkKey', function (items) {
    if (items.jumpToLinkKey) {
        jumpToLinkKey = items.jumpToLinkKey;
    }
    var options = document.getElementById('jumpToLinkKey').options;
    for (var i = 0; i < options.length; i++) {
        if (jumpToLinkKey == options[i].value) {
            options[i].selected = 'selected';
        }
    }
});
chrome.storage.sync.get('searchEngine', function (items) {
    if (items.searchEngine) {
        searchEngine = items.searchEngine;
    }
    document.getElementById(searchEngine).setAttribute('checked', true);
});
chrome.storage.sync.get('translateSite', function(items){
    if(items.translateSite){
        translateSite = items.translateSite;
    }
    document.getElementById(translateSite).setAttribute('checked', true);
});
chrome.storage.sync.get('translateFrom', function (items) {
    if (items.translateFrom) {
        translateFrom = items.translateFrom;
    }
    var options = document.getElementById('translateFrom').options;
    for (var i = 0; i < options.length; i++) {
        if (translateFrom == options[i].value) {
            options[i].selected = 'selected';
        }
    }
});
chrome.storage.sync.get('translateTo', function (items) {
    if (items.translateTo) {
        translateTo = items.translateTo;
    }
    var options = document.getElementById('translateTo').options;
    for (var i = 0; i < options.length; i++) {
        if (translateTo == options[i].value) {
            options[i].selected = 'selected';
        }
    }
});
