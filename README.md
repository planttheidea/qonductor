# Qonductor

A simple promise-based queueing system for managing the order of operations

#### Installation

```
$ npm i qonductor ---save
```

#### Usage

Incorporate it into your project using any method that you like:

```javascript
// ES2015
import Qonductor from 'qonductor';

// CommonJS
const Qonductor = require('qonductor');

// script
const Qonductor = window.Qonductor;
```

And then you can create a queue and start adding things!

```javascript
const queue = new Qonductor();

const firstItem = queue.add((done) => {
  // ... do stuff
  done('stuff is done');
});

firstItem.then((data) => {
  console.log(data); // stuff is done
});
```

You can use `.add()` to add a function to the queue list, and the parameter `done` is passed as a callback to fire whenever you have completed your operation. This allows you to manage synchronous or asynchronous functions with the same fluid system.

Also, notice that the `done` function is injected into the function you are passing to `Qonductor`. You can access the results of `done` as you would with a traditional promise, either `.then()` or `.catch()`. The first parameter you pass to `done` will be `data` returned in the `.then()`, however if you pass a second parameter that will be read as an error and reject the promise. Example:

```javascript
const asyncItem = queue.add((done) => {
  fetch('/some/api/url')
    .then(response => response.json);
    .catch((error) => {
      done(null, error);
    })
    .then(data => done);
});

asyncItem
  .then((data) => {
    // json data accessible in here
  });
  .catch((error) => {
    // error accessible in here
  });
```

In addition to the traditional promise methods, you have the ability to cancel any particular queue item if it is the pending or running stage:

```javascript
asyncItem.cancel('Some message you want to display in the error.');
```

This can also be fired from inside the function itself, for example if you wanted to cancel the promise on timeout of an AJAX call.

#### Methods

**new Qonductor([options: object])**

Creates a new queue based on the options you pass, or use the defaults if none are passed. The options available:
* autoStart `{boolean}` *defaults to true*
  * Does the queue automatically start processing when items are added
* keepHistory `{boolean}` *defaults to true*
  * Does the queue keep the completed items store (if `false`, it will delete the items upon completion)
* maxConcurrency `{number}` *defaults to 10*
  * Maximum number of items to promise concurrently in the queue
* type `{string}` *valid values are "fifo", "lifo", and "siro", defaults to "fifo"*
  * Order with which the queue should be processed
  * `fifo` = First In, First Out (start at the beginning of the line, end at the end)
  * `lifo` = Last In, First Out (start at the end of the line, end at the beginning)
  * `siro` = Serve In Random Order (random processing order)

**.add(fn: function)**

Adds the function to the queue to be processed. Additionally, if the queue is set to `autoStart` and the number of items is less than the `maxConcurrency`, it will begin processing the item.

**.clear()**

Cancels all remaining running / pending items in the queue.

**.start()**

If `autoStart` is set to `false`, then this is used to programmatically begin the processing of items in the queue.

#### Global Methods

**Qonductor.getDefaults()**

Returns an object of the current global default values for `Qonductor`.

**Qondocutr.resetDefaults()**

If you have made any changes to the global default values, it returns them to their original values.

**Qonductor.setDefaults(options: object)**

Merges the object you pass into the global defaults so that you can set defaults on all queues.

#### Support

`Qonductor` has been tested on the following browsers:
* Chrome
* Firefox
* Edge
* Opera
* Safari

The only thing that will prevent `Qonductor` from working in IE9-11 is the lack of native support for `Promise`s, so if you provide a polyfill those should be supported as well. The same is true for a specific version of `NodeJS`.

#### Development

Standard stuff, clone the repo and `npm install` dependencies. The npm scripts available:
* `build` => run webpack to build qonductor.js and sourcemap qonductor.js.map with NODE_ENV=development
* `build-minifed` => run webpack to build qonductor.min.js with NODE_ENV=production
* `dev` => run webpack dev server to run example app (playground!)
* `lint` => run ESLint against all files in the `src` folder
* `prepublish` => run `lint`, `test`, `transpile`, `build`, and `build-minified`
* `test` => run AVA test functions with `NODE_ENV=test`
* `test-production` => run AVA test functions with `NODE_ENV=production`
* `test:watch` => same as `test`, but runs persistent watcher
* `test-production:watch` => same as `test`, but runs persistent watcher
* `transpile` => run babel against all files in `src` to create files in `lib`
