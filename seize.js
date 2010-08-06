$(document).ready(function(){
  var number = randomXToY(5, 5);
  var startX = Math.floor(window.innerWidth/2) - 10;
  var startY = Math.floor(window.innerHeight/2) - 10;
  for (var i=1; i<=number;i++){
    var elem = $('<div></div>'),
    size = randomXToY(30, 100),
    color = randomColor(),
    finalX = randomXToY(50, (window.innerWidth - 150)),
    finalY = randomXToY(50, (window.innerHeight - 150));
    elem.addClass('seize')
    .css({
			'position': 'absolute',
      'left' : startX,
      'top' : startY,
      'width' : 20,
      'height' : 20,
      'background-color' : 'rgba(' + color + ', 0.4)',
      'border' : '1px solid rgba(' + color + ', 0.5)',
      '-moz-border-radius' : 100,
      '-webkit-border-radius' : 100
    }).animate({
      'left' : finalX,
      'top' : finalY,
      'width' : size,
      'height' : size
      },
      800
    ).mouseover(function(){
			$(this).animate({
				'border-width': '4px'
			});
		});
    elem.appendTo('#seize');
  };
});

function randomXToY(minVal,maxVal){
  var randVal = Math.round(Math.random()*(maxVal-minVal)) + minVal;
  return randVal;
};

function randomEvenXToY(minVal,maxVal){
  var randVal = Math.round(Math.random()*(maxVal-minVal)) + minVal;
  if ((randVal % 2) == 0){ return randVal }
  else{
    if (randVal == maxVal){ return (--randVal) }
    else{ return (++randVal) }
  }
};

function randomColor(){
  var rint = Math.round(0xffffff * Math.random());
  return (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255);
}; // http://develobert.blogspot.com/2008/06/random-color-generation-with-javascript.html

