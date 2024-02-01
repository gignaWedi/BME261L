System.register(["./index-legacy-609e1cb8.js"],(function(e,t){"use strict";var i,a,s,n;return{setters:[e=>{i=e.W,a=e.m,s=e.l,n=e.o}],execute:function(){e("BluetoothLeWeb",class extends i{constructor(){super(...arguments),this.deviceMap=new Map,this.discoveredDevices=new Map,this.scan=null,this.DEFAULT_CONNECTION_TIMEOUT=1e4,this.onAdvertisementReceivedCallback=this.onAdvertisementReceived.bind(this),this.onDisconnectedCallback=this.onDisconnected.bind(this),this.onCharacteristicValueChangedCallback=this.onCharacteristicValueChanged.bind(this)}async initialize(){if("undefined"==typeof navigator||!navigator.bluetooth)throw this.unavailable("Web Bluetooth API not available in this browser.");if(!(await navigator.bluetooth.getAvailability()))throw this.unavailable("No Bluetooth radio available.")}async isEnabled(){return{value:!0}}async enable(){throw this.unavailable("enable is not available on web.")}async disable(){throw this.unavailable("disable is not available on web.")}async startEnabledNotifications(){}async stopEnabledNotifications(){}async isLocationEnabled(){throw this.unavailable("isLocationEnabled is not available on web.")}async openLocationSettings(){throw this.unavailable("openLocationSettings is not available on web.")}async openBluetoothSettings(){throw this.unavailable("openBluetoothSettings is not available on web.")}async openAppSettings(){throw this.unavailable("openAppSettings is not available on web.")}async setDisplayStrings(){}async requestDevice(e){const t=this.getFilters(e),i=await navigator.bluetooth.requestDevice({filters:t.length?t:void 0,optionalServices:null==e?void 0:e.optionalServices,acceptAllDevices:0===t.length});return this.deviceMap.set(i.id,i),this.getBleDevice(i)}async requestLEScan(e){this.requestBleDeviceOptions=e;const t=this.getFilters(e);await this.stopLEScan(),this.discoveredDevices=new Map,navigator.bluetooth.removeEventListener("advertisementreceived",this.onAdvertisementReceivedCallback),navigator.bluetooth.addEventListener("advertisementreceived",this.onAdvertisementReceivedCallback),this.scan=await navigator.bluetooth.requestLEScan({filters:t.length?t:void 0,acceptAllAdvertisements:0===t.length,keepRepeatedDevices:null==e?void 0:e.allowDuplicates})}onAdvertisementReceived(e){var t,i;const n=e.device.id;if(this.deviceMap.set(n,e.device),!this.discoveredDevices.has(n)||(null===(t=this.requestBleDeviceOptions)||void 0===t?void 0:t.allowDuplicates)){this.discoveredDevices.set(n,!0);const t=this.getBleDevice(e.device),o={device:t,localName:t.name,rssi:e.rssi,txPower:e.txPower,manufacturerData:a(e.manufacturerData),serviceData:a(e.serviceData),uuids:null===(i=e.uuids)||void 0===i?void 0:i.map(s)};this.notifyListeners("onScanResult",o)}}async stopLEScan(){var e;(null===(e=this.scan)||void 0===e?void 0:e.active)&&this.scan.stop(),this.scan=null}async getDevices(e){return{devices:(await navigator.bluetooth.getDevices()).filter((t=>e.deviceIds.includes(t.id))).map((e=>(this.deviceMap.set(e.id,e),this.getBleDevice(e))))}}async getConnectedDevices(e){return{devices:(await navigator.bluetooth.getDevices()).filter((e=>{var t;return null===(t=e.gatt)||void 0===t?void 0:t.connected})).map((e=>(this.deviceMap.set(e.id,e),this.getBleDevice(e))))}}async connect(e){var t,i;const a=this.getDeviceFromMap(e.deviceId);a.removeEventListener("gattserverdisconnected",this.onDisconnectedCallback),a.addEventListener("gattserverdisconnected",this.onDisconnectedCallback);const s=Symbol();if(void 0===a.gatt)throw new Error("No gatt server available.");try{const i=null!==(t=e.timeout)&&void 0!==t?t:this.DEFAULT_CONNECTION_TIMEOUT;await async function(e,t,i){let a;return Promise.race([e,new Promise(((e,s)=>{a=setTimeout((()=>s(i)),t)}))]).finally((()=>clearTimeout(a)))}(a.gatt.connect(),i,s)}catch(n){throw await(null===(i=a.gatt)||void 0===i?void 0:i.disconnect()),n===s?new Error("Connection timeout"):n}}onDisconnected(e){const t=`disconnected|${e.target.id}`;this.notifyListeners(t,null)}async createBond(e){throw this.unavailable("createBond is not available on web.")}async isBonded(e){throw this.unavailable("isBonded is not available on web.")}async disconnect(e){var t;null===(t=this.getDeviceFromMap(e.deviceId).gatt)||void 0===t||t.disconnect()}async getServices(e){var t,i;const a=null!==(i=await(null===(t=this.getDeviceFromMap(e.deviceId).gatt)||void 0===t?void 0:t.getPrimaryServices()))&&void 0!==i?i:[],s=[];for(const n of a){const e=await n.getCharacteristics(),t=[];for(const i of e)t.push({uuid:i.uuid,properties:this.getProperties(i),descriptors:await this.getDescriptors(i)});s.push({uuid:n.uuid,characteristics:t})}return{services:s}}async getDescriptors(e){try{return(await e.getDescriptors()).map((e=>({uuid:e.uuid})))}catch(t){return[]}}getProperties(e){return{broadcast:e.properties.broadcast,read:e.properties.read,writeWithoutResponse:e.properties.writeWithoutResponse,write:e.properties.write,notify:e.properties.notify,indicate:e.properties.indicate,authenticatedSignedWrites:e.properties.authenticatedSignedWrites,reliableWrite:e.properties.reliableWrite,writableAuxiliaries:e.properties.writableAuxiliaries}}async getCharacteristic(e){var t;const i=await(null===(t=this.getDeviceFromMap(e.deviceId).gatt)||void 0===t?void 0:t.getPrimaryService(null==e?void 0:e.service));return null==i?void 0:i.getCharacteristic(null==e?void 0:e.characteristic)}async getDescriptor(e){const t=await this.getCharacteristic(e);return null==t?void 0:t.getDescriptor(null==e?void 0:e.descriptor)}async discoverServices(e){throw this.unavailable("discoverServices is not available on web.")}async getMtu(e){throw this.unavailable("getMtu is not available on web.")}async requestConnectionPriority(e){throw this.unavailable("requestConnectionPriority is not available on web.")}async readRssi(e){throw this.unavailable("readRssi is not available on web.")}async read(e){const t=await this.getCharacteristic(e);return{value:await(null==t?void 0:t.readValue())}}async write(e){const t=await this.getCharacteristic(e);let i;i="string"==typeof e.value?n(e.value):e.value,await(null==t?void 0:t.writeValueWithResponse(i))}async writeWithoutResponse(e){const t=await this.getCharacteristic(e);let i;i="string"==typeof e.value?n(e.value):e.value,await(null==t?void 0:t.writeValueWithoutResponse(i))}async readDescriptor(e){const t=await this.getDescriptor(e);return{value:await(null==t?void 0:t.readValue())}}async writeDescriptor(e){const t=await this.getDescriptor(e);let i;i="string"==typeof e.value?n(e.value):e.value,await(null==t?void 0:t.writeValue(i))}async startNotifications(e){const t=await this.getCharacteristic(e);null==t||t.removeEventListener("characteristicvaluechanged",this.onCharacteristicValueChangedCallback),null==t||t.addEventListener("characteristicvaluechanged",this.onCharacteristicValueChangedCallback),await(null==t?void 0:t.startNotifications())}onCharacteristicValueChanged(e){var t,i;const a=e.target,s=`notification|${null===(t=a.service)||void 0===t?void 0:t.device.id}|${null===(i=a.service)||void 0===i?void 0:i.uuid}|${a.uuid}`;this.notifyListeners(s,{value:a.value})}async stopNotifications(e){const t=await this.getCharacteristic(e);await(null==t?void 0:t.stopNotifications())}getFilters(e){var t;const i=[];for(const a of null!==(t=null==e?void 0:e.services)&&void 0!==t?t:[])i.push({services:[a],name:null==e?void 0:e.name,namePrefix:null==e?void 0:e.namePrefix});return((null==e?void 0:e.name)||(null==e?void 0:e.namePrefix))&&0===i.length&&i.push({name:e.name,namePrefix:e.namePrefix}),i}getDeviceFromMap(e){const t=this.deviceMap.get(e);if(void 0===t)throw new Error('Device not found. Call "requestDevice", "requestLEScan" or "getDevices" first.');return t}getBleDevice(e){var t;return{deviceId:e.id,name:null!==(t=e.name)&&void 0!==t?t:void 0}}})}}}));
