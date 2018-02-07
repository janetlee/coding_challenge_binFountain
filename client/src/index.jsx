import babelPolyfill from 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Enqueue from './components/Enqueue.jsx';
import Queue from './components/Queue.jsx';
import Dequeue from './components/Dequeue.jsx';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      dequeued: ''
    }

    this.handleEnqueue = this.handleEnqueue.bind(this);
    this.handleDequeue = this.handleDequeue.bind(this);
    this.handleQueue = this.handleQueue.bind(this);
  }

  handleEnqueue(aircraftType, aircraftSize, aircraftId) {
    (async () => {
      try {
        const response = await axios.post('/enqueue',
          { aircraftType, aircraftSize, aircraftId });
        const data = response.data;
        console.log(data);

        if (data) {
          this.setState({
            queue: data
          });
          this.forceUpdate();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }

  handleDequeue() {
    console.log('dequeing a plane');
    (async () => {
      try {
        const response = await axios.get('/dequeue');
        const data = response.data;

        if (data) {
          console.log(data);
          this.setState({
            queue: data.queue,
            dequeued: data.dequeued
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }

  handleQueue() {
    console.log('Clicked Refresh');
    (async () => {
      try {
        const response = await axios.get('/queue');
        const data = response.data;
        console.log(data);

        if (data) {
          this.setState({
            queue: data
          });
        console.log(this.state.queue);

          this.forceUpdate();
        }
      } catch (error) {
        console.log(this.state);
        console.error(error, this.state);
      }
    })();
  }

  render() {
    return (
    <div>
      <div className='Title'>My Aircraft Queue Management System</div>
      <Enqueue className="Enqueue"
        handleEnqueue={this.handleEnqueue}
        aircraft={this.state.aircraft}
      />
      <Queue className="Queue"
        handleQueue={this.handleQueue}
        queue={this.state.queue}
      />
      <Dequeue className="Dequeue"
        handleDequeue={this.handleDequeue}
        dequeued={this.state.dequeued}
      />
    </div>
  )}
}

ReactDOM.render(<App />, document.getElementById('app'));