import test from 'ava';

import QueueError from '../src/QueueError';

test('if instance of QueueError has the valid properties', (t) => {
  const error = new QueueError('test');

  t.is(error.message, 'Queue promise was rejected with status FAILED: test.');
  t.true(error instanceof Error);
});
