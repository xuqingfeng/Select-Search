(()=>{"use strict";class e{constructor(t="google",a="com",o="en",s="zh-CN"){this.searchEngine=t,this.translateSite=a,this.translateFrom=o,this.translateTo=s,this.search=(t,a)=>{let o="";switch(a){case"google":o+=e.GOOGLE+encodeURIComponent(t);break;case"yahoo":o+=e.YAHOO+encodeURIComponent(t);break;case"bing":o+=e.BING+encodeURIComponent(t);break;case"duckduckgo":o+=e.DUCKDUCKGO+encodeURIComponent(t);break;case"sogou":o+=e.SOGOU+encodeURIComponent(t);break;case"baidu":o+=e.BAIDU+encodeURIComponent(t);break;case"yandex":o+=e.YANDEX+encodeURIComponent(t)}this.createTab(o)};let n=this;chrome.storage.sync.get("translateFrom",(function(e){n.translateFrom=e.translateFrom||"en"})),chrome.storage.sync.get("translateTo",(function(e){n.translateTo=e.translateTo||"zh-CN"})),chrome.runtime.onMessage.addListener((function(t){let a=t.selectedText;switch(t.type){case"search":chrome.storage.sync.get("searchEngine",(function(e){n.searchEngine=e.searchEngine||"google",n.search(a,n.searchEngine)}));break;case"translate":chrome.storage.sync.get(["translateSite","translateFrom","translateTo"],(function(t){n.translateSite=t.translateSite||"com",n.translateFrom=t.translateFrom||"en",n.translateTo=t.translateTo||"zh-CN";let o=encodeURIComponent(a.trim()),s=e.GOOGLE_TRANSLATE_URL+"?sl=auto&tl="+n.translateTo+"&text="+o+"&op=translate";n.createTab(s)}));break;case"link":let t=a.substr(0,7),o=a.substr(0,8);"http://"==t||"https://"==o?n.createTab(a):n.createTab("http://"+a)}}))}createTab(e){chrome.tabs.create({url:e,active:!0},(function(e){}))}}e.GOOGLE="https://www.google.com/search?q=",e.YAHOO="https://search.yahoo.com/search?p=",e.BING="https://www.bing.com/search?q=",e.DUCKDUCKGO="https://www.duckduckgo.com/?q=",e.SOGOU="https://www.sogou.com/web?query=",e.BAIDU="https://www.baidu.com/s?wd=",e.YANDEX="https://yandex.ru/yandsearch?text=",e.GOOGLE_TRANSLATE_URL="https://translate.google.com",new e})();