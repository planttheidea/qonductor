// external dependencies
import {
  publish,
  subscribe,
  unsubscribe,
} from 'waddup';

// classes
import QueueError from './QueueError';

// constants
import {STATUSES} from './constants';

// utils
import {
  getDone,
  getOnFail,
  getOnSuccess,
} from './utils';

/**
 * @class QueueItem
 * @classdesc Item in the queue of promises to be resolved
 */
class QueueItem {
  constructor(id, fn, onComplete) {
    this.id = id;
    this.promise = this._createPromiseWrapper(fn, getOnSuccess(this, onComplete), getOnFail(this, onComplete));
  }

  cancelId = null;
  isCancelled = false;
  promiseId = null;
  status = STATUSES.PENDING;

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
  _cancelPromise(reject, message) {
    this.status = STATUSES.CANCELLED;

    reject(new QueueError(message, STATUSES.CANCELLED));
  }

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
  _createPromiseWrapper(fn, onSuccess, onFail) {
    const queuedFunction = typeof fn === 'function' ? fn : (done) => done(fn);

    return new Promise((resolve, reject) => {
      const done = getDone(this._resolvePromise(resolve), this._rejectPromise(reject));

      this.cancelId = subscribe(STATUSES.CANCELLED, ({data}) => {
        if (data.id === this.id) {
          this.isCancelled = true;

          this._cancelPromise(reject, data.message);
        }
      });

      this.promiseId = subscribe(STATUSES.RUNNING, ({data}) => {
        if (data.id === this.id) {
          queuedFunction(done);
          unsubscribe(this.promiseId);
        }
      });
    })
      .then(this._getUnsubscribeOnResolve())
      .catch(this._getUnsubscribeOnReject())
      .then(onSuccess)
      .catch(onFail);
  }

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
  _getUnsubscribeOnReject() {
    return (error) => {
      unsubscribe(this.cancelId);

      return Promise.reject(error);
    };
  }

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
  _getUnsubscribeOnResolve() {
    return (data) => {
      unsubscribe(this.cancelId);

      return data;
    };
  }

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
  _publishCancellation(message) {
    publish(STATUSES.CANCELLED, {
      id: this.id,
      message,
    });
  }

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
  _rejectPromise(reject) {
    return (error) => {
      if (!this.isCancelled) {
        this.status = STATUSES.FAILED;

        reject(new QueueError(error));
      }
    };
  }

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
  _resolvePromise(resolve) {
    return (data) => {
      if (!this.isCancelled) {
        this.status = STATUSES.COMPLETED;

        resolve(data);
      }
    };
  }

  /**
   * @function run
   * @memberof QueueItem
   * @instance
   *
   * @description
   * publish that this queueItem is running
   */
  run() {
    this.status = STATUSES.RUNNING;

    publish(STATUSES.RUNNING, {
      id: this.id,
      message: `${this.id} resolved successfully.`,
    });
  }
}

export default QueueItem;
