import test from 'ava';

import {getDefaults, setDefaults} from '../src/defaults';

test('if getDefaults gets the correct object', (t) => {
  const defaults = getDefaults();

  t.deepEqual(defaults, {
    autoStart: true,
    keepHistory: true,
    maxConcurrency: 10,
    type: 'fifo'
  });
});

test('if setDefualts updates the defaults object', (t) => {
  setDefaults({
    autoStart: false
  });

  const defaultsAfterSingleSet = getDefaults();

  t.deepEqual(defaultsAfterSingleSet, {
    autoStart: false,
    keepHistory: true,
    maxConcurrency: 10,
    type: 'fifo'
  });

  setDefaults({
    keepHistory: false,
    maxConcurrency: 50,
    type: 'siro'
  });

  const defaultsAfterRemainingSet = getDefaults();

  t.deepEqual(defaultsAfterRemainingSet, {
    autoStart: false,
    keepHistory: false,
    maxConcurrency: 50,
    type: 'siro'
  });

  setDefaults({
    autoStart: true,
    keepHistory: true,
    maxConcurrency: 10,
    type: 'fifo'
  });
});
