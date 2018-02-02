import babelPolyfill from 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Enqueue from './components/Enqueue.jsx';
import Dequeue from './components/Dequeue.jsx';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      queue: {},
      aircraft: {}
    }

    this.handleEnqueue = this.handleEnqueue.bind(this);
    this.handleDequeue = this.handleDequeue.bind(this);
  }

  handleEnqueue(aircraftType, aircraftSize, aircraftId) {
    (async () => {
      try {
        const response = await axios.post('/enqueue', { aircraftType, aircraftSize, aircraftId });
        const data = response.data;

        if (data) {
          console.log(data);
          this.setState({
            queue: data
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }

  handleDequeue() {
    console.log('dequeing a plane');
    // function to handle dequeing the next plane
    (async () => {
      try {
        const response = await axios.get('/dequeue');
        const data = response.data;

        if (data) {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
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
        <Dequeue className="Dequeue"
          handleDequeue={this.handleDequeue}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));