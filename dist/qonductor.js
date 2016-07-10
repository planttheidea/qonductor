var Qonductor =
/******/ (function(modules) { // webpackBootstrap
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(2);
	
	var _defaults = __webpack_require__(3);
	
	var _QueueItem = __webpack_require__(4);
	
	var _QueueItem2 = _interopRequireDefault(_QueueItem);
	
	var _utils = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Qonductor = function () {
	  function Qonductor() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, Qonductor);
	
	    var _getDefaults2 = (0, _defaults.getDefaults)();
	
	    var defaultAutoStart = _getDefaults2.autoStart;
	    var defaultKeepHistory = _getDefaults2.keepHistory;
	    var defaultMaxConcurrency = _getDefaults2.maxConcurrency;
	    var defaultType = _getDefaults2.type;
	    var _options$autoStart = options.autoStart;
	    var autoStart = _options$autoStart === undefined ? defaultAutoStart : _options$autoStart;
	    var _options$keepHistory = options.keepHistory;
	    var keepHistory = _options$keepHistory === undefined ? defaultKeepHistory : _options$keepHistory;
	    var _options$maxConcurren = options.maxConcurrency;
	    var maxConcurrency = _options$maxConcurren === undefined ? defaultMaxConcurrency : _options$maxConcurren;
	    var _options$type = options.type;
	    var type = _options$type === undefined ? defaultType : _options$type;
	
	
	    Object.assign(this, {
	      autoStart: autoStart,
	      completed: {},
	      completedCount: 0,
	      currentIndex: 0,
	      keepHistory: keepHistory,
	      hasFinished: false,
	      hasStarted: false,
	      maxConcurrency: maxConcurrency,
	      pending: {},
	      pendingCount: 0,
	      queue: {},
	      running: {},
	      runningCount: 0,
	      type: type.toLowerCase()
	    });
	  }
	
	  /**
	   * add the cancel function to the queueItem
	   * 
	   * @param {object} queueItem
	   * @return {function(message): void}
	   * @private
	   */
	
	
	  _createClass(Qonductor, [{
	    key: '_addQueueItemCancel',
	    value: function _addQueueItemCancel(queueItem) {
	      return function (message) {
	        if (queueItem.status === _constants.statuses.PENDING || queueItem.status === _constants.statuses.RUNNING) {
	          queueItem._publishCancellation(message);
	        }
	      };
	    }
	
	    /**
	     * remove the queueItem from the running / pending list and
	     * move to completed
	     * 
	     * @param {number} index
	     * @param {object} queueItem
	     * @private
	     */
	
	  }, {
	    key: '_complete',
	    value: function _complete(index, queueItem) {
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
	
	      if (this.hasStarted && this.pendingCount) {
	        this.start();
	      } else if (!this.runningCount && !this.pendingCount) {
	        this.hasFinished = true;
	      }
	    }
	
	    /**
	     * based on the type, return the next index to process
	     * 
	     * @param {array<string>} keys
	     * @param {string} type
	     * @return {string}
	     * @private
	     */
	
	  }, {
	    key: '_getNextIndex',
	    value: function _getNextIndex(keys, type) {
	      if (!keys.length) {
	        return -1;
	      }
	
	      switch (type) {
	        case _constants.types.LIFO:
	          return Math.max.apply(this, keys);
	
	        case _constants.types.SIRO:
	          return keys[Math.floor(Math.random() * keys.length)];
	
	        default:
	          return Math.min.apply(this, keys);
	      }
	    }
	
	    /**
	     * add the function to the queue
	     * 
	     * @param {function} fn
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'add',
	    value: function add(fn) {
	      var index = this.currentIndex;
	      var queueItem = new _QueueItem2.default(index, fn, this._complete.bind(this));
	
	      this.queue[index] = queueItem;
	
	      this.currentIndex++;
	
	      this.pending[index] = queueItem;
	      this.pendingCount++;
	
	      queueItem.promise.cancel = this._addQueueItemCancel(queueItem);
	
	      if (this.autoStart && this.runningCount < this.maxConcurrency) {
	        this.start();
	      }
	
	      return queueItem.promise;
	    }
	
	    /**
	     * cancel all remaining promises in the queue
	     */
	
	  }, {
	    key: 'clear',
	    value: function clear() {
	      var _this = this;
	
	      Object.keys(this.queue).forEach(function (key) {
	        if (_this.queue[key].status !== _constants.statuses.COMPLETED) {
	          _this.queue[key].promise.cancel();
	        }
	      });
	    }
	
	    /**
	     * get the global defaults for Qonductor
	     *
	     * @returns {object}
	     */
	
	  }, {
	    key: 'start',
	
	
	    /**
	     * kick off the processing of the queue
	     */
	    value: function start() {
	      this.hasStarted = true;
	      this.hasFinished = false;
	
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
	    }
	  }], [{
	    key: 'getDefaults',
	    value: function getDefaults() {
	      return (0, _defaults.getDefaults)();
	    }
	
	    /**
	     * reset the global defaults for Qonductor
	     *
	     * @returns {object}
	     */
	
	  }, {
	    key: 'resetDefaults',
	    value: function resetDefaults() {
	      return (0, _defaults.resetDefaults)();
	    }
	
	    /**
	     * set the global defaults for Qonductor
	     *
	     * @param {object} newDefaults={}
	     * @returns {object}
	     */
	
	  }, {
	    key: 'setDefaults',
	    value: function setDefaults() {
	      var newDefaults = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      if (!(0, _utils.isObject)(newDefaults)) {
	        throw new SyntaxError('Defaults assignment must be passed an object.');
	      }
	
	      return (0, _defaults.setDefaults)(newDefaults);
	    }
	  }]);
	
	  return Qonductor;
	}();
	
	exports.default = Qonductor;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var STATUSES = {
	  CANCELLED: 'CANCELLED',
	  COMPLETED: 'COMPLETED',
	  FAILED: 'FAILED',
	  PENDING: 'PENDING',
	  RUNNING: 'RUNNING'
	};
	
	var TYPES = {
	  FIFO: 'fifo',
	  LIFO: 'lifo',
	  SIRO: 'siro'
	};
	
	exports.statuses = STATUSES;
	exports.types = TYPES;
	exports.default = {
	  statuses: STATUSES,
	  types: TYPES
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var DEFAULTS = {
	  autoStart: true,
	  keepHistory: true,
	  maxConcurrency: 10,
	  type: 'fifo'
	};
	
	var currentDefaults = _extends({}, DEFAULTS);
	
	/**
	 * get the current defaults
	 *
	 * @return {{autoStart: boolean, keepHistory: boolean, maxConcurrency: number, type: string}}
	 */
	var getDefaults = function getDefaults() {
	  return currentDefaults;
	};
	
	/**
	 * reset the defaults to their original setting
	 * 
	 * @return {object}
	 */
	var resetDefaults = function resetDefaults() {
	  currentDefaults = _extends({}, DEFAULTS);
	
	  return currentDefaults;
	};
	
	/**
	 * assign the keys in newDefaults to those in defaults if they exist in defaults
	 *
	 * @param {object} newDefaults={}
	 * @return {{autoStart: boolean, keepHistory: boolean, maxConcurrency: number, type: string}}
	 */
	var setDefaults = function setDefaults() {
	  var newDefaults = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  Object.keys(newDefaults).forEach(function (key) {
	    if (currentDefaults.hasOwnProperty(key)) {
	      currentDefaults[key] = newDefaults[key];
	    }
	  });
	
	  return currentDefaults;
	};
	
	exports.getDefaults = getDefaults;
	exports.resetDefaults = resetDefaults;
	exports.setDefaults = setDefaults;
	exports.default = {
	  getDefaults: getDefaults,
	  resetDefaults: resetDefaults,
	  setDefaults: setDefaults
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _waddup = __webpack_require__(5);
	
	var _constants = __webpack_require__(2);
	
	var _QueueError = __webpack_require__(6);
	
	var _QueueError2 = _interopRequireDefault(_QueueError);
	
	var _utils = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * get the done function with assigned success / fail actions based
	 * on parameters passed to it
	 * 
	 * @param {function} success
	 * @param {function} fail
	 * @return {function(data: string, error: QueueError): void}
	 */
	var getDone = function getDone(success, fail) {
	  return function (data, error) {
	    if (error) {
	      fail(error);
	    } else {
	      success(data);
	    }
	  };
	};
	
	/**
	 * on fail, run the completion function and return a
	 * rejected Promise to trigger the next catch
	 *
	 * @param {QueueItem} queueItem
	 * @param {function} onComplete
	 * @return {function(error: Error): Promise}
	 */
	var getOnFail = function getOnFail(queueItem, onComplete) {
	  return function (error) {
	    onComplete(queueItem.id, queueItem);
	
	    return Promise.reject(error);
	  };
	};
	
	/**
	 * on success, run the completion function and return the data
	 * to trigger the next then
	 *
	 * @param {QueueItem} queueItem
	 * @param {function} onComplete
	 * @return {function(data: any): any}
	 */
	var getOnSuccess = function getOnSuccess(queueItem, onComplete) {
	  return function (data) {
	    onComplete(queueItem.id, queueItem);
	
	    return data;
	  };
	};
	
	var QueueItem = function () {
	  function QueueItem(id, fn, onComplete) {
	    _classCallCheck(this, QueueItem);
	
	    Object.assign(this, {
	      cancelId: null,
	      id: id,
	      isCancelled: false,
	      promiseId: null,
	      status: _constants.statuses.PENDING
	    });
	
	    var onFail = getOnFail(this, onComplete);
	    var onSuccess = getOnSuccess(this, onComplete);
	
	    this.promise = this._createPromiseWrapper(fn, onSuccess, onFail);
	  }
	
	  /**
	   * create the promise wrapper for the function passed
	   *
	   * @param {function} fn
	   * @param {function} onSuccess
	   * @param {function} onFail
	   * @return {Promise}
	   * @private
	   */
	
	
	  _createClass(QueueItem, [{
	    key: '_createPromiseWrapper',
	    value: function _createPromiseWrapper(fn, onSuccess, onFail) {
	      var _this = this;
	
	      var queuedFunction = (0, _utils.isFunction)(fn) ? fn : function (done) {
	        return done(fn);
	      };
	      var unsubscribeOnSuccess = this._getUnsubscribeOnResolve();
	      var unsubscribeOnFail = this._getUnsubscribeOnReject();
	
	      return new Promise(function (resolve, reject) {
	        var success = _this._resolvePromise(resolve);
	        var fail = _this._rejectPromise(reject);
	        var done = getDone(success, fail);
	
	        _this.cancelId = (0, _waddup.subscribe)(_constants.statuses.CANCELLED, function (topic, _ref) {
	          var id = _ref.id;
	          var message = _ref.message;
	
	          if (id === _this.id) {
	            _this.isCancelled = true;
	
	            _this._cancelPromise(reject, message);
	          }
	        });
	
	        _this.promiseId = (0, _waddup.subscribe)(_constants.statuses.RUNNING, function (topic, id) {
	          if (id === _this.id) {
	            queuedFunction(done);
	
	            (0, _waddup.unsubscribe)(_this.promiseId);
	          }
	        });
	      }).then(unsubscribeOnSuccess).catch(unsubscribeOnFail).then(onSuccess).catch(onFail);
	    }
	
	    /**
	     * cancel the existing promise, rejecting it with the message provided
	     *
	     * @param {function} reject
	     * @param {string} message
	     * @private
	     */
	
	  }, {
	    key: '_cancelPromise',
	    value: function _cancelPromise(reject, message) {
	      this.status = _constants.statuses.CANCELLED;
	
	      reject(new _QueueError2.default(message, _constants.statuses.CANCELLED));
	    }
	
	    /**
	     * publish the cancellation
	     *
	     * @param {string} message
	     * @private
	     */
	
	  }, {
	    key: '_publishCancellation',
	    value: function _publishCancellation(message) {
	      (0, _waddup.publish)(_constants.statuses.CANCELLED, {
	        id: this.id,
	        message: message
	      });
	    }
	
	    /**
	     * reject the promise with the error provided
	     *
	     * @param {function} reject
	     * @return {function(error: Error): void}
	     * @private
	     */
	
	  }, {
	    key: '_rejectPromise',
	    value: function _rejectPromise(reject) {
	      var _this2 = this;
	
	      return function (error) {
	        if (!_this2.isCancelled) {
	          _this2.status = _constants.statuses.FAILED;
	
	          reject(new _QueueError2.default(error));
	        }
	      };
	    }
	
	    /**
	     * resolve the promise with the data provided
	     *
	     * @param {function} resolve
	     * @return {function(data: any): void}
	     * @private
	     */
	
	  }, {
	    key: '_resolvePromise',
	    value: function _resolvePromise(resolve) {
	      var _this3 = this;
	
	      return function (data) {
	        if (!_this3.isCancelled) {
	          _this3.status = _constants.statuses.COMPLETED;
	
	          resolve(data);
	        }
	      };
	    }
	
	    /**
	     * unsubscribe the cancellation once the promise is rejected
	     *
	     * @return {function(error: Error): Promise}
	     * @private
	     */
	
	  }, {
	    key: '_getUnsubscribeOnReject',
	    value: function _getUnsubscribeOnReject() {
	      var _this4 = this;
	
	      return function (error) {
	        (0, _waddup.unsubscribe)(_this4.cancelId);
	
	        return Promise.reject(error);
	      };
	    }
	
	    /**
	     * unsubscribe the cancellation once the promise is resolved
	     *
	     * @return {function(data: any): Promise}
	     * @private
	     */
	
	  }, {
	    key: '_getUnsubscribeOnResolve',
	    value: function _getUnsubscribeOnResolve() {
	      var _this5 = this;
	
	      return function (data) {
	        (0, _waddup.unsubscribe)(_this5.cancelId);
	
	        return data;
	      };
	    }
	
	    /**
	     * publjsh that this queueItem is running
	     */
	
	  }, {
	    key: 'run',
	    value: function run() {
	      this.status = _constants.statuses.RUNNING;
	
	      (0, _waddup.publish)(_constants.statuses.RUNNING, this.id);
	    }
	  }]);
	
	  return QueueItem;
	}();
	
	exports.default = QueueItem;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = undefined;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CustomError = function (_Error) {
	  _inherits(CustomError, _Error);
	
	  function CustomError(message) {
	    _classCallCheck(this, CustomError);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CustomError).call(this));
	
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
	
	var QueueError = function (_CustomError) {
	  _inherits(QueueError, _CustomError);
	
	  function QueueError() {
	    var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	    var type = arguments.length <= 1 || arguments[1] === undefined ? _constants.statuses.FAILED : arguments[1];
	
	    _classCallCheck(this, QueueError);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(QueueError).call(this, 'Queue promise was rejected with status ' + type + (message ? ': ' : '.') + message));
	  }
	
	  return QueueError;
	}(CustomError);
	
	exports.default = QueueError;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var toString = function toString(object) {
	  return Object.prototype.toString.call(object);
	};
	
	/**
	 * determine whether object is a function
	 *
	 * @param {any} object
	 * @return {boolean}
	 */
	var isFunction = function isFunction(object) {
	  return toString(object) === '[object Function]' || typeof object === 'function';
	};
	
	/**
	 * determine whether object is an object
	 *
	 * @param {any} object
	 * @return {boolean}
	 */
	var isObject = function isObject(object) {
	  return toString(object) === '[object Object]' && !!object;
	};
	
	exports.isFunction = isFunction;
	exports.isObject = isObject;
	exports.default = {
	  isFunction: isFunction,
	  isObject: isObject
	};

/***/ }
/******/ ]);
//# sourceMappingURL=qonductor.js.map