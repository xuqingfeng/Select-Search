class Options {
  static keyMap = [
    "searchKey",
    "translateKey",
    "jumpToLinkKey",
    "translateFrom",
    "translateTo",
    "searchEngine",
    "translateSite",
  ];

  constructor(
    public searchKey = "g",
    public translateKey = "e",
    public jumpToLinkKey = "b",
    public searchEngine = "google",
    public translateSite = "googleTrans",
    public translateFrom = "en",
    public translateTo = "zh-CN"
  ) {
    for (let key of Options.keyMap) {
      this.chromeGet(key);
    }

    // i18n
    let i18nIDs = [
      "i18nSettings",
      "i18nShortcuts",
      "i18nsearch",
      "i18ntranslate",
      "i18ngo_to_link",
      "i18nSearchEngine",
      "i18nTranslateEngine",
      "i18nfrom",
      "i18nto",
      "i18nchanges_saved",
      "save",
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
          self.optionSelect(key, keyValue);
          break;
        case "translateKey":
          keyValue = items[key] || "e";
          self.optionSelect(key, keyValue);
          break;
        case "jumpToLinkKey":
          keyValue = items[key] || "b";
          self.optionSelect(key, keyValue);
          break;
        case "translateFrom":
          keyValue = items[key] || "en";
          self.optionSelect(key, keyValue);
          break;
        case "translateTo":
          keyValue = items[key] || "zh-CN";
          self.optionSelect(key, keyValue);
          break;
        case "searchEngine":
          keyValue = items[key] || "google";
          self.checkboxCheck(keyValue);
          break;
        case "translateSite":
          keyValue = items[key] || "googleTrans";
          self.checkboxCheck(keyValue);
          break;
        default:
        //
      }
    });
  };

  optionSelect(key: string, value: string) {
    let ele = document.getElementById(key) as HTMLSelectElement;
    let options = ele.options;
    for (let i = 0; i < options.length; i++) {
      if (value == options[i].value) {
        options[i].selected = true;
      }
    }
  }

  checkboxCheck(value: string) {
    let ele = document.getElementById(value) as HTMLInputElement;
    ele.checked = true;
  }

  setText(key: string, value: string) {
    let ele = document.getElementById(key) as HTMLElement;
    ele.textContent = value;
  }
}

let options = new Options();

let saveButton = document.getElementById("save");
saveButton.addEventListener("click", function () {
  let ele = document.getElementById("searchKey") as HTMLInputElement;
  let searchKey = ele.value;
  ele = document.getElementById("translateKey") as HTMLInputElement;
  let translateKey = ele.value;
  ele = document.getElementById("jumpToLinkKey") as HTMLInputElement;
  let jumpToLinkKey = ele.value;
  ele = document.querySelector(
    "input[name=searchEngine]:checked"
  ) as HTMLInputElement;
  let searchEngine = ele.value;
  ele = document.querySelector(
    "input[name=translateSite]:checked"
  ) as HTMLInputElement;
  let translateSite = ele.value;
  ele = document.getElementById("translateFrom") as HTMLInputElement;
  let translateFrom = ele.value;
  ele = document.getElementById("translateTo") as HTMLInputElement;
  let translateTo = ele.value;

  // change SAVE button class
  saveButton.classList.remove("primary");
  saveButton.classList.add("secondary");

  chrome.storage.sync.set(
    {
      searchKey: searchKey,
      translateKey: translateKey,
      jumpToLinkKey: jumpToLinkKey,
      searchEngine: searchEngine,
      translateSite: translateSite,
      translateFrom: translateFrom,
      translateTo: translateTo,
    },
    function () {
      let messageArea = document.getElementById("messageArea");
      messageArea.classList.remove("hidden");
      messageArea.classList.add("positive");
      messageArea.classList.add("animated");
      messageArea.classList.add("fadeInDown");
      window.setTimeout(function () {
        messageArea.classList.remove("positive");
        messageArea.classList.remove("animated");
        messageArea.classList.remove("fadeInDown");
        messageArea.classList.add("hidden");

        saveButton.classList.remove("secondary");
        saveButton.classList.add("primary");
      }, 2000);
    }
  );
});
