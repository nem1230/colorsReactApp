import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColorPreview extends Component {
  render() {
    return (
    <div className="link ColorPreview">
      <div style={{ backgroundColor: this.props.color }} className="color-name">
      </div>
      <span className="colorLabel">{this.props.color}</span>
    </div>
    )
  }
}

ColorPreview.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}


export default ColorPreview;
