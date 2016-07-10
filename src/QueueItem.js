import {
  publish,
  subscribe,
  unsubscribe
} from 'waddup';

import {
  statuses
} from './constants';

import QueueError from './QueueError';

import {
  isFunction
} from './utils';

/**
 * get the done function with assigned success / fail actions based
 * on parameters passed to it
 * 
 * @param {function} success
 * @param {function} fail
 * @return {function(data: string, error: QueueError): void}
 */
const getDone = (success, fail) => {
  return (data, error) => {
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
const getOnFail = (queueItem, onComplete) => {
  return (error) => {
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
const getOnSuccess = (queueItem, onComplete) => {
  return (data) => {
    onComplete(queueItem.id, queueItem);

    return data;
  };
};

class QueueItem {
  constructor(id, fn, onComplete) {
    Object.assign(this, {
      cancelId: null,
      id,
      isCancelled: false,
      promiseId: null,
      status: statuses.PENDING
    });

    const onFail = getOnFail(this, onComplete);
    const onSuccess = getOnSuccess(this, onComplete);

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
  _createPromiseWrapper(fn, onSuccess, onFail) {
    const queuedFunction = isFunction(fn) ? fn : (done) => {
      return done(fn);
    };
    const unsubscribeOnSuccess = this._getUnsubscribeOnResolve();
    const unsubscribeOnFail = this._getUnsubscribeOnReject();

    return new Promise((resolve, reject) => {
      const success = this._resolvePromise(resolve);
      const fail = this._rejectPromise(reject);
      const done = getDone(success, fail);

      this.cancelId = subscribe(statuses.CANCELLED, (topic, {id, message}) => {
        if (id === this.id) {
          this.isCancelled = true;

          this._cancelPromise(reject, message);
        }
      });

      this.promiseId = subscribe(statuses.RUNNING, (topic, id) => {
        if (id === this.id) {
          queuedFunction(done);

          unsubscribe(this.promiseId);
        }
      });
    })
      .then(unsubscribeOnSuccess)
      .catch(unsubscribeOnFail)
      .then(onSuccess)
      .catch(onFail);
  }

  /**
   * cancel the existing promise, rejecting it with the message provided
   *
   * @param {function} reject
   * @param {string} message
   * @private
   */
  _cancelPromise(reject, message) {
    this.status = statuses.CANCELLED;

    reject(new QueueError(message, statuses.CANCELLED));
  }

  /**
   * publish the cancellation
   *
   * @param {string} message
   * @private
   */
  _publishCancellation(message) {
    publish(statuses.CANCELLED, {
      id: this.id,
      message
    });
  }

  /**
   * reject the promise with the error provided
   *
   * @param {function} reject
   * @return {function(error: Error): void}
   * @private
   */
  _rejectPromise(reject) {
    return (error) => {
      if (!this.isCancelled) {
        this.status = statuses.FAILED;

        reject(new QueueError(error));
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
  _resolvePromise(resolve) {
    return (data) => {
      if (!this.isCancelled) {
        this.status = statuses.COMPLETED;

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
  _getUnsubscribeOnReject() {
    return (error) => {
      unsubscribe(this.cancelId);

      return Promise.reject(error);
    };
  }

  /**
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
   * publjsh that this queueItem is running
   */
  run() {
    this.status = statuses.RUNNING;

    publish(statuses.RUNNING, this.id);
  }
}

export default QueueItem;
