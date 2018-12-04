import React from 'react';
import PropTypes from 'prop-types';
import ColorPreview from './ColorPreview';

const ColorList = ({ colors, onColorClick }) => (
  <div className="colorList">
    {console.log("COLORSSSS COLOR LIST", colors)}
    <div className="colorRow row">
    {[colors[0], colors[1], colors[2], colors[3]].map(color => (
      <div className="col-sm-3">
      <ColorPreview key={color}
      onClick={onColorClick}
      color={color} />
      </div>
      )
    )}
    </div>
    <div className="colorRow row">
    {[colors[4], colors[5], colors[6], colors[7]].map(color => (
      <div className="col-sm-3">
      <ColorPreview key={color}
      onClick={onColorClick}
      color={color} />
      </div>
      )
    )}
    </div>
    <div className="colorRow row">
    {[colors[8], colors[9], colors[10], colors[11]].map(color => (
      <div className="col-sm-3">
      <ColorPreview key={color}
      onClick={onColorClick}
      color={color} />
      </div>
      )
    )}
    </div>
  </div>
)
ColorList.propTypes = {
  colors: PropTypes.array.isRequired,
  onColorClick: PropTypes.func.isRequired
}

export default ColorList;
