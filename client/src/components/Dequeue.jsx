import React from 'react';
import App from '../index.jsx';

class Dequeue extends React.Component {
  constructor(props) {
    super(props);
    this.handleDequeue = this.props.handleDequeue.bind(this);
  }

  render() {
    const { queue } = this.props;
    return (
      <div className='header'>
        <div>Current Queue:</div>
        <div>{ queue }</div>
        <button
          onClick={() => {
            console.log('Clicked!');
            this.props.handleDequeue()}}
        >
          Dequeue
        </button>
      </div>
    );
  }
}

export default Dequeue;