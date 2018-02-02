import React from 'react';
import App from '../index.jsx';

class Enqueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aircraftType: '',
      aircraftSize: '',
      aircraftId: ''
    };

    this.handleAircraftType = this.handleAircraftType.bind(this);
    this.handleAircraftSize = this.handleAircraftSize.bind(this);
  }

  handleAircraftType(event) {
    this.setState({
      aircraftType: event.target.value
    });
  }

  handleAircraftSize(event) {
    this.setState({
      aircraftSize: event.target.value
    });
  }

  handleAircraftEntry(event) {
    this.setState({
      aircraftId: event.target.value
    });
  }

  render() {
    return (
      <div className='header'>
        <div>Enter aircraft parameters:</div>
        <select name="aircraftTypes"
          value={this.state.aircraftType}
          onChange={event => this.handleAircraftType(event)}>
            <option value="P">P-Passenger</option>
            <option value="C">C-Cargo</option>
        </select>
        <select name="aircraftSizes"
          value={this.state.aircraftSize}
          onChange={event => this.handleAircraftSize(event)}>
            <option value="S">S-Small</option>
            <option value="L">L-Large</option>
        </select>
        <input type="text"
          name='aircraftIds'
          placeholder="Please enter aircraftId"
          value={this.state.aircraftId}
          onChange={event => this.handleAircraftEntry(event)}
        />
        <button
          onClick={() => {
            console.log('Clicked!');
            this.props.handleEnqueue(
            this.state.aircraftType,
            this.state.aircraftSize,
            this.state.aircraftId
            )}}
        >
          Submit!
        </button>
      </div>
    );
  }
}

export default Enqueue;