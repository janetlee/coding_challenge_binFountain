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

  handleEnqueue(aircraft) {
    // function to enqueue aircraft
    // (async () => {
    //   try {
    //     const response = await axios.post('', { searchTerm });
    //     const data = response.data;

    //     if (data) {
    //       this.setState({
    //         searchTerm: searchTerm,
    //         tweets: data
    //       })
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // })();
  }

  handleDequeue() {
    // function to handle dequeing the next plane
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