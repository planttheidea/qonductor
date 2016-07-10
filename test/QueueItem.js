import test from 'ava';
import sinon from 'sinon';

import QueueItem from '../src/QueueItem';

import {
  statuses
} from '../src/constants';

const mainFunction = sinon.stub();
const onComplete = sinon.stub();

let counter = 0;

const queueItem = new QueueItem(counter, mainFunction, onComplete);

test('if creating a new QueueItem returns a QueueItem', (t) => {
  t.true(queueItem instanceof QueueItem);
});

test('if _createPromiseWrapper successfully wraps the function in a promise', (t) => {
  const promise = queueItem._createPromiseWrapper(mainFunction);

  t.true(promise instanceof Promise);
});

test('if _cancelPromise rejects the promise', sinon.test(function(t) {
  const reject = this.stub();

  queueItem._cancelPromise(reject);

  t.true(reject.calledOnce);
}));

test('if _rejectPromise returns a function that will reject the promise', sinon.test(function(t) {
  const reject = this.stub();
  const rejectionFunction = queueItem._rejectPromise(reject);

  t.is(typeof rejectionFunction, 'function');

  rejectionFunction('test');

  t.true(reject.calledOnce);
}));

test('if _resolvePromise returns a function that will resolve the promise', sinon.test(function(t) {
  const resolve = this.stub();
  const resolveFunction = queueItem._resolvePromise(resolve);

  t.is(typeof resolveFunction, 'function');

  resolveFunction('test');

  t.true(resolve.calledOnce);
}));

test('if _getUnsubscribeOnReject returns a function', (t) => {
  t.is(typeof queueItem._getUnsubscribeOnReject(), 'function');
});

test('if _getUnsubscribeOnResolve returns a function', (t) => {
  t.is(typeof queueItem._getUnsubscribeOnResolve(), 'function');
});

test('if run will start running the queueItem', (t) => {
  queueItem.run();

  t.is(queueItem.status, statuses.RUNNING);
});