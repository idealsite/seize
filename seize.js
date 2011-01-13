function randomXToY(minVal,maxVal){
  return Math.round(Math.random()*(maxVal-minVal))+minVal;
};
function randomColor(){
  var color = Math.round(0xffffff*Math.random());
  return (color>>16)+','+(color>>8&255)+','+(color&255);
};
