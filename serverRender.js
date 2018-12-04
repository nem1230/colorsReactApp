import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

const getApiUrl = () => {
  return `${config.serverUrl}/api/colors`;
};

const getInitialData = (apiData) => {
  var combineColors = allShadesArray(apiData.colors);
  var allColors = randomizeArray(combineColors);
  var pages = pagesArray(allColors);
  var displayColors= firstEight(allColors);
  return  {
    colors: apiData.colors,
    allColors: allColors,
    pages: pages,
    displayColors: displayColors
  }
};
const pagesArray = (colorArray) => {
  let pages = [];
  for(var i = 1; i < Math.ceil(colorArray.length/12) + 1; i++){
    pages.push(i);
  }
  return pages;
}
const firstEight = (allColors) => {
  let firstColors = []
  for(var i = 0; i < 12; i++){
    firstColors.push(allColors[i]);
  }
  return firstColors
}
const allShadesArray = (colorObj) => {
  var allColors = [];
  for (var color in colorObj) {
    allColors = allColors.concat(colorObj[color]["shades"])
  }
  return allColors;
}
const randomizeArray = (colorArray) => {
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
const serverRender = () =>
  axios.get(getApiUrl())
    .then(resp => {
      const initialData = getInitialData(resp.data);
      // console.log("INITIAL DATA ", initialData)
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App initialData={initialData} />
        ),
        initialData
      };
    });

export default serverRender;
