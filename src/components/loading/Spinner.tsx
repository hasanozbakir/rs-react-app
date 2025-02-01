import { Component } from 'react';
import './Spinner.css';

class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <div className="spinner-inner"></div>
      </div>
    );
  }
}

export default Spinner;
