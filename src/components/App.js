import React from 'react';
import ColorList from './ColorList';
import ColorMenu from './ColorMenu';
import Pagination from './Pagination';
import PropTypes from 'prop-types';
const pushState = (obj, url) =>
  window.history.pushState(obj, '', url)

const onPopState = handler => {
  window.onpopstate = handler
}

class App extends React.Component {
  constructor(props) {
      super(props);
      this.pageChange = this.pageChange.bind(this)
      this.menuClick = this.menuClick.bind(this)
      this.randomColors = this.randomColors.bind(this)
      this.allShadesArray = this.allShadesArray.bind(this)
      this.randomizeArray = this.randomizeArray.bind(this)
      this.state = this.props.initialData;
    }
    static propTypes = {
      initialData: PropTypes.object.isRequired
    };


  componentDidMount() {
    //ajax fetching code goes here so that when data comes back there is for sure dom to modify
    // timers , and listeners go here
    //if you want to integrate code with 3rd party plugin
    //that depends on dom you have to put integration code inside of here
// console.log("COLORS ALL", this.state.allColors)
  onPopState((event) =>{
      this.setState({
        currentColorId: (event.state || {}).currentColorId
      })
    });
}
  componentWillUnmount() {
    //clean timers and listeners so that they don't leak outside scope of component
    onPopState(null);
  };

  handleDisplayPages() {
    let arr = []
    const totalColors = this.state.allColors.length;
    for(var i = 1; i <= totalColors.length/8; i++){
      arr.push(i)
    }

  }

  allShadesArray = (colorObj) => {
    var allColors = [];
    for (var color in colorObj) {
      allColors = allColors.concat(colorObj[color]["shades"])
    }
    return allColors;
  }
  randomizeArray = (colorArray) => {
    var ctr = colorArray.length, temp, index;

    // While there are elements in the array
    while (ctr > 0) {
    // Pick a random index
        index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
        ctr--;
    // And swap the last element with it
        temp = colorArray[ctr];
        colorArray[ctr] = colorArray[index];
        colorArray[index] = temp;
    }
    return colorArray;
  }
  randomColors(){
    let combineColors = this.allShadesArray(this.state.colors);
    let allColors = this.randomizeArray(combineColors);
    console.log("RESET THE COLORS ", allColors);
    this.setState({
      allColors: allColors
    }, ()=>{this.pageChange(1)})
  }
  menuClick(colorId){
    let shades = this.state.colors[colorId].shades;
    // console.log("126: SHADES OF COLOR ", shades)
    this.setState({
      allColors: shades
    }, ()=>{this.pageChange(1)})
  }
  pageChange(pageNum){
    let startingColor = (pageNum - 1) * 12;
    let displayColors = []
    for(var i = startingColor; i < startingColor + 12; i++){
      if(this.state.allColors[i]){
        displayColors.push(this.state.allColors[i]);
      }
    }
    let pages = [];
    for(var i = 1; i < Math.ceil(this.state.allColors.length/12) + 1; i++){
      pages.push(i);
    }
    this.setState({
      displayColors: displayColors,
      pages: pages
    })
  }
  currentContent(){
    if (this.state.currentColorId){
      return <Color
            colorListClick = {this.fetchColorList}
            // lookUpName = {this.lookUpName}
            // fetchNames={this.fetchNames}
            // addName = {this.addName}
            {...this.currentColor()} />
    }
      return (
        <div className="mainContainer">
          <div className="appRow row">
          <ColorMenu onRandomClick={this.randomColors} onMenuClick={this.menuClick} colors={this.state.colors} />
          <Pagination onColorClick={this.fetchColor}
          onPageClick={this.pageChange}
          currentPage={this.state.page}
          pages={this.state.pages}
          allColors={this.state.allColors}
          displayColors={this.state.displayColors}/>
          </div>
        </div>
      )
  }
  render() {
    // debugger;
    return (
      <div className="App">
        {this.currentContent()}
      </div>
    );
  }
};

export default App;
