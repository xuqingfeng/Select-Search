(()=>{"use strict";class e{constructor(t=!1,s="",n="g",a="e",c="b"){this.selectStatus=t,this.selectedText=s,this.searchKey=n,this.translateKey=a,this.jumpToLinkKey=c,this.mouseUp=()=>{let e=window.getSelection(),t=e?e.toString():"";t.length>0&&t.trim().length>0?(this.selectedText=t.trim(),this.selectStatus=!0):this.selectStatus=!1},this.keyDown=t=>{if(this.selectStatus&&t.metaKey)switch(t.keyCode){case e.keyMap[this.searchKey]:t.preventDefault(),chrome.runtime.sendMessage({selectedText:this.selectedText,type:"search"});break;case e.keyMap[this.translateKey]:t.preventDefault(),chrome.runtime.sendMessage({selectedText:this.selectedText,type:"translate"});break;case e.keyMap[this.jumpToLinkKey]:t.preventDefault(),chrome.runtime.sendMessage({selectedText:this.selectedText,type:"link"})}};let i=this;chrome.storage.sync.get("searchKey",(function(e){i.searchKey=e.searchKey||"g"})),chrome.storage.sync.get("translateKey",(function(e){i.translateKey=e.translateKey||"e"})),chrome.storage.sync.get("jumpToLinkKey",(function(e){i.jumpToLinkKey=e.jumpToLinkKey||"b"}))}}e.keyMap={a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90};let t=new e;document.addEventListener("mouseup",t.mouseUp),document.addEventListener("keydown",t.keyDown)})();