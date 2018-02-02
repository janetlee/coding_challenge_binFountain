import React from 'react';
import App from '../index.jsx';

class Dequeue extends React.Component {
  constructor(props) {
    super(props);
    this.handleDequeue = this.props.handleDequeue.bind(this);
  }

  render() {
    return (
      <div className='header'>
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