if (!window.SelectSearch) {
    SelectSearch = {};
}
SelectSearch.selectStatus = false;
SelectSearch.selectedText = '';
SelectSearch.searchKey = 'g';
SelectSearch.translateKey = 'e';
SelectSearch.jumpToLinkKey = 'b';
SelectSearch.keyCode = {
    'a': 65,
    'b': 66,
    'c': 67,
    'd': 68,
    'e': 69,
    'f': 70,
    'g': 71,
    'h': 71,
    'i': 73,
    'j': 74,
    'k': 75,
    'l': 76,
    'm': 77,
    'n': 78,
    'o': 79,
    'p': 80,
    'q': 81,
    'r': 82,
    's': 83,
    't': 84,
    'u': 85,
    'v': 86,
    'w': 87,
    'x': 88,
    'y': 89,
    'z': 90
};

chrome.storage.sync.get('searchKey', function (items) {
    if (items.searchKey) {
        SelectSearch.searchKey = items.searchKey;
    }
});
chrome.storage.sync.get('translateKey', function (items) {
    if (items.translateKey) {
        SelectSearch.translateKey = items.translateKey;
    }
});
chrome.storage.sync.get('jumpToLinkKey', function (items) {
    if (items.jumpToLinkKey) {
        SelectSearch.jumpToLinkKey = items.jumpToLinkKey;
    }
});

SelectSearch.getSelectedText = function () {

    var selection = window.getSelection();
    return selection.toString();
};

SelectSearch.mouseup = function () {

    var selectedText = SelectSearch.getSelectedText();
    if (selectedText.length > 0 && selectedText.trim().length > 0) {
        SelectSearch.selectedText = selectedText.trim();
        SelectSearch.selectStatus = true;
    } else {
        SelectSearch.selectStatus = false;
    }
};
// don't use keypress
SelectSearch.keydown = function (e) {

    if (SelectSearch.selectStatus) {
        if (e.metaKey) {
            if (SelectSearch.keyCode[SelectSearch.searchKey] == e.keyCode) {
                e.preventDefault();
                chrome.runtime.sendMessage({
                    selectedText: SelectSearch.selectedText,
                    type: 'search'
                });
            } else if (SelectSearch.keyCode[SelectSearch.translateKey] == e.keyCode) {
                e.preventDefault();
                chrome.runtime.sendMessage({
                    selectedText: SelectSearch.selectedText,
                    type: 'translate'
                });
            } else if (SelectSearch.keyCode[SelectSearch.jumpToLinkKey] == e.keyCode) {
                e.preventDefault();
                chrome.runtime.sendMessage({
                    selectedText: SelectSearch.selectedText,
                    type: 'link'
                });
            }
        }
    }
};

document.addEventListener('mouseup', SelectSearch.mouseup);
document.addEventListener('keydown', SelectSearch.keydown);
