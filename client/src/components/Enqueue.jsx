import React from 'react';
import App from '../index.jsx';

class Enqueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aircraftType: '',
      aircraftSize: '',
      aircraftId: ''
    }
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
        <select list="aircraftTypes">
          <option value="P">P-Passenger</option>
          <option value="C">C-Cargo</option>
        </select>
        <select list="aircraftSizes">
          <option value="S">S-Small</option>
          <option value="L">L-Large</option>
        </select>
        <input type="text"
          value={this.state.aircraftId}
          onChange={event => this.handleAircraftEntry(event)}/>
        <button
          onClick={() => this.props.handleEnqueue(
            this.state.aircraftType,
            this.state.aircraftSize,
            this.state.aircraftId
            )}
        >
          Submit!
        </button>
      </div>
    );
  }
}

export default Enqueue;