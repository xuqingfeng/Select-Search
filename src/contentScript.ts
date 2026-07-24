class Content {
  static keyMap = {
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
  };

  constructor(
    public selectStatus: boolean = false,
    public selectedText: string = "",
    public searchKey: string = "g",
    public translateKey: string = "e",
    public jumpToLinkKey: string = "b"
  ) {
    this.loadKeys();
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== "sync") return;
      if (changes.searchKey) {
        this.searchKey = (changes.searchKey.newValue as string) || "g";
      }
      if (changes.translateKey) {
        this.translateKey = (changes.translateKey.newValue as string) || "e";
      }
      if (changes.jumpToLinkKey) {
        this.jumpToLinkKey = (changes.jumpToLinkKey.newValue as string) || "b";
      }
    });
  }

  loadKeys = () => {
    chrome.storage.sync.get(
      ["searchKey", "translateKey", "jumpToLinkKey"],
      (items) => {
        this.searchKey = (items["searchKey"] as string) || "g";
        this.translateKey = (items["translateKey"] as string) || "e";
        this.jumpToLinkKey = (items["jumpToLinkKey"] as string) || "b";
      }
    );
  };

  mouseUp = () => {
    let selection = window.getSelection();
    let selectedText = selection ? selection.toString() : "";
    if (selectedText.length > 0 && selectedText.trim().length > 0) {
      this.selectedText = selectedText.trim();
      this.selectStatus = true;
    } else {
      this.selectStatus = false;
    }
  };

  keyDown = (e) => {
    if (this.selectStatus) {
      if ((e.metaKey || e.ctrlKey) && e.key == Content.keyMap[this.searchKey]) {
        e.preventDefault();
        chrome.runtime.sendMessage({
          selectedText: this.selectedText,
          type: "search",
        });
      }
      if ((e.metaKey || e.ctrlKey) && e.key == Content.keyMap[this.translateKey]) {
        e.preventDefault();
        chrome.runtime.sendMessage({
          selectedText: this.selectedText,
          type: "translate",
        });
      }
      if ((e.metaKey || e.ctrlKey) && e.key == Content.keyMap[this.jumpToLinkKey]) {
        e.preventDefault();
        chrome.runtime.sendMessage({
          selectedText: this.selectedText,
          type: "link",
        });
      }
    }
  };
}

let cs = new Content();
document.addEventListener("mouseup", cs.mouseUp);
document.addEventListener("keydown", cs.keyDown);
