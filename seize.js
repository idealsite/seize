var startX = Math.floor(window.innerWidth/2)-5;
var startY = Math.floor(window.innerHeight/2)-5;
for (var i = 0; i < categories.length; i++){
  for (var k = 0; k < categories[i].number; k++){
    $('#seize').append('<div class="seize cat'+i+'"/>');
  };
  if (i == 0){
    create("0");
  } else{
    create(i,randomColor());
  };
};

function create(catIndex,color){
  $('.cat'+catIndex).each(function(i){
    if (!color){
      color = randomColor();
    };
    var size = randomXToY(30,70),
    finalX = randomXToY(50,(window.innerWidth-150)),
    finalY = randomXToY(50,(window.innerHeight-150)),
    speed = Math.round(Math.sqrt(Math.pow((finalX-startX),2)+Math.pow((finalY-startY),2)))*1.5,
    zoomPos = (90-size)/2-1.5;
    $(this).data({
      'firstSize': size,
      'firstX': finalX,
      'firstY': finalY,
      'unzoomPos': (size-15)/2+1.5,
      'speed': speed
    }).css({
      'position': 'absolute',
      'overflow': 'hidden',
      'left': startX,
      'top': startY,
      'width': 10,
      'height': 10,
      'background-color': 'rgba(' +color+', 0.5)',
      'border': '1px solid rgba(' +color+', 0.8)',
      '-moz-border-radius': 50,
      '-webkit-border-radius': 50
    }).delay(500).animate({
      'left': finalX,
      'top': finalY,
      'width': size,
      'height': size
      },speed
    ).mouseover(function(){
      $('.seize').not(this).each(function(i){
        $(this).animate({
          'left': '+='+$(this).data('unzoomPos'),
          'top': '+='+$(this).data('unzoomPos'),
          'width': 15,
          'height': 15
          },300
        ).css('zIndex', 0);;
      });
      $(this).animate({
        'left': '-='+zoomPos,
        'top': '-='+zoomPos,
        'width': 90,
        'height': 90,
        'border-width': 4
        },350, function(){
          $(this).draggable();
        }
      ).css('zIndex', 1);
    }).mouseout(function(){
      $('.seize').not(this).each(function(i){
        $(this).animate({
          'left' : '-='+$(this).data('unzoomPos'),
          'top' : '-='+$(this).data('unzoomPos'),
          'width' : $(this).data('firstSize'),
          'height' : $(this).data('firstSize')
          },300
        );
      });
      $(this).draggable('destroy');
      $(this).animate({
        'left': '+='+zoomPos,
        'top': '+='+zoomPos,
        'width': size,
        'height': size,
        'border-width': 1
        },350
      );
    });
  });
};

function hideCategory(catIndex){
  $('.cat'+catIndex).each(function(i){
    $(this).animate({
      'left': startX,
      'top': startY,
      'width': 10,
      'height': 10
      },$(this).data('speed'),function(){
        $(this).hide("slow");
      }
    );
  });
};

function showCategory(catIndex){
  $('.cat'+catIndex).each(function(i){
    $(this).show("slow",function(){
      $(this).animate({
        'left': $(this).data('firstX'),
        'top': $(this).data('firstY'),
        'width': $(this).data('firstSize'),
        'height': $(this).data('firstSize')
        },$(this).data('speed')
      );
    });
  });
};

function randomXToY(minVal,maxVal){
  return Math.round(Math.random()*(maxVal-minVal))+minVal;
};

function randomColor(){
  var rint = Math.round(0xffffff*Math.random());
  return (rint>>16)+','+(rint>>8&255)+','+(rint&255);
}; //http://develobert.blogspot.com/2008/06/random-color-generation-with-javascript.html
