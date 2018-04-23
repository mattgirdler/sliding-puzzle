var loadTimer;
var imgObject = new Image();
imgObject.src = "https://dl.dropboxusercontent.com/s/xxmge8177fn04aw/featurecoffee-768x768.jpg?dl=1"
imgObject.crossOrigin="anonymous";
imgObject.onLoad = onImgLoaded();

function onImgLoaded() {
  if (loadTimer != null) clearTimeout(loadTimer);
  if (!imgObject.complete) {
    loadTimer = setTimeout(function() {
      onImgLoaded();
    }, 3);
  } else {
    populateTileGrid();
  }
}

function getImagePortion(imgObj, newWidth, newHeight, startX, startY, ratio) {
 var tnCanvas = document.createElement('canvas');
 var tnCanvasContext = tnCanvas.getContext('2d');
 tnCanvas.width = newWidth; tnCanvas.height = newHeight;
  
 var bufferCanvas = document.createElement('canvas');
 var bufferContext = bufferCanvas.getContext('2d');
 bufferCanvas.width = imgObj.width;
 bufferCanvas.height = imgObj.height;
 bufferContext.drawImage(imgObj, 0, 0);
 
 tnCanvasContext.drawImage(bufferCanvas, startX,startY,newWidth * ratio, newHeight * ratio,0,0,newWidth,newHeight);
 return tnCanvas.toDataURL();
}

function between(x, min, max) {
  return x >= min && x <= max;
}

function populateTileGrid() {
  var tileGrid = []
  for (var i = 0; i < 9; i++){
    tileGrid.push(i)
  }
  for (var j = 0; j < tileGrid.length; j++) {
    var tileCanvas = "tile-canvas-" + j;
	 console.log(tileCanvas)
    var minX = 0; 
    var minY = 0;
    if (between(j, 3, 5)) {
      minX = ((j - 3) * 256) + 1
      minY = 257;      
    } else if (between(j, 6, 8)) {
      minX = ((j - 6) * 256) + 1
      minY = 513;
    } else {
			minX = (j * 256) + 1
		}
    var newImg = getImagePortion(imgObject, 256, 256, minX, minY, 1)	 
    document.getElementById(tileCanvas).innerHTML = '<img alt="" src="'+newImg+'" crossorigin/>';
	  // document.getElementById(tileCanvas).innerHTML = '<h2>' + j + '</h2>';
  } 
}