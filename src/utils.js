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
export const getDone = (success, fail) => (data, error) => (error ? fail(error) : success(data));

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
export const getOnFail = (queueItem, onComplete) => (error) => {
  onComplete(queueItem.id, queueItem);

  return Promise.reject(error);
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
export const getOnSuccess = (queueItem, onComplete) => (data) => {
  onComplete(queueItem.id, queueItem);

  return data;
};
