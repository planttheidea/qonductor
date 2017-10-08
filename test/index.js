import test from 'ava';
import sinon from 'sinon';

import Qonductor from '../src/index';
import QueueItem from '../src/QueueItem';

const sleep = (ms = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

test('if Qonductor returns a proper object', (t) => {
  const queue = new Qonductor();

  t.deepEqual(
    {...queue},
    {
      autoStart: true,
      completed: {},
      completedCount: 0,
      currentIndex: 0,
      keepHistory: true,
      isRunning: false,
      maxConcurrency: 10,
      pending: {},
      pendingCount: 0,
      queue: {},
      running: {},
      runningCount: 0,
      type: 'fifo'
    }
  );
});

test('if static function getDefaults gets the defaults', (t) => {
  const defaults = Qonductor.getDefaults();

  t.deepEqual(defaults, {
    autoStart: true,
    keepHistory: true,
    maxConcurrency: 10,
    type: 'fifo'
  });
});

test('if static function setDefaults sets the defaults', (t) => {
  const defaults = Qonductor.setDefaults({
    autoStart: false,
    type: 'siro'
  });

  t.deepEqual(defaults, {
    autoStart: false,
    keepHistory: true,
    maxConcurrency: 10,
    type: 'siro'
  });
});

test('if static function resetDefaults resets the defaults to their original values', (t) => {
  const defaults = Qonductor.resetDefaults();

  t.deepEqual(defaults, {
    autoStart: true,
    keepHistory: true,
    maxConcurrency: 10,
    type: 'fifo'
  });
});

const queue = new Qonductor();

test('if _addQueueItemCancel adds a function to the object passed', (t) => {
  const cancelFunction = queue._addQueueItemCancel({});

  t.is(typeof cancelFunction, 'function');
});

test('if _complete will convert the queueItem to completed', (t) => {
  const queueItem = new QueueItem((done) => {
    done();
  });

  const stub = sinon.stub(queueItem, 'run').callsFake(function() {
    this.status = 'RUNNING';
  });

  queueItem.run();

  queue.isRunning = true;
  queue.running[0] = queueItem;
  queue.runningCount = 1;

  queue._complete(0, queueItem);

  t.deepEqual(queue.running, {});
  t.is(queue.runningCount, 0);

  t.deepEqual(queue.completed, {
    0: queueItem
  });
  t.is(queue.completedCount, 1);

  stub.restore();
});

test('if _getNextIndex gets the correct index based on the type', (t) => {
  const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

  t.is(queue._getNextIndex(keys, 'fifo'), 0);
  t.is(queue._getNextIndex(keys, 'lifo'), 8);
  t.not(queue._getNextIndex(keys, 'siro'), 0);
  t.not(queue._getNextIndex(keys, 'siro'), 8);
});

let secondQueue = new Qonductor({
  autoStart: false,
  maxConcurrency: 1
});

test('if add will add an item to the queue', (t) => {
  secondQueue
    .add((done) => {
      setTimeout(() => {
        done('finished');
      }, 10000);
    })
    .catch(() => {});

  t.deepEqual(Object.keys(secondQueue.completed), []);
  t.is(secondQueue.completedCount, 0);
  t.deepEqual(Object.keys(secondQueue.running), []);
  t.is(secondQueue.runningCount, 0);
  t.deepEqual(Object.keys(secondQueue.pending), ['0']);
  t.is(secondQueue.pendingCount, 1);

  t.is(secondQueue.pending[0].status, 'PENDING');
});

test('if start will start the item in the queue', (t) => {
  secondQueue.start();

  t.deepEqual(Object.keys(secondQueue.completed), []);
  t.is(secondQueue.completedCount, 0);
  t.deepEqual(Object.keys(secondQueue.running), ['0']);
  t.is(secondQueue.runningCount, 1);
  t.deepEqual(Object.keys(secondQueue.pending), []);
  t.is(secondQueue.pendingCount, 0);

  t.is(secondQueue.running[0].status, 'RUNNING');
});

test('if stop will stop the queue from processing pending items', (t) => {
  secondQueue.stop();

  t.false(secondQueue.isRunning);
});

test('if clear will cancel all items in the queue', async (t) => {
  secondQueue.clear();

  await sleep(1);

  t.deepEqual(Object.keys(secondQueue.completed), ['0']);
  t.is(secondQueue.completedCount, 1);
  t.deepEqual(Object.keys(secondQueue.running), []);
  t.is(secondQueue.runningCount, 0);
  t.deepEqual(Object.keys(secondQueue.pending), []);
  t.is(secondQueue.pendingCount, 0);

  t.is(secondQueue.completed[0].status, 'CANCELLED');
});
