(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("waddup"));
	else if(typeof define === 'function' && define.amd)
		define("Qonductor", ["waddup"], factory);
	else if(typeof exports === 'object')
		exports["Qonductor"] = factory(require("waddup"));
	else
		root["Qonductor"] = factory(root["waddup"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_17__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * @constant {Object} DEFAULTS
 */
var DEFAULTS = exports.DEFAULTS = {
  autoStart: true,
  keepHistory: true,
  maxConcurrency: 10,
  type: 'fifo'
};

/**
 * @constant {Object} STATUSES
 */
var STATUSES = exports.STATUSES = {
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
  RUNNING: 'RUNNING'
};

/**
 * @constant {Object} TYPES
 */
var TYPES = exports.TYPES = {
  FIFO: 'fifo',
  LIFO: 'lifo',
  SIRO: 'siro'
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(2),
    isObject = __webpack_require__(11);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(3),
    getRawTag = __webpack_require__(9),
    objectToString = __webpack_require__(10);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(6);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isFunction = __webpack_require__(1);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isPlainObject = __webpack_require__(12);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _QueueItem = __webpack_require__(16);

var _QueueItem2 = _interopRequireDefault(_QueueItem);

var _constants = __webpack_require__(0);

var _defaults = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // external dependencies


// classes


// constants


// defaults


var Qonductor = function () {
  function Qonductor() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Qonductor);

    this.completed = {};
    this.completedCount = 0;
    this.currentIndex = 0;
    this.isRunning = false;
    this.pending = {};
    this.pendingCount = 0;
    this.queue = {};
    this.running = {};
    this.runningCount = 0;

    var _getDefaults$options = _extends({}, (0, _defaults.getDefaults)(), options),
        type = _getDefaults$options.type,
        directlyAssignedValues = _objectWithoutProperties(_getDefaults$options, ['type']);

    Object.keys(directlyAssignedValues).forEach(function (key) {
      _this[key] = directlyAssignedValues[key];
    });

    this.type = type.toLowerCase();
  }

  /**
   * @private
   *
   * @function _addQueueItemCancel
   * @memberof Qonductor
   * @instance
   *
   * @description
   * add the cancel function to the queueItem
   *
   * @param {object} queueItem
   * @return {function(message): void}
   * @private
   */
  Qonductor.prototype._addQueueItemCancel = function _addQueueItemCancel(queueItem) {
    return function (message) {
      if (queueItem.status === _constants.STATUSES.PENDING || queueItem.status === _constants.STATUSES.RUNNING) {
        queueItem._publishCancellation(message);
      }
    };
  };

  /**
   * @private
   *
   * @function _complete
   * @memberof Qonductor
   * @instance
   *
   * @description
   * remove the queueItem from the running / pending list and
   * move to completed
   *
   * @param {number} index
   * @param {object} queueItem
   * @returns {void}
   */


  Qonductor.prototype._complete = function _complete(index, queueItem) {
    if (!this.completed[index]) {
      if (this.keepHistory) {
        this.completed[index] = queueItem;
      }

      this.completedCount++;
    }

    if (this.running[index]) {
      delete this.running[index];
      this.runningCount--;
    } else if (this.pending[index]) {
      delete this.pending[index];
      this.pendingCount--;
    }

    delete this.queue[index];

    if (this.isRunning && this.pendingCount) {
      return this._runQueue();
    }

    if (!this.runningCount && !this.pendingCount) {
      this.isRunning = false;
    }
  };

  /**
   * @private
   *
   * @function _getNextIndex
   * @memberof Qonductor
   * @instance
   *
   * @description
   * based on the type, return the next index to process
   *
   * @param {array<string>} keys
   * @param {string} type
   * @return {string}
   * @private
   */


  Qonductor.prototype._getNextIndex = function _getNextIndex(keys, type) {
    if (!keys.length) {
      return -1;
    }

    switch (type) {
      case _constants.TYPES.LIFO:
        return Math.max.apply(this, keys);

      case _constants.TYPES.SIRO:
        return keys[Math.floor(Math.random() * keys.length)];

      default:
        return Math.min.apply(this, keys);
    }
  };

  /**
   * @private
   *
   * @function _runQueue
   * @memberof Qonductor
   * @instance
   *
   * @description
   * run the items in the queue up to the maxConcurrency limit
   *
   * @private
   */


  Qonductor.prototype._runQueue = function _runQueue() {
    var running = this.runningCount;

    while (++running <= this.maxConcurrency) {
      var index = this._getNextIndex(Object.keys(this.pending), this.type);

      if (index === -1) {
        break;
      }

      var queueItem = this.pending[index];

      this.running[index] = queueItem;
      this.runningCount++;

      delete this.pending[index];
      this.pendingCount--;

      queueItem.run();
    }
  };

  /**
   * @function getDefaults
   * @memberof Qonductor
   * @static
   *
   * @description
   * get the global defaults for Qonductor
   *
   * @returns {object}
   */


  /**
   * @function resetDefaults
   * @memberof Qonductor
   * @static
   *
   * @description
   * reset the global defaults for Qonductor
   *
   * @returns {object}
   */


  /**
   * @function setDefaults
   * @memberof Qonductor
   * @static
   *
   * @description
   * set the global defaults for Qonductor
   *
   * @param {object} newDefaults={}
   * @returns {object}
   */
  Qonductor.setDefaults = function setDefaults() {
    var newDefaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!(0, _isPlainObject2.default)(newDefaults)) {
      throw new SyntaxError('Defaults assignment must be passed an object.');
    }

    return (0, _defaults.setDefaults)(newDefaults);
  };

  /**
   * @function add
   * @memberof Qonductor
   * @instance
   *
   * @description
   * add the function to the queue
   *
   * @param {string} id the id to optionally assign
   * @param {function} fn the asynchronous method
   * @return {Promise}
   */


  Qonductor.prototype.add = function add(id, fn) {
    var index = this.currentIndex;

    var queueId = (0, _isFunction2.default)(id) ? index : id;
    var queueFunction = fn || id;

    var queueItem = new _QueueItem2.default(queueId, queueFunction, this._complete.bind(this));

    this.queue[index] = queueItem;

    this.currentIndex++;

    this.pending[index] = queueItem;
    this.pendingCount++;

    queueItem.promise.cancel = this._addQueueItemCancel(queueItem);

    if (this.autoStart && !this.isRunning) {
      this.start();
    }

    return queueItem.promise;
  };

  /**
   * @function clear
   * @memberof Qonductor
   * @instance
   *
   * @description
   * cancel all remaining promises in the queue
   */


  Qonductor.prototype.clear = function clear() {
    var _this2 = this;

    Object.keys(this.queue).forEach(function (key) {
      if (_this2.queue[key].status !== _constants.STATUSES.COMPLETED) {
        _this2.queue[key].promise.cancel();
      }
    });
  };

  /**
   * @function start
   * @memberof Qonductor
   * @instance
   *
   * @description
   * kick off the processing of the queue
   */


  Qonductor.prototype.start = function start() {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    this._runQueue();
  };

  /**
   * @function stop
   * @memberof Qonductor
   * @instance
   *
   * @description
   * stop processing pending queue items
   */


  Qonductor.prototype.stop = function stop() {
    this.isRunning = false;
  };

  return Qonductor;
}();

Qonductor.getDefaults = _defaults.getDefaults;
Qonductor.resetDefaults = _defaults.resetDefaults;
exports.default = Qonductor;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(7);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(3);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(2),
    getPrototype = __webpack_require__(13),
    isObjectLike = __webpack_require__(15);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(14);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isFunction = __webpack_require__(1);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _waddup = __webpack_require__(17);

var _QueueError = __webpack_require__(18);

var _QueueError2 = _interopRequireDefault(_QueueError);

var _constants = __webpack_require__(0);

var _utils = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // external dependencies


// classes


// constants


// utils


/**
 * @class QueueItem
 * @classdesc Item in the queue of promises to be resolved
 */
var QueueItem = function () {
  function QueueItem(id, fn, onComplete) {
    _classCallCheck(this, QueueItem);

    this.cancelId = null;
    this.isCancelled = false;
    this.promiseId = null;
    this.status = _constants.STATUSES.PENDING;

    this.id = id;
    this.promise = this._createPromiseWrapper(fn, (0, _utils.getOnSuccess)(this, onComplete), (0, _utils.getOnFail)(this, onComplete));
  }

  /**
   * @private
   *
   * @function _cancelPromise
   * @memberof QueueItem
   * @instance
   *
   * @description
   * cancel the existing promise, rejecting it with the message provided
   *
   * @param {function} reject
   * @param {string} message
   * @private
   */
  QueueItem.prototype._cancelPromise = function _cancelPromise(reject, message) {
    this.status = _constants.STATUSES.CANCELLED;

    reject(new _QueueError2.default(message, _constants.STATUSES.CANCELLED));
  };

  /**
   * @private
   *
   * @function _createPromiseWrapper
   * @memberof QueueItem
   * @instance
   *
   * @description
   * create the promise wrapper for the function passed
   *
   * @param {function} fn
   * @param {function} onSuccess
   * @param {function} onFail
   * @return {Promise}
   * @private
   */


  QueueItem.prototype._createPromiseWrapper = function _createPromiseWrapper(fn, onSuccess, onFail) {
    var _this = this;

    var queuedFunction = (0, _isFunction2.default)(fn) ? fn : function (done) {
      return done(fn);
    };

    return new Promise(function (resolve, reject) {
      var done = (0, _utils.getDone)(_this._resolvePromise(resolve), _this._rejectPromise(reject));

      _this.cancelId = (0, _waddup.subscribe)(_constants.STATUSES.CANCELLED, function (_ref) {
        var data = _ref.data;

        if (data.id === _this.id) {
          _this.isCancelled = true;

          _this._cancelPromise(reject, data.message);
        }
      });

      _this.promiseId = (0, _waddup.subscribe)(_constants.STATUSES.RUNNING, function (_ref2) {
        var data = _ref2.data;

        if (data.id === _this.id) {
          queuedFunction(done);
          (0, _waddup.unsubscribe)(_this.promiseId);
        }
      });
    }).then(this._getUnsubscribeOnResolve()).catch(this._getUnsubscribeOnReject()).then(onSuccess).catch(onFail);
  };

  /**
   * @private
   *
   * @function _getUnsubscribeOnReject
   * @memberof QueueItem
   * @instance
   *
   * @description
   * unsubscribe the cancellation once the promise is rejected
   *
   * @return {function(error: Error): Promise}
   * @private
   */


  QueueItem.prototype._getUnsubscribeOnReject = function _getUnsubscribeOnReject() {
    var _this2 = this;

    return function (error) {
      (0, _waddup.unsubscribe)(_this2.cancelId);

      return Promise.reject(error);
    };
  };

  /**
   * @private
   *
   * @function _getUnsubscribeOnResolve
   * @memberof QueueItem
   * @instance
   *
   * @description
   * unsubscribe the cancellation once the promise is resolved
   *
   * @return {function(data: any): Promise}
   * @private
   */


  QueueItem.prototype._getUnsubscribeOnResolve = function _getUnsubscribeOnResolve() {
    var _this3 = this;

    return function (data) {
      (0, _waddup.unsubscribe)(_this3.cancelId);

      return data;
    };
  };

  /**
   * @private
   *
   * @function _publishCancellation
   * @memberof QueueItem
   * @instance
   *
   * @description
   * publish the cancellation
   *
   * @param {string} message
   * @private
   */


  QueueItem.prototype._publishCancellation = function _publishCancellation(message) {
    (0, _waddup.publish)(_constants.STATUSES.CANCELLED, {
      id: this.id,
      message: message
    });
  };

  /**
   * @private
   *
   * @function _rejectPromise
   * @memberof QueueItem
   * @instance
   *
   * @description
   * reject the promise with the error provided
   *
   * @param {function} reject
   * @return {function(error: Error): void}
   * @private
   */


  QueueItem.prototype._rejectPromise = function _rejectPromise(reject) {
    var _this4 = this;

    return function (error) {
      if (!_this4.isCancelled) {
        _this4.status = _constants.STATUSES.FAILED;

        reject(new _QueueError2.default(error));
      }
    };
  };

  /**
   * @private
   *
   * @function _resolvePromise
   * @memberof QueueItem
   * @instance
   *
   * @description
   * resolve the promise with the data provided
   *
   * @param {function} resolve
   * @return {function(data: any): void}
   * @private
   */


  QueueItem.prototype._resolvePromise = function _resolvePromise(resolve) {
    var _this5 = this;

    return function (data) {
      if (!_this5.isCancelled) {
        _this5.status = _constants.STATUSES.COMPLETED;

        resolve(data);
      }
    };
  };

  /**
   * @function run
   * @memberof QueueItem
   * @instance
   *
   * @description
   * publish that this queueItem is running
   */


  QueueItem.prototype.run = function run() {
    this.status = _constants.STATUSES.RUNNING;

    (0, _waddup.publish)(_constants.STATUSES.RUNNING, {
      id: this.id,
      message: this.id + ' resolved successfully.'
    });
  };

  return QueueItem;
}();

exports.default = QueueItem;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _CustomError2 = __webpack_require__(19);

var _CustomError3 = _interopRequireDefault(_CustomError2);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // classes


// constants


/**
 * @class QueueError
 * @classdesc the instance of the custom error
 */
var QueueError = function (_CustomError) {
  _inherits(QueueError, _CustomError);

  function QueueError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.STATUSES.FAILED;

    _classCallCheck(this, QueueError);

    return _possibleConstructorReturn(this, _CustomError.call(this, 'Queue promise was rejected with status ' + type + (message ? ': ' : '.') + message));
  }

  return QueueError;
}(_CustomError3.default);

exports.default = QueueError;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class CustomError
 * @classdesc a custom error instance that has its own stack
 */
var CustomError = function (_Error) {
  _inherits(CustomError, _Error);

  function CustomError(message) {
    _classCallCheck(this, CustomError);

    var _this = _possibleConstructorReturn(this, _Error.call(this));

    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      Object.defineProperty(_this, 'stack', {
        value: new Error().stack
      });
    }

    Object.defineProperty(_this, 'message', {
      value: message
    });
    return _this;
  }

  return CustomError;
}(Error);

exports.default = CustomError;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * @function getDone
 *
 * @description
 * get the done function with assigned success / fail actions based
 * on parameters passed to it
 *
 * @param {function} success
 * @param {function} fail
 * @return {function(data: string, error: QueueError): void}
 */
var getDone = exports.getDone = function getDone(success, fail) {
  return function (data, error) {
    if (error) {
      return fail(error);
    }

    return success(data);
  };
};

/**
 * @function getOnFail
 *
 * @description
 * on fail, run the completion function and return a
 * rejected Promise to trigger the next catch
 *
 * @param {QueueItem} queueItem
 * @param {function} onComplete
 * @return {function(error: Error): Promise}
 */
var getOnFail = exports.getOnFail = function getOnFail(queueItem, onComplete) {
  return function (error) {
    onComplete(queueItem.id, queueItem);

    return Promise.reject(error);
  };
};

/**
 * @function getOnSuccess
 *
 * @description
 * on success, run the completion function and return the data
 * to trigger the next then
 *
 * @param {QueueItem} queueItem
 * @param {function} onComplete
 * @return {function(data: any): any}
 */
var getOnSuccess = exports.getOnSuccess = function getOnSuccess(queueItem, onComplete) {
  return function (data) {
    onComplete(queueItem.id, queueItem);

    return data;
  };
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.setDefaults = exports.resetDefaults = exports.getDefaults = exports.currentDefaults = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // constants


var _constants = __webpack_require__(0);

var currentDefaults = exports.currentDefaults = _extends({}, _constants.DEFAULTS);

/**
 * @function getDefaults
 *
 * @description
 * get the current defaults
 *
 * @return {{autoStart: boolean, keepHistory: boolean, maxConcurrency: number, type: string}}
 */
var getDefaults = exports.getDefaults = function getDefaults() {
  return currentDefaults;
};

/**
 * @function resetDefaults
 *
 * @description
 * reset the defaults to their original setting
 *
 * @return {object}
 */
var resetDefaults = exports.resetDefaults = function resetDefaults() {
  exports.currentDefaults = currentDefaults = _extends({}, _constants.DEFAULTS);

  return currentDefaults;
};

/**
 * @function setDefaults
 *
 * @description
 * assign the keys in newDefaults to those in defaults if they exist in defaults
 *
 * @param {object} newDefaults={}
 * @return {{autoStart: boolean, keepHistory: boolean, maxConcurrency: number, type: string}}
 */
var setDefaults = exports.setDefaults = function setDefaults() {
  var newDefaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.keys(newDefaults).reduce(function (mergedDefaults, key) {
    if (_constants.DEFAULTS.hasOwnProperty(key)) {
      mergedDefaults[key] = newDefaults[key];
    }

    return mergedDefaults;
  }, currentDefaults);
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=qonductor.js.map