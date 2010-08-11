
$('document').ready(function(){
	var number = randomXToY(10, 20),
	startX = Math.floor(window.innerWidth/2) - 5,
	startY = Math.floor(window.innerHeight/2) - 5;
	for (var i=0;i<number;i++){
		$('#seize').append('<div class="seize" />')
	};
	$('.seize').each(function(i){
		var size = randomXToY(30, 70),
		color = randomColor(),
		finalX = randomXToY(50, (window.innerWidth - 150)),
		finalY = randomXToY(50, (window.innerHeight - 150)),
		speed = Math.round(Math.sqrt(Math.pow((finalX-startX),2)+Math.pow((finalY-startY),2)))*1.5,
		newPos = (90-size)/2-1.5;
		$(this).css({
			'position': 'absolute',
			'overflow': 'hidden',
      'left' : startX,
      'top' : startY,
      'width' : 10,
      'height' : 10,
      'background-color' : 'rgba(' + color + ', 0.5)',
      'border' : '1px solid rgba(' + color + ', 0.8)',
      '-moz-border-radius' : 48,
      '-webkit-border-radius' : 48
		}).delay(400).animate({
			'left' : finalX,
			'top' : finalY,
			'width' : size,
			'height' : size
			},speed
		).mouseover(function(){
			$(this).animate({
				'width': 90,
				'height': 90,
				'border-width': 4,
				'left': '-=' + newPos,
				'top': '-=' + newPos
				},200
			);
		}).mouseout(function(){
			$(this).animate({
				'width': size,
				'height': size,
				'border-width': 1,
				'left': '+=' + newPos,
				'top': '+=' + newPos
				},200
			);
		});
	});
});

function randomXToY(minVal,maxVal){
  var randVal = Math.round(Math.random()*(maxVal-minVal)) + minVal;
  return randVal;
};

function randomColor(){
  var rint = Math.round(0xffffff * Math.random());
  return (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255);
}; // http://develobert.blogspot.com/2008/06/random-color-generation-with-javascript.html

