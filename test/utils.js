import test from 'ava';

import {
  isFunction,
  isObject
} from '../src/utils';

test('if isFunction correctly determines if an object is a function', (t) => {
  t.false(isFunction(undefined));
  t.false(isFunction(null));
  t.false(isFunction(true));
  t.false(isFunction('string'));
  t.false(isFunction(123));
  t.false(isFunction({}));
  t.false(isFunction([]));
  t.true(isFunction(function() {}));
  t.true(isFunction(() => {}));
});

test('if isObject correctly determines if an object is an object', (t) => {
  t.false(isObject(undefined));
  t.false(isObject(null));
  t.false(isObject(true));
  t.false(isObject('string'));
  t.false(isObject(123));
  t.true(isObject({}));
  t.false(isObject([]));
  t.false(isObject(function() {}));
  t.false(isObject(() => {}));
});