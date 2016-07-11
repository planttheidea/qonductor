import {
  statuses,
  types
} from './constants';

import {
  getDefaults,
  resetDefaults,
  setDefaults
} from './defaults';

import QueueItem from './QueueItem';

import {
  isObject
} from './utils';

class Qonductor {
  constructor(options = {}) {
    const {
      autoStart: defaultAutoStart,
      keepHistory: defaultKeepHistory,
      maxConcurrency: defaultMaxConcurrency,
      type: defaultType
    } = getDefaults();

    const {
      autoStart = defaultAutoStart,
      keepHistory = defaultKeepHistory,
      maxConcurrency = defaultMaxConcurrency,
      type = defaultType
    } = options;

    Object.assign(this, {
      autoStart,
      completed: {},
      completedCount: 0,
      currentIndex: 0,
      keepHistory,
      isRunning: false,
      maxConcurrency,
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
  _addQueueItemCancel(queueItem) {
    return (message) => {
      if (queueItem.status === statuses.PENDING || queueItem.status === statuses.RUNNING) {
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
  _complete(index, queueItem) {
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
      this._runQueue();
    } else if (!this.runningCount && !this.pendingCount) {
      this.isRunning = false;
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
  _getNextIndex(keys, type) {
    if (!keys.length) {
      return -1;
    }

    switch (type) {
      case types.LIFO:
        return Math.max.apply(this, keys);

      case types.SIRO:
        return keys[Math.floor(Math.random() * keys.length)];

      default:
        return Math.min.apply(this, keys);
    }
  }

  /**
   * run the items in the queue up to the maxConcurrency limit
   *
   * @private
   */
  _runQueue() {
    let running = this.runningCount;

    while (++running <= this.maxConcurrency) {
      const index = this._getNextIndex(Object.keys(this.pending), this.type);

      if (index === -1) {
        break;
      }

      const queueItem = this.pending[index];

      this.running[index] = queueItem;
      this.runningCount++;

      delete this.pending[index];
      this.pendingCount--;

      queueItem.run();
    }
  }

  /**
   * add the function to the queue
   *
   * @param {function} fn
   * @return {Promise}
   */
  add(fn) {
    const index = this.currentIndex;
    const queueItem = new QueueItem(index, fn, this._complete.bind(this));

    this.queue[index] = queueItem;

    this.currentIndex++;

    this.pending[index] = queueItem;
    this.pendingCount++;

    queueItem.promise.cancel = this._addQueueItemCancel(queueItem);

    if (this.autoStart && !this.isRunning) {
      this.start();
    }

    return queueItem.promise;
  }

  /**
   * cancel all remaining promises in the queue
   */
  clear() {
    Object.keys(this.queue).forEach((key) => {
      if (this.queue[key].status !== statuses.COMPLETED) {
        this.queue[key].promise.cancel();
      }
    });
  }

  /**
   * get the global defaults for Qonductor
   *
   * @returns {object}
   */
  static getDefaults() {
    return getDefaults();
  }

  /**
   * reset the global defaults for Qonductor
   *
   * @returns {object}
   */
  static resetDefaults() {
    return resetDefaults();
  }

  /**
   * set the global defaults for Qonductor
   *
   * @param {object} newDefaults={}
   * @returns {object}
   */
  static setDefaults(newDefaults = {}) {
    if (!isObject(newDefaults)) {
      throw new SyntaxError('Defaults assignment must be passed an object.');
    }

    return setDefaults(newDefaults);
  }

  /**
   * kick off the processing of the queue
   */
  start() {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    this._runQueue();
  }

  /**
   * stop processing pending queue items
   */
  stop() {
    this.isRunning = false;
  }
}

export default Qonductor;
