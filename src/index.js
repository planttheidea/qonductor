// classes
import QueueItem from './QueueItem';

// constants
import {
  STATUSES,
  TYPES,
} from './constants';

// defaults
import {
  getDefaults,
  resetDefaults,
  setDefaults,
} from './defaults';

const {floor, max, min, random} = Math;
const {keys} = Object;

class Qonductor {
  constructor(options = {}) {
    const {type, ...directlyAssignedValues} = {
      ...getDefaults(),
      ...options,
    };

    keys(directlyAssignedValues).forEach((key) => {
      this[key] = directlyAssignedValues[key];
    });

    this.type = type.toLowerCase();
  }

  completed = {};
  completedCount = 0;
  currentIndex = 0;
  isRunning = false;
  pending = {};
  pendingCount = 0;
  queue = {};
  running = {};
  runningCount = 0;

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
  _addQueueItemCancel(queueItem) {
    return (message) => {
      if (queueItem.status === STATUSES.PENDING || queueItem.status === STATUSES.RUNNING) {
        queueItem._publishCancellation(message);
      }
    };
  }

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
      return this._runQueue();
    }

    if (!this.runningCount && !this.pendingCount) {
      this.isRunning = false;
    }
  }

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
  _getNextIndex(keys, type) {
    if (!keys.length) {
      return -1;
    }

    switch (type) {
      case TYPES.LIFO:
        return max(...keys);

      case TYPES.SIRO:
        return keys[floor(random() * keys.length)];

      default:
        return min(...keys);
    }
  }

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
  _runQueue() {
    let running = this.runningCount;

    while (++running <= this.maxConcurrency) {
      const index = this._getNextIndex(keys(this.pending), this.type);

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
   * @function getDefaults
   * @memberof Qonductor
   * @static
   *
   * @description
   * get the global defaults for Qonductor
   *
   * @returns {object}
   */
  static getDefaults = getDefaults;

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
  static resetDefaults = resetDefaults;

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
  static setDefaults(newDefaults = {}) {
    if (!newDefaults || newDefaults.constructor !== Object) {
      throw new SyntaxError('Defaults assignment must be passed an object.');
    }

    return setDefaults(newDefaults);
  }

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
  add(id, fn) {
    const index = this.currentIndex;

    const queueId = typeof id === 'function' ? index : id;
    const queueFunction = fn || id;

    const queueItem = new QueueItem(queueId, queueFunction, this._complete.bind(this));

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
   * @function clear
   * @memberof Qonductor
   * @instance
   *
   * @description
   * cancel all remaining promises in the queue
   */
  clear() {
    Object.keys(this.queue).forEach((key) => {
      if (this.queue[key].status !== STATUSES.COMPLETED) {
        this.queue[key].promise.cancel();
      }
    });
  }

  /**
   * @function start
   * @memberof Qonductor
   * @instance
   *
   * @description
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
   * @function stop
   * @memberof Qonductor
   * @instance
   *
   * @description
   * stop processing pending queue items
   */
  stop() {
    this.isRunning = false;
  }
}

export default Qonductor;
