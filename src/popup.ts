class Popup {
  static keyMap = ["searchKey", "translateKey", "jumpToLinkKey"];

  constructor(
    public searchKey = "g",
    public translateKey = "e",
    public jumpToLinkKey = "b"
  ) {
    for (let key of Popup.keyMap) {
      this.chromeGet(key);
    }

    // i18n
    let i18nIDs = [
      "i18n_shortcuts",
      "i18n_search",
      "i18n_translate",
      "i18n_go_to_link",
      "i18n_go_to_options"
    ];
    for (let i of i18nIDs) {
      this.setText(i, chrome.i18n.getMessage(i));
    }
  }

  chromeGet = (key: string) => {
    let self = this;
    chrome.storage.sync.get(key, function (items) {
      let keyValue: string;
      switch (key) {
        case "searchKey":
          keyValue = items[key] || "g";
          self.setText(key, keyValue.toUpperCase());
          break;
        case "translateKey":
          keyValue = items[key] || "e";
          self.setText(key, keyValue.toUpperCase());
          break;
        case "jumpToLinkKey":
          keyValue = items[key] || "b";
          self.setText(key, keyValue.toUpperCase());
          break;
        default:
        //
      }
    });
  };

  setText(key: string, value: string) {
    let ele = document.getElementById(key) as HTMLElement;
    ele.textContent = value;
  }
}

let popup = new Popup();

/*
  plain js
*/
document.querySelector("#i18n_go_to_options").addEventListener("click", function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("options.html"));
  }
});
