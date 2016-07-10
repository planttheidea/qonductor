import React, {
  Component
} from 'react';
import {
    render
} from 'react-dom';

import Qonductor from '../src'

Qonductor.setDefaults({
  autoStart: false
});

const queue = new Qonductor();

const length = 100;

let index = -1;

const returnFromGenerateTimeout = (index, ms) => {
  return (done) => {
    setTimeout(() => {
      if (index % 13 === 0) {
        done(null, `${index} is divisible by 13.`);
      } else {
        done(index);
      }
    }, ms);
  };
};

const STYLES = {
  container: {
    padding: 15
  },
  error: {
    color: 'red'
  }
};

class App extends Component {
  state = {
    results: []
  };

  componentDidMount() {
    while (++index < length) {
      const ms = Math.round(Math.random() * 1000);
      const timeout = returnFromGenerateTimeout(index, ms);

      queue.add(timeout)
        .catch((exception) => {
          console.error(exception);

          this.setState({
            results: [
              ...this.state.results,
              {
                isError: true,
                message: exception.message
              }
            ]
          });
        })
        .then(() => {
          this.setState({
            results: [
              ...this.state.results,
              {
                isError: false,
                message: `Completed: ${queue.completedCount}, Running: ${queue.runningCount}, Pending: ${queue.pendingCount}`
              }
            ]
          });
        });

      queue.start();
    }
  }

  render() {
    return (
      <div>
        {this.state.results.map(({isError, message}, index) => {
          return (
            <div
              key={`result-${index}`}
              style={STYLES.container}
            >
              <span style={isError ? STYLES.error : undefined}>
                {message}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

const div = document.createElement('div');

div.id = 'app-container';

render((
    <App/>
), div);

document.body.appendChild(div);
