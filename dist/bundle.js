(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cordova-camera-plugin-debug"] = factory();
	else
		root["cordova-camera-plugin-debug"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by michogarcia on 29/12/16.
	 */
	
	var Camera = function () {
	  _createClass(Camera, null, [{
	    key: 'getEncodingType',
	    value: function getEncodingType(encodingType) {
	      var privateEncoding = ['image/jpeg', 'image/png'];
	      var encoding = privateEncoding[encodingType];
	      if (!encoding) {
	        throw new Error('Not encoding allowed');
	      }
	      return encoding;
	    }
	  }]);
	
	  function Camera() {
	    _classCallCheck(this, Camera);
	
	    if (!navigator.camera) {
	      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
	        throw new Error('No Media devices available!!');
	      } else {
	        navigator.camera = this;
	      }
	    }
	  }
	
	  _createClass(Camera, [{
	    key: 'showCamera',
	    value: function showCamera() {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
	          if (document.getElementById('video')) {
	            _this.video = document.getElementById('video');
	            _this.snap = document.getElementById('snap');
	            _this.canvas = document.getElementById('canvas');
	            resolve();
	            return;
	          }
	          _this.video = document.createElement('video');
	          _this.video.setAttribute('id', 'video');
	          _this.video.setAttribute('width', '640');
	          _this.video.setAttribute('height', '480');
	          _this.video.setAttribute('autoplay', true);
	
	          _this.snap = document.createElement('button');
	          _this.snap.setAttribute('id', 'snap');
	          _this.snap.appendChild(document.createTextNode('Snap Photo'));
	
	          _this.canvas = document.createElement('canvas');
	          _this.canvas.setAttribute('id', 'canvas');
	          _this.canvas.setAttribute('width', '640');
	          _this.canvas.setAttribute('height', '480');
	
	          document.body.appendChild(_this.video);
	          document.body.appendChild(_this.snap);
	          document.body.appendChild(_this.canvas);
	
	          _this.video.src = window.URL.createObjectURL(stream);
	          _this.video.play();
	          resolve();
	        }).catch(function (err) {
	          _this.removeCamera();
	          reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'removeCamera',
	    value: function removeCamera() {
	      this.video.pause();
	      document.body.removeChild(this.video);
	      document.body.removeChild(this.snap);
	      document.body.removeChild(this.canvas);
	    }
	  }, {
	    key: 'getPictureFromCamera',
	    value: function getPictureFromCamera() {
	      var _this2 = this;
	
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$destinationType = _ref.destinationType,
	          destinationType = _ref$destinationType === undefined ? Camera.DestinationType.DATA_URL : _ref$destinationType,
	          _ref$encodingType = _ref.encodingType,
	          encodingType = _ref$encodingType === undefined ? Camera.EncodingType.JPEG : _ref$encodingType,
	          _ref$quality = _ref.quality,
	          quality = _ref$quality === undefined ? 50 : _ref$quality;
	
	      return new Promise(function (resolve, reject) {
	        var context = _this2.canvas.getContext('2d');
	        context.drawImage(_this2.video, 0, 0, 640, 480);
	        var encoding = Camera.getEncodingType(encodingType);
	        if (destinationType === Camera.DestinationType.FILE_URI) {
	          _this2.canvas.toBlob(function (blob) {
	            var URL = window.URL || window.webkitURL;
	            resolve(URL.createObjectURL(blob));
	          }, encoding, quality / 100);
	        } else if (destinationType === Camera.DestinationType.DATA_URL) {
	          resolve(_this2.canvas.toDataURL(encoding));
	        } else {
	          reject(new Error('No image!!'));
	        }
	      });
	    }
	  }, {
	    key: 'getPicture',
	    value: function getPicture(successCallback, errorCallback) {
	      var _this3 = this;
	
	      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	          _ref2$sourceType = _ref2.sourceType,
	          sourceType = _ref2$sourceType === undefined ? Camera.PictureSourceType.CAMERA : _ref2$sourceType,
	          _ref2$destinationType = _ref2.destinationType,
	          destinationType = _ref2$destinationType === undefined ? Camera.DestinationType.DATA_URL : _ref2$destinationType,
	          _ref2$encodingType = _ref2.encodingType,
	          encodingType = _ref2$encodingType === undefined ? Camera.EncodingType.JPEG : _ref2$encodingType,
	          _ref2$quality = _ref2.quality,
	          quality = _ref2$quality === undefined ? 50 : _ref2$quality;
	
	      if (sourceType === Camera.PictureSourceType.CAMERA) {
	        this.showCamera().then(function () {
	          _this3.snap.addEventListener('click', function () {
	            _this3.getPictureFromCamera({ destinationType: destinationType, encodingType: encodingType, quality: quality }).then(function (picture) {
	              successCallback(picture);
	            }).catch(errorCallback);
	          });
	        }).catch(errorCallback);
	      }
	    }
	  }]);
	
	  return Camera;
	}();
	
	Camera.PictureSourceType = {
	  PHOTOLIBRARY: 0,
	  CAMERA: 1,
	  SAVEDPHOTOALBUM: 2
	};
	Camera.DestinationType = {
	  DATA_URL: 0,
	  FILE_URI: 1,
	  NATIVE_URI: 2
	};
	Camera.EncodingType = {
	  JPEG: 0,
	  PNG: 1
	};
	exports.default = Camera;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.js.map