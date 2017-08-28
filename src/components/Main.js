require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let imageDatas = require('../data/imageData.json');

function generateImageURL(imageDataArr){
  for(const i = 0,j = imageDataArr.length;i <j;i++){
    const singleImageData = imageDataArr[i];
    singleImageData.imageURL = require('../images/'+singleImageData.fileName);
    imageDataArr[i]= singleImageData;
  }
  return imageDataArr;
}

imageDatas = generateImageURL(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" /><span>hello</span>
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
