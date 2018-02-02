import React from 'react';
import App from '../index.jsx';

class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { queue } = this.props;

    if (queue.first) {
      return (
        <div className='queue-list'>
          <div>Current Queue:</div>
          {queue.first.map((aircraft, index) =>
            <div queue={queue} key={index}></div>
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Queue;