import{W as P,b as x,E}from"./index-02a96edd.js";function m(p){const e=p.split("/").filter(t=>t!=="."),r=[];return e.forEach(t=>{t===".."&&r.length>0&&r[r.length-1]!==".."?r.pop():r.push(t)}),r.join("/")}function R(p,e){p=m(p),e=m(e);const r=p.split("/"),t=e.split("/");return p!==e&&r.every((i,s)=>i===t[s])}class g extends P{constructor(){super(...arguments),this.DB_VERSION=1,this.DB_NAME="Disc",this._writeCmds=["add","put","delete"],this.downloadFile=async e=>{const r=x(e,e.webFetchExtra),t=await fetch(e.url,r);let i;if(!(e!=null&&e.progress))i=await t.blob();else if(!(t!=null&&t.body))i=new Blob;else{const a=t.body.getReader();let o=0;const c=[],h=t.headers.get("content-type"),l=parseInt(t.headers.get("content-length")||"0",10);for(;;){const{done:d,value:y}=await a.read();if(d)break;c.push(y),o+=(y==null?void 0:y.length)||0;const w={url:e.url,bytes:o,contentLength:l};this.notifyListeners("progress",w)}const f=new Uint8Array(o);let u=0;for(const d of c)typeof d>"u"||(f.set(d,u),u+=d.length);i=new Blob([f.buffer],{type:h||void 0})}const s=URL.createObjectURL(i),n=document.createElement("a");return document.body.appendChild(n),n.href=s,n.download=e.path,n.click(),URL.revokeObjectURL(s),document.body.removeChild(n),{path:e.path,blob:i}}}async initDb(){if(this._db!==void 0)return this._db;if(!("indexedDB"in window))throw this.unavailable("This browser doesn't support IndexedDB");return new Promise((e,r)=>{const t=indexedDB.open(this.DB_NAME,this.DB_VERSION);t.onupgradeneeded=g.doUpgrade,t.onsuccess=()=>{this._db=t.result,e(t.result)},t.onerror=()=>r(t.error),t.onblocked=()=>{console.warn("db blocked")}})}static doUpgrade(e){const t=e.target.result;switch(e.oldVersion){case 0:case 1:default:t.objectStoreNames.contains("FileStorage")&&t.deleteObjectStore("FileStorage"),t.createObjectStore("FileStorage",{keyPath:"path"}).createIndex("by_folder","folder")}}async dbRequest(e,r){const t=this._writeCmds.indexOf(e)!==-1?"readwrite":"readonly";return this.initDb().then(i=>new Promise((s,n)=>{const c=i.transaction(["FileStorage"],t).objectStore("FileStorage")[e](...r);c.onsuccess=()=>s(c.result),c.onerror=()=>n(c.error)}))}async dbIndexRequest(e,r,t){const i=this._writeCmds.indexOf(r)!==-1?"readwrite":"readonly";return this.initDb().then(s=>new Promise((n,a)=>{const l=s.transaction(["FileStorage"],i).objectStore("FileStorage").index(e)[r](...t);l.onsuccess=()=>n(l.result),l.onerror=()=>a(l.error)}))}getPath(e,r){const t=r!==void 0?r.replace(/^[/]+|[/]+$/g,""):"";let i="";return e!==void 0&&(i+="/"+e),r!==""&&(i+="/"+t),i}async clear(){(await this.initDb()).transaction(["FileStorage"],"readwrite").objectStore("FileStorage").clear()}async readFile(e){const r=this.getPath(e.directory,e.path),t=await this.dbRequest("get",[r]);if(t===void 0)throw Error("File does not exist.");return{data:t.content?t.content:""}}async writeFile(e){const r=this.getPath(e.directory,e.path);let t=e.data;const i=e.encoding,s=e.recursive,n=await this.dbRequest("get",[r]);if(n&&n.type==="directory")throw Error("The supplied path is a directory.");const a=r.substr(0,r.lastIndexOf("/"));if(await this.dbRequest("get",[a])===void 0){const l=a.indexOf("/",1);if(l!==-1){const f=a.substr(l);await this.mkdir({path:f,directory:e.directory,recursive:s})}}if(!i&&(t=t.indexOf(",")>=0?t.split(",")[1]:t,!this.isBase64String(t)))throw Error("The supplied data is not valid base64 content.");const c=Date.now(),h={path:r,folder:a,type:"file",size:t.length,ctime:c,mtime:c,content:t};return await this.dbRequest("put",[h]),{uri:h.path}}async appendFile(e){const r=this.getPath(e.directory,e.path);let t=e.data;const i=e.encoding,s=r.substr(0,r.lastIndexOf("/")),n=Date.now();let a=n;const o=await this.dbRequest("get",[r]);if(o&&o.type==="directory")throw Error("The supplied path is a directory.");if(await this.dbRequest("get",[s])===void 0){const l=s.indexOf("/",1);if(l!==-1){const f=s.substr(l);await this.mkdir({path:f,directory:e.directory,recursive:!0})}}if(!i&&!this.isBase64String(t))throw Error("The supplied data is not valid base64 content.");o!==void 0&&(o.content!==void 0&&!i?t=btoa(atob(o.content)+atob(t)):t=o.content+t,a=o.ctime);const h={path:r,folder:s,type:"file",size:t.length,ctime:a,mtime:n,content:t};await this.dbRequest("put",[h])}async deleteFile(e){const r=this.getPath(e.directory,e.path);if(await this.dbRequest("get",[r])===void 0)throw Error("File does not exist.");if((await this.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(r)])).length!==0)throw Error("Folder is not empty.");await this.dbRequest("delete",[r])}async mkdir(e){const r=this.getPath(e.directory,e.path),t=e.recursive,i=r.substr(0,r.lastIndexOf("/")),s=(r.match(/\//g)||[]).length,n=await this.dbRequest("get",[i]),a=await this.dbRequest("get",[r]);if(s===1)throw Error("Cannot create Root directory");if(a!==void 0)throw Error("Current directory does already exist.");if(!t&&s!==2&&n===void 0)throw Error("Parent directory must exist");if(t&&s!==2&&n===void 0){const h=i.substr(i.indexOf("/",1));await this.mkdir({path:h,directory:e.directory,recursive:t})}const o=Date.now(),c={path:r,folder:i,type:"directory",size:0,ctime:o,mtime:o};await this.dbRequest("put",[c])}async rmdir(e){const{path:r,directory:t,recursive:i}=e,s=this.getPath(t,r),n=await this.dbRequest("get",[s]);if(n===void 0)throw Error("Folder does not exist.");if(n.type!=="directory")throw Error("Requested path is not a directory");const a=await this.readdir({path:r,directory:t});if(a.files.length!==0&&!i)throw Error("Folder is not empty");for(const o of a.files){const c="".concat(r,"/").concat(o.name);(await this.stat({path:c,directory:t})).type==="file"?await this.deleteFile({path:c,directory:t}):await this.rmdir({path:c,directory:t,recursive:i})}await this.dbRequest("delete",[s])}async readdir(e){const r=this.getPath(e.directory,e.path),t=await this.dbRequest("get",[r]);if(e.path!==""&&t===void 0)throw Error("Folder does not exist.");const i=await this.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(r)]);return{files:await Promise.all(i.map(async n=>{let a=await this.dbRequest("get",[n]);return a===void 0&&(a=await this.dbRequest("get",[n+"/"])),{name:n.substring(r.length+1),type:a.type,size:a.size,ctime:a.ctime,mtime:a.mtime,uri:a.path}}))}}async getUri(e){const r=this.getPath(e.directory,e.path);let t=await this.dbRequest("get",[r]);return t===void 0&&(t=await this.dbRequest("get",[r+"/"])),{uri:(t==null?void 0:t.path)||r}}async stat(e){const r=this.getPath(e.directory,e.path);let t=await this.dbRequest("get",[r]);if(t===void 0&&(t=await this.dbRequest("get",[r+"/"])),t===void 0)throw Error("Entry does not exist.");return{type:t.type,size:t.size,ctime:t.ctime,mtime:t.mtime,uri:t.path}}async rename(e){await this._copy(e,!0)}async copy(e){return this._copy(e,!1)}async requestPermissions(){return{publicStorage:"granted"}}async checkPermissions(){return{publicStorage:"granted"}}async _copy(e,r=!1){let{toDirectory:t}=e;const{to:i,from:s,directory:n}=e;if(!i||!s)throw Error("Both to and from must be provided");t||(t=n);const a=this.getPath(n,s),o=this.getPath(t,i);if(a===o)return{uri:o};if(R(a,o))throw Error("To path cannot contain the from path");let c;try{c=await this.stat({path:i,directory:t})}catch(u){const d=i.split("/");d.pop();const y=d.join("/");if(d.length>0&&(await this.stat({path:y,directory:t})).type!=="directory")throw new Error("Parent directory of the to path is a file")}if(c&&c.type==="directory")throw new Error("Cannot overwrite a directory with a file");const h=await this.stat({path:s,directory:n}),l=async(u,d,y)=>{const w=this.getPath(t,u),b=await this.dbRequest("get",[w]);b.ctime=d,b.mtime=y,await this.dbRequest("put",[b])},f=h.ctime?h.ctime:Date.now();switch(h.type){case"file":{const u=await this.readFile({path:s,directory:n});r&&await this.deleteFile({path:s,directory:n});let d;this.isBase64String(u.data)||(d=E.UTF8);const y=await this.writeFile({path:i,directory:t,data:u.data,encoding:d});return r&&await l(i,f,h.mtime),y}case"directory":{if(c)throw Error("Cannot move a directory over an existing object");try{await this.mkdir({path:i,directory:t,recursive:!1}),r&&await l(i,f,h.mtime)}catch(d){}const u=(await this.readdir({path:s,directory:n})).files;for(const d of u)await this._copy({from:"".concat(s,"/").concat(d.name),to:"".concat(i,"/").concat(d.name),directory:n,toDirectory:t},r);r&&await this.rmdir({path:s,directory:n})}}return{uri:o}}isBase64String(e){try{return btoa(atob(e))==e}catch(r){return!1}}}g._debug=!0;export{g as FilesystemWeb};
