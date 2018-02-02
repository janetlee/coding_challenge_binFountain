import React from 'react';
import App from '../index.jsx';

class Dequeue extends React.Component {
  constructor(props) {
    super(props);
    this.handleDequeue = this.props.handleDequeue.bind(this);
  }

  render() {
    let aircraft = this.props.dequeued;
    return (
      <div className='header'>
        <button
          onClick={() => {
            console.log('Clicked!');
            this.props.handleDequeue()}}
        >
          Dequeue
        </button>
        <div className='dequeuedPlane'>
          <span className='dequeuedPlane'>
            {aircraft.type}
          </span>
          <span className='dequeuedPlane'>
            {aircraft.size}
          </span>
          <span className='dequeuedPlane'>
            {aircraft.aircraftId}
          </span>
        </div>
      </div>
    );
  }
}

export default Dequeue;