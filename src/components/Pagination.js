import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorList from './ColorList';

class Pagination extends Component {

  render() {
    return (
    <div className="link col-sm-10">
    <ColorList
    onColorClick={this.props.onColorClick}
    colors={this.props.displayColors}/>
    <ul className="pageList">
    {this.props.pages.map((color, index) =>
        <li key={index+1}
            onClick={() => this.props.onPageClick(index+1)}
            >{index+1}</li>
    )}
    </ul>
    </div>
    )
  }
}


Pagination.propTypes = {
  displayColors: PropTypes.array.isRequired,
  allColors: PropTypes.array.isRequired,
  pages: PropTypes.array.isRequired,
  onColorClick: PropTypes.func.isRequired,
  onPageClick: PropTypes.func.isRequired
}

export default Pagination;
