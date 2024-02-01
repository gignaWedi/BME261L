import{W as u,m as d,k as h,l as o}from"./index-cc3f5417.js";async function b(l,e,i){let t;return Promise.race([l,new Promise((a,s)=>{t=setTimeout(()=>s(i),e)})]).finally(()=>clearTimeout(t))}class w extends u{constructor(){super(...arguments),this.deviceMap=new Map,this.discoveredDevices=new Map,this.scan=null,this.DEFAULT_CONNECTION_TIMEOUT=1e4,this.onAdvertisementReceivedCallback=this.onAdvertisementReceived.bind(this),this.onDisconnectedCallback=this.onDisconnected.bind(this),this.onCharacteristicValueChangedCallback=this.onCharacteristicValueChanged.bind(this)}async initialize(){if(typeof navigator>"u"||!navigator.bluetooth)throw this.unavailable("Web Bluetooth API not available in this browser.");if(!await navigator.bluetooth.getAvailability())throw this.unavailable("No Bluetooth radio available.")}async isEnabled(){return{value:!0}}async enable(){throw this.unavailable("enable is not available on web.")}async disable(){throw this.unavailable("disable is not available on web.")}async startEnabledNotifications(){}async stopEnabledNotifications(){}async isLocationEnabled(){throw this.unavailable("isLocationEnabled is not available on web.")}async openLocationSettings(){throw this.unavailable("openLocationSettings is not available on web.")}async openBluetoothSettings(){throw this.unavailable("openBluetoothSettings is not available on web.")}async openAppSettings(){throw this.unavailable("openAppSettings is not available on web.")}async setDisplayStrings(){}async requestDevice(e){const i=this.getFilters(e),t=await navigator.bluetooth.requestDevice({filters:i.length?i:void 0,optionalServices:e==null?void 0:e.optionalServices,acceptAllDevices:i.length===0});return this.deviceMap.set(t.id,t),this.getBleDevice(t)}async requestLEScan(e){this.requestBleDeviceOptions=e;const i=this.getFilters(e);await this.stopLEScan(),this.discoveredDevices=new Map,navigator.bluetooth.removeEventListener("advertisementreceived",this.onAdvertisementReceivedCallback),navigator.bluetooth.addEventListener("advertisementreceived",this.onAdvertisementReceivedCallback),this.scan=await navigator.bluetooth.requestLEScan({filters:i.length?i:void 0,acceptAllAdvertisements:i.length===0,keepRepeatedDevices:e==null?void 0:e.allowDuplicates})}onAdvertisementReceived(e){var i,t;const a=e.device.id;if(this.deviceMap.set(a,e.device),!this.discoveredDevices.has(a)||!((i=this.requestBleDeviceOptions)===null||i===void 0)&&i.allowDuplicates){this.discoveredDevices.set(a,!0);const n=this.getBleDevice(e.device),r={device:n,localName:n.name,rssi:e.rssi,txPower:e.txPower,manufacturerData:d(e.manufacturerData),serviceData:d(e.serviceData),uuids:(t=e.uuids)===null||t===void 0?void 0:t.map(h)};this.notifyListeners("onScanResult",r)}}async stopLEScan(){var e;!((e=this.scan)===null||e===void 0)&&e.active&&this.scan.stop(),this.scan=null}async getDevices(e){return{devices:(await navigator.bluetooth.getDevices()).filter(a=>e.deviceIds.includes(a.id)).map(a=>(this.deviceMap.set(a.id,a),this.getBleDevice(a)))}}async getConnectedDevices(e){return{devices:(await navigator.bluetooth.getDevices()).filter(a=>{var s;return(s=a.gatt)===null||s===void 0?void 0:s.connected}).map(a=>(this.deviceMap.set(a.id,a),this.getBleDevice(a)))}}async connect(e){var i,t;const a=this.getDeviceFromMap(e.deviceId);a.removeEventListener("gattserverdisconnected",this.onDisconnectedCallback),a.addEventListener("gattserverdisconnected",this.onDisconnectedCallback);const s=Symbol();if(a.gatt===void 0)throw new Error("No gatt server available.");try{const n=(i=e.timeout)!==null&&i!==void 0?i:this.DEFAULT_CONNECTION_TIMEOUT;await b(a.gatt.connect(),n,s)}catch(n){throw await((t=a.gatt)===null||t===void 0?void 0:t.disconnect()),n===s?new Error("Connection timeout"):n}}onDisconnected(e){const i=e.target.id,t="disconnected|".concat(i);this.notifyListeners(t,null)}async createBond(e){throw this.unavailable("createBond is not available on web.")}async isBonded(e){throw this.unavailable("isBonded is not available on web.")}async disconnect(e){var i;(i=this.getDeviceFromMap(e.deviceId).gatt)===null||i===void 0||i.disconnect()}async getServices(e){var i,t;const a=(t=await((i=this.getDeviceFromMap(e.deviceId).gatt)===null||i===void 0?void 0:i.getPrimaryServices()))!==null&&t!==void 0?t:[],s=[];for(const n of a){const r=await n.getCharacteristics(),v=[];for(const c of r)v.push({uuid:c.uuid,properties:this.getProperties(c),descriptors:await this.getDescriptors(c)});s.push({uuid:n.uuid,characteristics:v})}return{services:s}}async getDescriptors(e){try{return(await e.getDescriptors()).map(t=>({uuid:t.uuid}))}catch(i){return[]}}getProperties(e){return{broadcast:e.properties.broadcast,read:e.properties.read,writeWithoutResponse:e.properties.writeWithoutResponse,write:e.properties.write,notify:e.properties.notify,indicate:e.properties.indicate,authenticatedSignedWrites:e.properties.authenticatedSignedWrites,reliableWrite:e.properties.reliableWrite,writableAuxiliaries:e.properties.writableAuxiliaries}}async getCharacteristic(e){var i;const t=await((i=this.getDeviceFromMap(e.deviceId).gatt)===null||i===void 0?void 0:i.getPrimaryService(e==null?void 0:e.service));return t==null?void 0:t.getCharacteristic(e==null?void 0:e.characteristic)}async getDescriptor(e){const i=await this.getCharacteristic(e);return i==null?void 0:i.getDescriptor(e==null?void 0:e.descriptor)}async discoverServices(e){throw this.unavailable("discoverServices is not available on web.")}async getMtu(e){throw this.unavailable("getMtu is not available on web.")}async requestConnectionPriority(e){throw this.unavailable("requestConnectionPriority is not available on web.")}async readRssi(e){throw this.unavailable("readRssi is not available on web.")}async read(e){const i=await this.getCharacteristic(e);return{value:await(i==null?void 0:i.readValue())}}async write(e){const i=await this.getCharacteristic(e);let t;typeof e.value=="string"?t=o(e.value):t=e.value,await(i==null?void 0:i.writeValueWithResponse(t))}async writeWithoutResponse(e){const i=await this.getCharacteristic(e);let t;typeof e.value=="string"?t=o(e.value):t=e.value,await(i==null?void 0:i.writeValueWithoutResponse(t))}async readDescriptor(e){const i=await this.getDescriptor(e);return{value:await(i==null?void 0:i.readValue())}}async writeDescriptor(e){const i=await this.getDescriptor(e);let t;typeof e.value=="string"?t=o(e.value):t=e.value,await(i==null?void 0:i.writeValue(t))}async startNotifications(e){const i=await this.getCharacteristic(e);i==null||i.removeEventListener("characteristicvaluechanged",this.onCharacteristicValueChangedCallback),i==null||i.addEventListener("characteristicvaluechanged",this.onCharacteristicValueChangedCallback),await(i==null?void 0:i.startNotifications())}onCharacteristicValueChanged(e){var i,t;const a=e.target,s="notification|".concat((i=a.service)===null||i===void 0?void 0:i.device.id,"|").concat((t=a.service)===null||t===void 0?void 0:t.uuid,"|").concat(a.uuid);this.notifyListeners(s,{value:a.value})}async stopNotifications(e){const i=await this.getCharacteristic(e);await(i==null?void 0:i.stopNotifications())}getFilters(e){var i;const t=[];for(const a of(i=e==null?void 0:e.services)!==null&&i!==void 0?i:[])t.push({services:[a],name:e==null?void 0:e.name,namePrefix:e==null?void 0:e.namePrefix});return(e!=null&&e.name||e!=null&&e.namePrefix)&&t.length===0&&t.push({name:e.name,namePrefix:e.namePrefix}),t}getDeviceFromMap(e){const i=this.deviceMap.get(e);if(i===void 0)throw new Error('Device not found. Call "requestDevice", "requestLEScan" or "getDevices" first.');return i}getBleDevice(e){var i;return{deviceId:e.id,name:(i=e.name)!==null&&i!==void 0?i:void 0}}}export{w as BluetoothLeWeb};
