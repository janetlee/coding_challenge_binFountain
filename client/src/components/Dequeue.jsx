import React from 'react';
import App from '../index.jsx';

class Dequeue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aircraft: {}
    }
  }

  render() {
    return (
      <div className='header'>
        <div>Enter a aircraft parameters into the box:</div>
      </div>
    );
  }
}

export default Dequeue;