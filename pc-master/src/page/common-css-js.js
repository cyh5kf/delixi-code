import "@/assets/css/base.scss";
require('es6-promise').polyfill();//promise 兼容
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {setTimeout(callback,1000/60)};
