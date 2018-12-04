import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColorMenu extends Component {
  handleClick = () => {
    console.log(this.props.color)
    // this.props.onClick(this.props._id)
  }
  render() {
    // console.log("SHADES " + this.props.shades)
    return (
    <div className="link colorMenu col-sm-2">
      <ul className="menuList">
        <button className="randomButton" onClick={this.props.onRandomClick}>Random Color</button>
        {Object.keys(this.props.colors).map(colorId =>{
        console.log("COLORRR COLOR MENU ", this.props.colors[colorId].color);
        return (<li
          className="menuItem"
          onClick={() => this.props.onMenuClick(colorId)}
          key={colorId}>{this.props.colors[colorId].color}</li>)
        })}
      </ul>
    </div>
    )
  }
}

ColorMenu.propTypes = {
  // _id: PropTypes.string.isRequired,
  colors: PropTypes.object.isRequired,
  onRandomClick: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired
}
// const ColorPreview = (color) => (
//   <div className="ColorPreview" onClick={}>
//     <div className="category-name">
//       {color.categoryName}
//     </div>
//     <div className="color-name">
//       {color.colorName}
//     </div>
//   </div>
// );

export default ColorMenu;
