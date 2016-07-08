import React from 'react';
import {
    render
} from 'react-dom';

import Qonductor from '../src'

Qonductor.setDefaults({
  autoStart: false,
  maxConcurrency: 73,
  type: 'siro'
});

const queue = new Qonductor();

const length = 1000;

let index = -1;

const returnFromGenerateTimeout = (index, ms) => {
  return (done) => {
    setTimeout(() => {
      if (index % 133 === 0) {
        done(null, `Holy crap! ${index} is divisible by 133!`);
      } else {
        done(index);
      }
    }, ms);
  };
};

while (++index < length) {
  const ms = Math.round(Math.random() * 1000);
  const timeout = returnFromGenerateTimeout(index, ms);

  queue.add(timeout)
    .catch((exception) => {
      console.error(exception);
    })
    .then(() => {
      if (queue.completedCount === length) {
        console.log(queue);
      }
    });
}

queue.start();

const App = () => {
    return (
        <div>
            App
        </div>
    );
};

const div = document.createElement('div');

div.id = 'app-container';

render((
    <App/>
), div);

document.body.appendChild(div);
