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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by michogarcia on 29/12/16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _vexJs = __webpack_require__(2);
	
	var _vexJs2 = _interopRequireDefault(_vexJs);
	
	var _vexDialog = __webpack_require__(3);
	
	var _vexDialog2 = _interopRequireDefault(_vexDialog);
	
	__webpack_require__(4);
	
	__webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	_vexJs2.default.registerPlugin(_vexDialog2.default);
	_vexJs2.default.defaultOptions.className = 'vex-theme-top';
	
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
	        _vexJs2.default.dialog.open({
	          message: '',
	          input: ['<div class="vex-custom-field-wrapper">', '<video id="video" width="400" height="400" autoplay="true"></video>', '</div>', '<div class="vex-custom-field-wrapper">', '<button id="snap">Snap Photo</button>', '</div>', '<div class="vex-custom-field-wrapper">', '<canvas id="canvas" width="400" height="400"></canvas>', '</div>'].join(''),
	          overlayClosesOnClick: false,
	          showCloseButton: false,
	          escapeButtonCloses: false
	        });
	
	        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
	          _this.video = document.getElementById('video');
	          _this.snap = document.getElementById('snap');
	          _this.canvas = document.getElementById('canvas');
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
	      this.video.parentNode.removeChild(this.video);
	      this.snap.parentNode.removeChild(this.snap);
	      this.canvas.parentNode.removeChild(this.canvas);
	    }
	  }, {
	    key: 'saveFile',
	    value: function saveFile(blob, encoding) {
	      var URL = window.URL || window.webkitURL;
	      var extension = encoding.split('/').pop();
	      var name = URL.createObjectURL(blob).split('/').pop() + '.' + extension;
	      var file = new File([blob], name);
	
	      return new Promise(function (resolve, reject) {
	        (window.requestFileSystem || window.webkitRequestFileSystem)(window.TEMPORARY, 10 * 1024 * 1024, function (fs) {
	          fs.root.getFile(file.name, { create: true }, function (fileEntry) {
	            fileEntry.createWriter(function (fileWriter) {
	              fileWriter.onwriteend = function () {
	                resolve(fileEntry.toURL());
	              };
	              fileWriter.onerror = reject;
	              fileWriter.write(blob);
	            }, reject);
	          }, reject);
	        }, reject);
	      });
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
	        context.drawImage(_this2.video, 0, 0, 400, 400);
	        var encoding = Camera.getEncodingType(encodingType);
	        if (destinationType === Camera.DestinationType.FILE_URI) {
	          _this2.canvas.toBlob(function (blob) {
	            _this2.saveFile(blob, encoding).then(resolve).catch(reject);
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
	          _this3.snap.addEventListener('click', function (evt) {
	            evt.preventDefault();
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vex = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	/*
	 * classList.js: Cross-browser full element.classList implementation.
	 * 2014-07-23
	 *
	 * By Eli Grey, http://eligrey.com
	 * Public Domain.
	 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	 */
	
	/*global self, document, DOMException */
	
	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
	
	/* Copied from MDN:
	 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
	 */
	
	if ("document" in window.self) {
	
	  // Full polyfill for browsers with no classList support
	  // Including IE < Edge missing SVGElement.classList
	  if (!("classList" in document.createElement("_"))
	    || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {
	
	  (function (view) {
	
	    "use strict";
	
	    if (!('Element' in view)) return;
	
	    var
	        classListProp = "classList"
	      , protoProp = "prototype"
	      , elemCtrProto = view.Element[protoProp]
	      , objCtr = Object
	      , strTrim = String[protoProp].trim || function () {
	        return this.replace(/^\s+|\s+$/g, "");
	      }
	      , arrIndexOf = Array[protoProp].indexOf || function (item) {
	        var
	            i = 0
	          , len = this.length
	        ;
	        for (; i < len; i++) {
	          if (i in this && this[i] === item) {
	            return i;
	          }
	        }
	        return -1;
	      }
	      // Vendors: please allow content code to instantiate DOMExceptions
	      , DOMEx = function (type, message) {
	        this.name = type;
	        this.code = DOMException[type];
	        this.message = message;
	      }
	      , checkTokenAndGetIndex = function (classList, token) {
	        if (token === "") {
	          throw new DOMEx(
	              "SYNTAX_ERR"
	            , "An invalid or illegal string was specified"
	          );
	        }
	        if (/\s/.test(token)) {
	          throw new DOMEx(
	              "INVALID_CHARACTER_ERR"
	            , "String contains an invalid character"
	          );
	        }
	        return arrIndexOf.call(classList, token);
	      }
	      , ClassList = function (elem) {
	        var
	            trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
	          , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
	          , i = 0
	          , len = classes.length
	        ;
	        for (; i < len; i++) {
	          this.push(classes[i]);
	        }
	        this._updateClassName = function () {
	          elem.setAttribute("class", this.toString());
	        };
	      }
	      , classListProto = ClassList[protoProp] = []
	      , classListGetter = function () {
	        return new ClassList(this);
	      }
	    ;
	    // Most DOMException implementations don't allow calling DOMException's toString()
	    // on non-DOMExceptions. Error's toString() is sufficient here.
	    DOMEx[protoProp] = Error[protoProp];
	    classListProto.item = function (i) {
	      return this[i] || null;
	    };
	    classListProto.contains = function (token) {
	      token += "";
	      return checkTokenAndGetIndex(this, token) !== -1;
	    };
	    classListProto.add = function () {
	      var
	          tokens = arguments
	        , i = 0
	        , l = tokens.length
	        , token
	        , updated = false
	      ;
	      do {
	        token = tokens[i] + "";
	        if (checkTokenAndGetIndex(this, token) === -1) {
	          this.push(token);
	          updated = true;
	        }
	      }
	      while (++i < l);
	
	      if (updated) {
	        this._updateClassName();
	      }
	    };
	    classListProto.remove = function () {
	      var
	          tokens = arguments
	        , i = 0
	        , l = tokens.length
	        , token
	        , updated = false
	        , index
	      ;
	      do {
	        token = tokens[i] + "";
	        index = checkTokenAndGetIndex(this, token);
	        while (index !== -1) {
	          this.splice(index, 1);
	          updated = true;
	          index = checkTokenAndGetIndex(this, token);
	        }
	      }
	      while (++i < l);
	
	      if (updated) {
	        this._updateClassName();
	      }
	    };
	    classListProto.toggle = function (token, force) {
	      token += "";
	
	      var
	          result = this.contains(token)
	        , method = result ?
	          force !== true && "remove"
	        :
	          force !== false && "add"
	      ;
	
	      if (method) {
	        this[method](token);
	      }
	
	      if (force === true || force === false) {
	        return force;
	      } else {
	        return !result;
	      }
	    };
	    classListProto.toString = function () {
	      return this.join(" ");
	    };
	
	    if (objCtr.defineProperty) {
	      var classListPropDesc = {
	          get: classListGetter
	        , enumerable: true
	        , configurable: true
	      };
	      try {
	        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	      } catch (ex) { // IE 8 doesn't support enumerable:true
	        if (ex.number === -0x7FF5EC54) {
	          classListPropDesc.enumerable = false;
	          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	        }
	      }
	    } else if (objCtr[protoProp].__defineGetter__) {
	      elemCtrProto.__defineGetter__(classListProp, classListGetter);
	    }
	
	    }(window.self));
	
	    } else {
	    // There is full or partial native classList support, so just check if we need
	    // to normalize the add/remove and toggle APIs.
	
	    (function () {
	      "use strict";
	
	      var testElement = document.createElement("_");
	
	      testElement.classList.add("c1", "c2");
	
	      // Polyfill for IE 10/11 and Firefox <26, where classList.add and
	      // classList.remove exist but support only one argument at a time.
	      if (!testElement.classList.contains("c2")) {
	        var createMethod = function(method) {
	          var original = DOMTokenList.prototype[method];
	
	          DOMTokenList.prototype[method] = function(token) {
	            var i, len = arguments.length;
	
	            for (i = 0; i < len; i++) {
	              token = arguments[i];
	              original.call(this, token);
	            }
	          };
	        };
	        createMethod('add');
	        createMethod('remove');
	      }
	
	      testElement.classList.toggle("c3", false);
	
	      // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	      // support the second argument.
	      if (testElement.classList.contains("c3")) {
	        var _toggle = DOMTokenList.prototype.toggle;
	
	        DOMTokenList.prototype.toggle = function(token, force) {
	          if (1 in arguments && !this.contains(token) === !force) {
	            return force;
	          } else {
	            return _toggle.call(this, token);
	          }
	        };
	
	      }
	
	      testElement = null;
	    }());
	  }
	}
	
	},{}],2:[function(require,module,exports){
	
	/**
	 * Expose `parse`.
	 */
	
	module.exports = parse;
	
	/**
	 * Tests for browser support.
	 */
	
	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}
	
	/**
	 * Wrap map from jquery.
	 */
	
	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};
	
	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];
	
	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];
	
	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */
	
	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');
	
	  // default to the global `document` object
	  if (!doc) doc = document;
	
	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);
	
	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace
	
	  var tag = m[1];
	
	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }
	
	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;
	
	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }
	
	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }
	
	  return fragment;
	}
	
	},{}],3:[function(require,module,exports){
	/**
	 * Code refactored from Mozilla Developer Network:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	 */
	
	'use strict';
	
	function assign(target, firstSource) {
	  if (target === undefined || target === null) {
	    throw new TypeError('Cannot convert first argument to object');
	  }
	
	  var to = Object(target);
	  for (var i = 1; i < arguments.length; i++) {
	    var nextSource = arguments[i];
	    if (nextSource === undefined || nextSource === null) {
	      continue;
	    }
	
	    var keysArray = Object.keys(Object(nextSource));
	    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	      var nextKey = keysArray[nextIndex];
	      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	      if (desc !== undefined && desc.enumerable) {
	        to[nextKey] = nextSource[nextKey];
	      }
	    }
	  }
	  return to;
	}
	
	function polyfill() {
	  if (!Object.assign) {
	    Object.defineProperty(Object, 'assign', {
	      enumerable: false,
	      configurable: true,
	      writable: true,
	      value: assign
	    });
	  }
	}
	
	module.exports = {
	  assign: assign,
	  polyfill: polyfill
	};
	
	},{}],4:[function(require,module,exports){
	// classList polyfill for old browsers
	require('classlist-polyfill')
	// Object.assign polyfill
	require('es6-object-assign').polyfill()
	
	// String to DOM function
	var domify = require('domify')
	
	// Use the DOM's HTML parsing to escape any dangerous strings
	var escapeHtml = function escapeHtml (str) {
	  if (typeof str !== 'undefined') {
	    var div = document.createElement('div')
	    div.appendChild(document.createTextNode(str))
	    return div.innerHTML
	  } else {
	    return ''
	  }
	}
	
	// Utility function to add space-delimited class strings to a DOM element's classList
	var addClasses = function addClasses (el, classStr) {
	  if (typeof classStr !== 'string' || classStr.length === 0) {
	    return
	  }
	  var classes = classStr.split(' ')
	  for (var i = 0; i < classes.length; i++) {
	    var className = classes[i]
	    if (className.length) {
	      el.classList.add(className)
	    }
	  }
	}
	
	// Detect CSS Animation End Support
	// https://github.com/limonte/sweetalert2/blob/99bd539f85e15ac170f69d35001d12e092ef0054/src/utils/dom.js#L194
	var animationEndEvent = (function detectAnimationEndEvent () {
	  var el = document.createElement('div')
	  var eventNames = {
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'animationend',
	    'OAnimation': 'oanimationend',
	    'msAnimation': 'MSAnimationEnd',
	    'animation': 'animationend'
	  }
	  for (var i in eventNames) {
	    if (el.style[i] !== undefined) {
	      return eventNames[i]
	    }
	  }
	  return false
	})()
	
	// vex base CSS classes
	var baseClassNames = {
	  vex: 'vex',
	  content: 'vex-content',
	  overlay: 'vex-overlay',
	  close: 'vex-close',
	  closing: 'vex-closing',
	  open: 'vex-open'
	}
	
	// Private lookup table of all open vex objects, keyed by id
	var vexes = {}
	var globalId = 1
	
	// Private boolean to assist the escapeButtonCloses option
	var isEscapeActive = false
	
	// vex itself is an object that exposes a simple API to open and close vex objects in various ways
	var vex = {
	  open: function open (opts) {
	    // Check for usage of deprecated options, and log a warning
	    var warnDeprecated = function warnDeprecated (prop) {
	      console.warn('The "' + prop + '" property is deprecated in vex 3. Use CSS classes and the appropriate "ClassName" options, instead.')
	      console.warn('See http://github.hubspot.com/vex/api/advanced/#options')
	    }
	    if (opts.css) {
	      warnDeprecated('css')
	    }
	    if (opts.overlayCSS) {
	      warnDeprecated('overlayCSS')
	    }
	    if (opts.contentCSS) {
	      warnDeprecated('contentCSS')
	    }
	    if (opts.closeCSS) {
	      warnDeprecated('closeCSS')
	    }
	
	    // The dialog instance
	    var vexInstance = {}
	
	    // Set id
	    vexInstance.id = globalId++
	
	    // Store internally
	    vexes[vexInstance.id] = vexInstance
	
	    // Set state
	    vexInstance.isOpen = true
	
	    // Close function on the vex instance
	    // This is how all API functions should close individual vexes
	    vexInstance.close = function instanceClose () {
	      // Check state
	      if (!this.isOpen) {
	        return true
	      }
	
	      var options = this.options
	
	      // escapeButtonCloses is checked first
	      if (isEscapeActive && !options.escapeButtonCloses) {
	        return false
	      }
	
	      // Allow the user to validate any info or abort the close with the beforeClose callback
	      var shouldClose = (function shouldClose () {
	        // Call before close callback
	        if (options.beforeClose) {
	          return options.beforeClose.call(this)
	        }
	        // Otherwise indicate that it's ok to continue with close
	        return true
	      }.bind(this)())
	
	      // If beforeClose() fails, abort the close
	      if (shouldClose === false) {
	        return false
	      }
	
	      // Update state
	      this.isOpen = false
	
	      // Detect if the content el has any CSS animations defined
	      var style = window.getComputedStyle(this.contentEl)
	      function hasAnimationPre (prefix) {
	        return style.getPropertyValue(prefix + 'animation-name') !== 'none' && style.getPropertyValue(prefix + 'animation-duration') !== '0s'
	      }
	      var hasAnimation = hasAnimationPre('') || hasAnimationPre('-webkit-') || hasAnimationPre('-moz-') || hasAnimationPre('-o-')
	
	      // Define the function that will actually close the instance
	      var close = function close () {
	        if (!this.rootEl.parentNode) {
	          return
	        }
	        // Run once
	        this.rootEl.removeEventListener(animationEndEvent, close)
	        // Remove from lookup table (prevent memory leaks)
	        delete vexes[this.id]
	        // Remove the dialog from the DOM
	        this.rootEl.parentNode.removeChild(this.rootEl)
	        // Call after close callback
	        if (options.afterClose) {
	          options.afterClose.call(this)
	        }
	        // Remove styling from the body, if no more vexes are open
	        if (Object.keys(vexes).length === 0) {
	          document.body.classList.remove(baseClassNames.open)
	        }
	      }.bind(this)
	
	      // Close the vex
	      if (animationEndEvent && hasAnimation) {
	        // Setup the end event listener, to remove the el from the DOM
	        this.rootEl.addEventListener(animationEndEvent, close)
	        // Add the closing class to the dialog, showing the close animation
	        this.rootEl.classList.add(baseClassNames.closing)
	      } else {
	        close()
	      }
	
	      return true
	    }
	
	    // Allow strings as content
	    if (typeof opts === 'string') {
	      opts = {
	        content: opts
	      }
	    }
	
	    // `content` is unsafe internally, so translate
	    // safe default: HTML-escape the content before passing it through
	    if (opts.unsafeContent && !opts.content) {
	      opts.content = opts.unsafeContent
	    } else if (opts.content) {
	      opts.content = escapeHtml(opts.content)
	    }
	
	    // Store options on instance for future reference
	    var options = vexInstance.options = Object.assign({}, vex.defaultOptions, opts)
	
	    // vex root
	    var rootEl = vexInstance.rootEl = document.createElement('div')
	    rootEl.classList.add(baseClassNames.vex)
	    addClasses(rootEl, options.className)
	
	    // Overlay
	    var overlayEl = vexInstance.overlayEl = document.createElement('div')
	    overlayEl.classList.add(baseClassNames.overlay)
	    addClasses(overlayEl, options.overlayClassName)
	    if (options.overlayClosesOnClick) {
	      overlayEl.addEventListener('click', function overlayClickListener (e) {
	        if (e.target === overlayEl) {
	          vexInstance.close()
	        }
	      })
	    }
	    rootEl.appendChild(overlayEl)
	
	    // Content
	    var contentEl = vexInstance.contentEl = document.createElement('div')
	    contentEl.classList.add(baseClassNames.content)
	    addClasses(contentEl, options.contentClassName)
	    contentEl.appendChild(options.content instanceof window.Node ? options.content : domify(options.content))
	    rootEl.appendChild(contentEl)
	
	    // Close button
	    if (options.showCloseButton) {
	      var closeEl = vexInstance.closeEl = document.createElement('div')
	      closeEl.classList.add(baseClassNames.close)
	      addClasses(closeEl, options.closeClassName)
	      closeEl.addEventListener('click', vexInstance.close.bind(vexInstance))
	      contentEl.appendChild(closeEl)
	    }
	
	    // Add to DOM
	    document.querySelector(options.appendLocation).appendChild(rootEl)
	
	    // Call after open callback
	    if (options.afterOpen) {
	      options.afterOpen.call(vexInstance)
	    }
	
	    // Apply styling to the body
	    document.body.classList.add(baseClassNames.open)
	
	    // Return the created vex instance
	    return vexInstance
	  },
	
	  // A top-level vex.close function to close dialogs by reference or id
	  close: function close (vexOrId) {
	    var id
	    if (vexOrId.id) {
	      id = vexOrId.id
	    } else if (typeof vexOrId === 'string') {
	      id = vexOrId
	    } else {
	      throw new TypeError('close requires a vex object or id string')
	    }
	    if (!vexes[id]) {
	      return false
	    }
	    return vexes[id].close()
	  },
	
	  // Close the most recently created/opened vex
	  closeTop: function closeTop () {
	    var ids = Object.keys(vexes)
	    if (!ids.length) {
	      return false
	    }
	    return vexes[ids[ids.length - 1]].close()
	  },
	
	  // Close every vex!
	  closeAll: function closeAll () {
	    for (var id in vexes) {
	      this.close(id)
	    }
	    return true
	  },
	
	  // A getter for the internal lookup table
	  getAll: function getAll () {
	    return vexes
	  },
	
	  // A getter for the internal lookup table
	  getById: function getById (id) {
	    return vexes[id]
	  }
	}
	
	// Close top vex on escape
	window.addEventListener('keyup', function vexKeyupListener (e) {
	  if (e.keyCode === 27) {
	    isEscapeActive = true
	    vex.closeTop()
	    isEscapeActive = false
	  }
	})
	// Close all vexes on history pop state (useful in single page apps)
	window.addEventListener('popstate', vex.closeAll)
	
	vex.defaultOptions = {
	  content: '',
	  showCloseButton: true,
	  escapeButtonCloses: true,
	  overlayClosesOnClick: true,
	  appendLocation: 'body',
	  className: '',
	  overlayClassName: '',
	  contentClassName: '',
	  closeClassName: ''
	}
	
	// TODO Loading symbols?
	
	// Include escapeHtml function on the library object
	Object.defineProperty(vex, '_escapeHtml', {
	  configurable: false,
	  enumerable: false,
	  writable: false,
	  value: escapeHtml
	})
	
	// Plugin system!
	vex.registerPlugin = function registerPlugin (pluginFn, name) {
	  var plugin = pluginFn(vex)
	  var pluginName = name || plugin.name
	  if (vex[pluginName]) {
	    throw new Error('Plugin ' + name + ' is already registered.')
	  }
	  vex[pluginName] = plugin
	}
	
	module.exports = vex
	
	},{"classlist-polyfill":1,"domify":2,"es6-object-assign":3}]},{},[4])(4)
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vexDialog = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	
	/**
	 * Expose `parse`.
	 */
	
	module.exports = parse;
	
	/**
	 * Tests for browser support.
	 */
	
	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}
	
	/**
	 * Wrap map from jquery.
	 */
	
	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};
	
	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];
	
	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];
	
	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */
	
	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');
	
	  // default to the global `document` object
	  if (!doc) doc = document;
	
	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);
	
	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace
	
	  var tag = m[1];
	
	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }
	
	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;
	
	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }
	
	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }
	
	  return fragment;
	}
	
	},{}],2:[function(require,module,exports){
	// get successful control from form and assemble into object
	// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2
	
	// types which indicate a submit action and are not successful controls
	// these will be ignored
	var k_r_submitter = /^(?:submit|button|image|reset|file)$/i;
	
	// node names which could be successful controls
	var k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;
	
	// Matches bracket notation.
	var brackets = /(\[[^\[\]]*\])/g;
	
	// serializes form fields
	// @param form MUST be an HTMLForm element
	// @param options is an optional argument to configure the serialization. Default output
	// with no options specified is a url encoded string
	//    - hash: [true | false] Configure the output type. If true, the output will
	//    be a js object.
	//    - serializer: [function] Optional serializer function to override the default one.
	//    The function takes 3 arguments (result, key, value) and should return new result
	//    hash and url encoded str serializers are provided with this module
	//    - disabled: [true | false]. If true serialize disabled fields.
	//    - empty: [true | false]. If true serialize empty fields
	function serialize(form, options) {
	    if (typeof options != 'object') {
	        options = { hash: !!options };
	    }
	    else if (options.hash === undefined) {
	        options.hash = true;
	    }
	
	    var result = (options.hash) ? {} : '';
	    var serializer = options.serializer || ((options.hash) ? hash_serializer : str_serialize);
	
	    var elements = form && form.elements ? form.elements : [];
	
	    //Object store each radio and set if it's empty or not
	    var radio_store = Object.create(null);
	
	    for (var i=0 ; i<elements.length ; ++i) {
	        var element = elements[i];
	
	        // ingore disabled fields
	        if ((!options.disabled && element.disabled) || !element.name) {
	            continue;
	        }
	        // ignore anyhting that is not considered a success field
	        if (!k_r_success_contrls.test(element.nodeName) ||
	            k_r_submitter.test(element.type)) {
	            continue;
	        }
	
	        var key = element.name;
	        var val = element.value;
	
	        // we can't just use element.value for checkboxes cause some browsers lie to us
	        // they say "on" for value when the box isn't checked
	        if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
	            val = undefined;
	        }
	
	        // If we want empty elements
	        if (options.empty) {
	            // for checkbox
	            if (element.type === 'checkbox' && !element.checked) {
	                val = '';
	            }
	
	            // for radio
	            if (element.type === 'radio') {
	                if (!radio_store[element.name] && !element.checked) {
	                    radio_store[element.name] = false;
	                }
	                else if (element.checked) {
	                    radio_store[element.name] = true;
	                }
	            }
	
	            // if options empty is true, continue only if its radio
	            if (!val && element.type == 'radio') {
	                continue;
	            }
	        }
	        else {
	            // value-less fields are ignored unless options.empty is true
	            if (!val) {
	                continue;
	            }
	        }
	
	        // multi select boxes
	        if (element.type === 'select-multiple') {
	            val = [];
	
	            var selectOptions = element.options;
	            var isSelectedOptions = false;
	            for (var j=0 ; j<selectOptions.length ; ++j) {
	                var option = selectOptions[j];
	                var allowedEmpty = options.empty && !option.value;
	                var hasValue = (option.value || allowedEmpty);
	                if (option.selected && hasValue) {
	                    isSelectedOptions = true;
	
	                    // If using a hash serializer be sure to add the
	                    // correct notation for an array in the multi-select
	                    // context. Here the name attribute on the select element
	                    // might be missing the trailing bracket pair. Both names
	                    // "foo" and "foo[]" should be arrays.
	                    if (options.hash && key.slice(key.length - 2) !== '[]') {
	                        result = serializer(result, key + '[]', option.value);
	                    }
	                    else {
	                        result = serializer(result, key, option.value);
	                    }
	                }
	            }
	
	            // Serialize if no selected options and options.empty is true
	            if (!isSelectedOptions && options.empty) {
	                result = serializer(result, key, '');
	            }
	
	            continue;
	        }
	
	        result = serializer(result, key, val);
	    }
	
	    // Check for all empty radio buttons and serialize them with key=""
	    if (options.empty) {
	        for (var key in radio_store) {
	            if (!radio_store[key]) {
	                result = serializer(result, key, '');
	            }
	        }
	    }
	
	    return result;
	}
	
	function parse_keys(string) {
	    var keys = [];
	    var prefix = /^([^\[\]]*)/;
	    var children = new RegExp(brackets);
	    var match = prefix.exec(string);
	
	    if (match[1]) {
	        keys.push(match[1]);
	    }
	
	    while ((match = children.exec(string)) !== null) {
	        keys.push(match[1]);
	    }
	
	    return keys;
	}
	
	function hash_assign(result, keys, value) {
	    if (keys.length === 0) {
	        result = value;
	        return result;
	    }
	
	    var key = keys.shift();
	    var between = key.match(/^\[(.+?)\]$/);
	
	    if (key === '[]') {
	        result = result || [];
	
	        if (Array.isArray(result)) {
	            result.push(hash_assign(null, keys, value));
	        }
	        else {
	            // This might be the result of bad name attributes like "[][foo]",
	            // in this case the original `result` object will already be
	            // assigned to an object literal. Rather than coerce the object to
	            // an array, or cause an exception the attribute "_values" is
	            // assigned as an array.
	            result._values = result._values || [];
	            result._values.push(hash_assign(null, keys, value));
	        }
	
	        return result;
	    }
	
	    // Key is an attribute name and can be assigned directly.
	    if (!between) {
	        result[key] = hash_assign(result[key], keys, value);
	    }
	    else {
	        var string = between[1];
	        // +var converts the variable into a number
	        // better than parseInt because it doesn't truncate away trailing
	        // letters and actually fails if whole thing is not a number
	        var index = +string;
	
	        // If the characters between the brackets is not a number it is an
	        // attribute name and can be assigned directly.
	        if (isNaN(index)) {
	            result = result || {};
	            result[string] = hash_assign(result[string], keys, value);
	        }
	        else {
	            result = result || [];
	            result[index] = hash_assign(result[index], keys, value);
	        }
	    }
	
	    return result;
	}
	
	// Object/hash encoding serializer.
	function hash_serializer(result, key, value) {
	    var matches = key.match(brackets);
	
	    // Has brackets? Use the recursive assignment function to walk the keys,
	    // construct any missing objects in the result tree and make the assignment
	    // at the end of the chain.
	    if (matches) {
	        var keys = parse_keys(key);
	        hash_assign(result, keys, value);
	    }
	    else {
	        // Non bracket notation can make assignments directly.
	        var existing = result[key];
	
	        // If the value has been assigned already (for instance when a radio and
	        // a checkbox have the same name attribute) convert the previous value
	        // into an array before pushing into it.
	        //
	        // NOTE: If this requirement were removed all hash creation and
	        // assignment could go through `hash_assign`.
	        if (existing) {
	            if (!Array.isArray(existing)) {
	                result[key] = [ existing ];
	            }
	
	            result[key].push(value);
	        }
	        else {
	            result[key] = value;
	        }
	    }
	
	    return result;
	}
	
	// urlform encoding serializer
	function str_serialize(result, key, value) {
	    // encode newlines as \r\n cause the html spec says so
	    value = value.replace(/(\r)?\n/g, '\r\n');
	    value = encodeURIComponent(value);
	
	    // spaces should be '+' rather than '%20'.
	    value = value.replace(/%20/g, '+');
	    return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
	}
	
	module.exports = serialize;
	
	},{}],3:[function(require,module,exports){
	var domify = require('domify')
	var serialize = require('form-serialize')
	
	// Build DOM elements for the structure of the dialog
	var buildDialogForm = function buildDialogForm (options) {
	  var form = document.createElement('form')
	  form.classList.add('vex-dialog-form')
	
	  var message = document.createElement('div')
	  message.classList.add('vex-dialog-message')
	  message.appendChild(options.message instanceof window.Node ? options.message : domify(options.message))
	
	  var input = document.createElement('div')
	  input.classList.add('vex-dialog-input')
	  input.appendChild(options.input instanceof window.Node ? options.input : domify(options.input))
	
	  form.appendChild(message)
	  form.appendChild(input)
	
	  return form
	}
	
	// Take an array of buttons (see the default buttons below) and turn them into DOM elements
	var buttonsToDOM = function buttonsToDOM (buttons) {
	  var domButtons = document.createElement('div')
	  domButtons.classList.add('vex-dialog-buttons')
	
	  for (var i = 0; i < buttons.length; i++) {
	    var button = buttons[i]
	    var domButton = document.createElement('button')
	    domButton.type = button.type
	    domButton.textContent = button.text
	    domButton.classList.add(button.className)
	    domButton.classList.add('vex-dialog-button')
	    if (i === 0) {
	      domButton.classList.add('vex-first')
	    } else if (i === buttons.length - 1) {
	      domButton.classList.add('vex-last')
	    }
	    // Attach click listener to button with closure
	    (function (button) {
	      domButton.addEventListener('click', function (e) {
	        if (button.click) {
	          button.click.call(this, e)
	        }
	      }.bind(this))
	    }.bind(this)(button))
	
	    domButtons.appendChild(domButton)
	  }
	
	  return domButtons
	}
	
	var plugin = function plugin (vex) {
	  // Define the API first
	  var dialog = {
	    // Plugin name
	    name: 'dialog',
	
	    // Open
	    open: function open (opts) {
	      var options = Object.assign({}, this.defaultOptions, opts)
	
	      // `message` is unsafe internally, so translate
	      // safe default: HTML-escape the message before passing it through
	      if (options.unsafeMessage && !options.message) {
	        options.message = options.unsafeMessage
	      } else if (options.message) {
	        options.message = vex._escapeHtml(options.message)
	      }
	
	      // Build the form from the options
	      var form = options.unsafeContent = buildDialogForm(options)
	
	      // Open the dialog
	      var dialogInstance = vex.open(options)
	
	      // Quick comment - these options and appending buttons and everything
	      // would preferably be done _before_ opening the dialog. However, since
	      // they rely on the context of the vex instance, we have to do them
	      // after. A potential future fix would be to differentiate between
	      // a "created" vex instance and an "opened" vex instance, so any actions
	      // that rely on the specific context of the instance can do their stuff
	      // before opening the dialog on the page.
	
	      // Override the before close callback to also pass the value of the form
	      var beforeClose = options.beforeClose && options.beforeClose.bind(dialogInstance)
	      dialogInstance.options.beforeClose = function dialogBeforeClose () {
	        // Only call the callback once - when the validation in beforeClose, if present, is true
	        var shouldClose = beforeClose ? beforeClose() : true
	        if (shouldClose) {
	          options.callback(this.value || false)
	        }
	        // Return the result of beforeClose() to vex
	        return shouldClose
	      }.bind(dialogInstance)
	
	      // Append buttons to form with correct context
	      form.appendChild(buttonsToDOM.call(dialogInstance, options.buttons))
	
	      // Attach form to instance
	      dialogInstance.form = form
	
	      // Add submit listener to form
	      form.addEventListener('submit', options.onSubmit.bind(dialogInstance))
	
	      // Optionally focus the first input in the form
	      if (options.focusFirstInput) {
	        var el = dialogInstance.contentEl.querySelector('button, input, textarea')
	        if (el) {
	          el.focus()
	        }
	      }
	
	      // For chaining
	      return dialogInstance
	    },
	
	    // Alert
	    alert: function (options) {
	      // Allow string as message
	      if (typeof options === 'string') {
	        options = {
	          message: options
	        }
	      }
	      options = Object.assign({}, this.defaultOptions, this.defaultAlertOptions, options)
	      return this.open(options)
	    },
	
	    // Confirm
	    confirm: function (options) {
	      if (typeof options !== 'object' || typeof options.callback !== 'function') {
	        throw new Error('dialog.confirm(options) requires options.callback.')
	      }
	      options = Object.assign({}, this.defaultOptions, this.defaultConfirmOptions, options)
	      return this.open(options)
	    },
	
	    // Prompt
	    prompt: function (options) {
	      if (typeof options !== 'object' || typeof options.callback !== 'function') {
	        throw new Error('dialog.prompt(options) requires options.callback.')
	      }
	      var defaults = Object.assign({}, this.defaultOptions, this.defaultPromptOptions)
	      var dynamicDefaults = {
	        unsafeMessage: '<label for="vex">' + vex._escapeHtml(options.label || defaults.label) + '</label>',
	        input: '<input name="vex" type="text" class="vex-dialog-prompt-input" placeholder="' + vex._escapeHtml(options.placeholder || defaults.placeholder) + '" value="' + vex._escapeHtml(options.value || defaults.value) + '" />'
	      }
	      options = Object.assign(defaults, dynamicDefaults, options)
	      // Pluck the value of the "vex" input field as the return value for prompt's callback
	      // More closely mimics "window.prompt" in that a single string is returned
	      var callback = options.callback
	      options.callback = function promptCallback (value) {
	        value = value[Object.keys(value)[0]]
	        callback(value)
	      }
	      return this.open(options)
	    }
	  }
	
	  // Now define any additional data that's not the direct dialog API
	  dialog.buttons = {
	    YES: {
	      text: 'OK',
	      type: 'submit',
	      className: 'vex-dialog-button-primary',
	      click: function yesClick () {
	        this.value = true
	      }
	    },
	
	    NO: {
	      text: 'Cancel',
	      type: 'button',
	      className: 'vex-dialog-button-secondary',
	      click: function noClick () {
	        this.value = false
	        this.close()
	      }
	    }
	  }
	
	  dialog.defaultOptions = {
	    callback: function () {},
	    afterOpen: function () {},
	    message: '',
	    input: '',
	    buttons: [
	      dialog.buttons.YES,
	      dialog.buttons.NO
	    ],
	    showCloseButton: false,
	    onSubmit: function onDialogSubmit (e) {
	      e.preventDefault()
	      if (this.options.input) {
	        this.value = serialize(this.form, { hash: true })
	      }
	      return this.close()
	    },
	    focusFirstInput: true
	  }
	
	  dialog.defaultAlertOptions = {
	    buttons: [
	      dialog.buttons.YES
	    ]
	  }
	
	  dialog.defaultPromptOptions = {
	    label: 'Prompt:',
	    placeholder: '',
	    value: ''
	  }
	
	  dialog.defaultConfirmOptions = {}
	
	  return dialog
	}
	
	module.exports = plugin
	
	},{"domify":1,"form-serialize":2}]},{},[3])(3)
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./vex.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./vex.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, "@keyframes vex-fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-webkit-keyframes vex-fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-moz-keyframes vex-fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-ms-keyframes vex-fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-o-keyframes vex-fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes vex-fadeout {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@-webkit-keyframes vex-fadeout {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@-moz-keyframes vex-fadeout {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@-ms-keyframes vex-fadeout {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@-o-keyframes vex-fadeout {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@keyframes vex-rotation {\n  0% {\n    transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    -ms-transform: rotate(0deg);\n    -o-transform: rotate(0deg); }\n  100% {\n    transform: rotate(359deg);\n    -webkit-transform: rotate(359deg);\n    -moz-transform: rotate(359deg);\n    -ms-transform: rotate(359deg);\n    -o-transform: rotate(359deg); } }\n\n@-webkit-keyframes vex-rotation {\n  0% {\n    transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    -ms-transform: rotate(0deg);\n    -o-transform: rotate(0deg); }\n  100% {\n    transform: rotate(359deg);\n    -webkit-transform: rotate(359deg);\n    -moz-transform: rotate(359deg);\n    -ms-transform: rotate(359deg);\n    -o-transform: rotate(359deg); } }\n\n@-moz-keyframes vex-rotation {\n  0% {\n    transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    -ms-transform: rotate(0deg);\n    -o-transform: rotate(0deg); }\n  100% {\n    transform: rotate(359deg);\n    -webkit-transform: rotate(359deg);\n    -moz-transform: rotate(359deg);\n    -ms-transform: rotate(359deg);\n    -o-transform: rotate(359deg); } }\n\n@-ms-keyframes vex-rotation {\n  0% {\n    transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    -ms-transform: rotate(0deg);\n    -o-transform: rotate(0deg); }\n  100% {\n    transform: rotate(359deg);\n    -webkit-transform: rotate(359deg);\n    -moz-transform: rotate(359deg);\n    -ms-transform: rotate(359deg);\n    -o-transform: rotate(359deg); } }\n\n@-o-keyframes vex-rotation {\n  0% {\n    transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    -ms-transform: rotate(0deg);\n    -o-transform: rotate(0deg); }\n  100% {\n    transform: rotate(359deg);\n    -webkit-transform: rotate(359deg);\n    -moz-transform: rotate(359deg);\n    -ms-transform: rotate(359deg);\n    -o-transform: rotate(359deg); } }\n\n.vex, .vex *, .vex *:before, .vex *:after {\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.vex {\n  position: fixed;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  z-index: 1111;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n\n.vex-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n.vex-overlay {\n  background: #000;\n  filter: alpha(opacity=40);\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=40)\"; }\n\n.vex-overlay {\n  animation: vex-fadein 0.5s;\n  -webkit-animation: vex-fadein 0.5s;\n  -moz-animation: vex-fadein 0.5s;\n  -ms-animation: vex-fadein 0.5s;\n  -o-animation: vex-fadein 0.5s;\n  -webkit-backface-visibility: hidden;\n  position: fixed;\n  background: rgba(0, 0, 0, 0.4);\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n  .vex.vex-closing .vex-overlay {\n    animation: vex-fadeout 0.5s;\n    -webkit-animation: vex-fadeout 0.5s;\n    -moz-animation: vex-fadeout 0.5s;\n    -ms-animation: vex-fadeout 0.5s;\n    -o-animation: vex-fadeout 0.5s;\n    -webkit-backface-visibility: hidden; }\n\n.vex-content {\n  animation: vex-fadein 0.5s;\n  -webkit-animation: vex-fadein 0.5s;\n  -moz-animation: vex-fadein 0.5s;\n  -ms-animation: vex-fadein 0.5s;\n  -o-animation: vex-fadein 0.5s;\n  -webkit-backface-visibility: hidden;\n  background: #fff; }\n  .vex.vex-closing .vex-content {\n    animation: vex-fadeout 0.5s;\n    -webkit-animation: vex-fadeout 0.5s;\n    -moz-animation: vex-fadeout 0.5s;\n    -ms-animation: vex-fadeout 0.5s;\n    -o-animation: vex-fadeout 0.5s;\n    -webkit-backface-visibility: hidden; }\n\n.vex-close:before {\n  font-family: Arial, sans-serif;\n  content: \"\\D7\"; }\n\n.vex-dialog-form {\n  margin: 0; }\n\n.vex-dialog-button {\n  text-rendering: optimizeLegibility;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent; }\n\n.vex-loading-spinner {\n  animation: vex-rotation 0.7s linear infinite;\n  -webkit-animation: vex-rotation 0.7s linear infinite;\n  -moz-animation: vex-rotation 0.7s linear infinite;\n  -ms-animation: vex-rotation 0.7s linear infinite;\n  -o-animation: vex-rotation 0.7s linear infinite;\n  -webkit-backface-visibility: hidden;\n  -moz-box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);\n  -webkit-box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);\n  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);\n  position: fixed;\n  z-index: 1112;\n  margin: auto;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 2em;\n  width: 2em;\n  background: #fff; }\n\nbody.vex-open {\n  overflow: hidden; }\n", ""]);
	
	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./vex-theme-top.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./vex-theme-top.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, "@keyframes vex-dropin {\n  0% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    opacity: 0; }\n  1% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px);\n    opacity: 0; }\n  2% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px);\n    opacity: 1; }\n  100% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    opacity: 1; } }\n\n@-webkit-keyframes vex-dropin {\n  0% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    opacity: 0; }\n  1% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px);\n    opacity: 0; }\n  2% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px);\n    opacity: 1; }\n  100% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    opacity: 1; } }\n\n@-moz-keyframes vex-dropin {\n  0% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    opacity: 0; }\n  1% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px);\n    opacity: 0; }\n  2% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px);\n    opacity: 1; }\n  100% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    opacity: 1; } }\n\n@-ms-keyframes vex-dropin {\n  0% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    opacity: 0; }\n  1% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px);\n    opacity: 0; }\n  2% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px);\n    opacity: 1; }\n  100% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    opacity: 1; } }\n\n@-o-keyframes vex-dropin {\n  0% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    opacity: 0; }\n  1% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px);\n    opacity: 0; }\n  2% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px);\n    opacity: 1; }\n  100% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    opacity: 1; } }\n\n@keyframes vex-dropout {\n  0% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0); }\n  100% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px); } }\n\n@-webkit-keyframes vex-dropout {\n  0% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0); }\n  100% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px); } }\n\n@-moz-keyframes vex-dropout {\n  0% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0); }\n  100% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px); } }\n\n@-ms-keyframes vex-dropout {\n  0% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0); }\n  100% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px); } }\n\n@-o-keyframes vex-dropout {\n  0% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0); }\n  100% {\n    transform: translateY(-800px);\n    -webkit-transform: translateY(-800px);\n    -moz-transform: translateY(-800px);\n    -ms-transform: translateY(-800px);\n    -o-transform: translateY(-800px); } }\n\n@keyframes vex-pulse {\n  0% {\n    -moz-box-shadow: inset 0 0 0 300px transparent;\n    -webkit-box-shadow: inset 0 0 0 300px transparent;\n    box-shadow: inset 0 0 0 300px transparent; }\n  70% {\n    -moz-box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25);\n    -webkit-box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25);\n    box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25); }\n  100% {\n    -moz-box-shadow: inset 0 0 0 300px transparent;\n    -webkit-box-shadow: inset 0 0 0 300px transparent;\n    box-shadow: inset 0 0 0 300px transparent; } }\n\n@-webkit-keyframes vex-pulse {\n  0% {\n    -moz-box-shadow: inset 0 0 0 300px transparent;\n    -webkit-box-shadow: inset 0 0 0 300px transparent;\n    box-shadow: inset 0 0 0 300px transparent; }\n  70% {\n    -moz-box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25);\n    -webkit-box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25);\n    box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25); }\n  100% {\n    -moz-box-shadow: inset 0 0 0 300px transparent;\n    -webkit-box-shadow: inset 0 0 0 300px transparent;\n    box-shadow: inset 0 0 0 300px transparent; } }\n\n@-moz-keyframes vex-pulse {\n  0% {\n    -moz-box-shadow: inset 0 0 0 300px transparent;\n    -webkit-box-shadow: inset 0 0 0 300px transparent;\n    box-shadow: inset 0 0 0 300px transparent; }\n  70% {\n    -moz-box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25);\n    -webkit-box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25);\n    box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25); }\n  100% {\n    -moz-box-shadow: inset 0 0 0 300px transparent;\n    -webkit-box-shadow: inset 0 0 0 300px transparent;\n    box-shadow: inset 0 0 0 300px transparent; } }\n\n@-ms-keyframes vex-pulse {\n  0% {\n    -moz-box-shadow: inset 0 0 0 300px transparent;\n    -webkit-box-shadow: inset 0 0 0 300px transparent;\n    box-shadow: inset 0 0 0 300px transparent; }\n  70% {\n    -moz-box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25);\n    -webkit-box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25);\n    box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25); }\n  100% {\n    -moz-box-shadow: inset 0 0 0 300px transparent;\n    -webkit-box-shadow: inset 0 0 0 300px transparent;\n    box-shadow: inset 0 0 0 300px transparent; } }\n\n@-o-keyframes vex-pulse {\n  0% {\n    -moz-box-shadow: inset 0 0 0 300px transparent;\n    -webkit-box-shadow: inset 0 0 0 300px transparent;\n    box-shadow: inset 0 0 0 300px transparent; }\n  70% {\n    -moz-box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25);\n    -webkit-box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25);\n    box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.25); }\n  100% {\n    -moz-box-shadow: inset 0 0 0 300px transparent;\n    -webkit-box-shadow: inset 0 0 0 300px transparent;\n    box-shadow: inset 0 0 0 300px transparent; } }\n\n.vex.vex-theme-top.vex-closing .vex-content {\n  animation: vex-dropout 0.5s;\n  -webkit-animation: vex-dropout 0.5s;\n  -moz-animation: vex-dropout 0.5s;\n  -ms-animation: vex-dropout 0.5s;\n  -o-animation: vex-dropout 0.5s;\n  -webkit-backface-visibility: hidden; }\n\n.vex.vex-theme-top .vex-content {\n  animation: vex-dropin 0.5s;\n  -webkit-animation: vex-dropin 0.5s;\n  -moz-animation: vex-dropin 0.5s;\n  -ms-animation: vex-dropin 0.5s;\n  -o-animation: vex-dropin 0.5s;\n  -webkit-backface-visibility: hidden; }\n\n.vex.vex-theme-top .vex-content {\n  -moz-border-radius: 0 0 5px 5px;\n  -webkit-border-radius: 0 0 5px 5px;\n  border-radius: 0 0 5px 5px;\n  font-family: \"Helvetica Neue\", sans-serif;\n  background: #f0f0f0;\n  color: #444;\n  padding: 1em;\n  position: relative;\n  margin: 0 auto;\n  max-width: 100%;\n  width: 450px;\n  font-size: 1.1em;\n  line-height: 1.5em; }\n  .vex.vex-theme-top .vex-content h1, .vex.vex-theme-top .vex-content h2, .vex.vex-theme-top .vex-content h3, .vex.vex-theme-top .vex-content h4, .vex.vex-theme-top .vex-content h5, .vex.vex-theme-top .vex-content h6, .vex.vex-theme-top .vex-content p, .vex.vex-theme-top .vex-content ul, .vex.vex-theme-top .vex-content li {\n    color: inherit; }\n\n.vex.vex-theme-top .vex-close {\n  -moz-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  cursor: pointer; }\n  .vex.vex-theme-top .vex-close:before {\n    -moz-border-radius: 3px;\n    -webkit-border-radius: 3px;\n    border-radius: 3px;\n    position: absolute;\n    content: \"\\D7\";\n    font-size: 26px;\n    font-weight: normal;\n    line-height: 31px;\n    height: 30px;\n    width: 30px;\n    text-align: center;\n    top: 3px;\n    right: 3px;\n    color: #bbb;\n    background: transparent; }\n  .vex.vex-theme-top .vex-close:hover:before, .vex.vex-theme-top .vex-close:active:before {\n    color: #777;\n    background: #e0e0e0; }\n\n.vex.vex-theme-top .vex-dialog-form .vex-dialog-message {\n  margin-bottom: .5em; }\n\n.vex.vex-theme-top .vex-dialog-form .vex-dialog-input {\n  margin-bottom: 1em; }\n  .vex.vex-theme-top .vex-dialog-form .vex-dialog-input textarea, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"date\"], .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"datetime\"], .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"datetime-local\"], .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"email\"], .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"month\"], .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"number\"], .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"password\"], .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"search\"], .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"tel\"], .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"text\"], .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"time\"], .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"url\"], .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"week\"] {\n    -moz-border-radius: 3px;\n    -webkit-border-radius: 3px;\n    border-radius: 3px;\n    background: #fff;\n    width: 100%;\n    padding: .25em .67em;\n    border: 0;\n    font-family: inherit;\n    font-weight: inherit;\n    font-size: inherit;\n    min-height: 2.5em;\n    margin: 0 0 .25em; }\n    .vex.vex-theme-top .vex-dialog-form .vex-dialog-input textarea:focus, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"date\"]:focus, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"datetime\"]:focus, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"datetime-local\"]:focus, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"email\"]:focus, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"month\"]:focus, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"number\"]:focus, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"password\"]:focus, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"search\"]:focus, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"tel\"]:focus, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"text\"]:focus, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"time\"]:focus, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"url\"]:focus, .vex.vex-theme-top .vex-dialog-form .vex-dialog-input input[type=\"week\"]:focus {\n      -moz-box-shadow: inset 0 0 0 2px #8dbdf1;\n      -webkit-box-shadow: inset 0 0 0 2px #8dbdf1;\n      box-shadow: inset 0 0 0 2px #8dbdf1;\n      outline: none; }\n\n.vex.vex-theme-top .vex-dialog-form .vex-dialog-buttons {\n  *zoom: 1; }\n  .vex.vex-theme-top .vex-dialog-form .vex-dialog-buttons:after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.vex.vex-theme-top .vex-dialog-button {\n  -moz-border-radius: 3px;\n  -webkit-border-radius: 3px;\n  border-radius: 3px;\n  border: 0;\n  float: right;\n  margin: 0 0 0 .5em;\n  font-family: inherit;\n  text-transform: uppercase;\n  letter-spacing: .1em;\n  font-size: .8em;\n  line-height: 1em;\n  padding: .75em 2em; }\n  .vex.vex-theme-top .vex-dialog-button.vex-last {\n    margin-left: 0; }\n  .vex.vex-theme-top .vex-dialog-button:focus {\n    animation: vex-pulse 1.1s infinite;\n    -webkit-animation: vex-pulse 1.1s infinite;\n    -moz-animation: vex-pulse 1.1s infinite;\n    -ms-animation: vex-pulse 1.1s infinite;\n    -o-animation: vex-pulse 1.1s infinite;\n    -webkit-backface-visibility: hidden;\n    outline: none; }\n    @media (max-width: 568px) {\n      .vex.vex-theme-top .vex-dialog-button:focus {\n        animation: none;\n        -webkit-animation: none;\n        -moz-animation: none;\n        -ms-animation: none;\n        -o-animation: none;\n        -webkit-backface-visibility: hidden; } }\n  .vex.vex-theme-top .vex-dialog-button.vex-dialog-button-primary {\n    background: #3288e6;\n    color: #fff; }\n  .vex.vex-theme-top .vex-dialog-button.vex-dialog-button-secondary {\n    background: #e0e0e0;\n    color: #777; }\n\n.vex-loading-spinner.vex-theme-top {\n  -moz-box-shadow: 0 0 0 0.5em #f0f0f0, 0 0 1px 0.5em rgba(0, 0, 0, 0.3);\n  -webkit-box-shadow: 0 0 0 0.5em #f0f0f0, 0 0 1px 0.5em rgba(0, 0, 0, 0.3);\n  box-shadow: 0 0 0 0.5em #f0f0f0, 0 0 1px 0.5em rgba(0, 0, 0, 0.3);\n  -moz-border-radius: 100%;\n  -webkit-border-radius: 100%;\n  border-radius: 100%;\n  background: #f0f0f0;\n  border: .2em solid transparent;\n  border-top-color: #bbb;\n  top: -1.1em;\n  bottom: auto; }\n", ""]);
	
	// exports


/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.js.map