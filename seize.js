var startX = Math.floor(window.innerWidth/2)-5;
var startY = Math.floor(window.innerHeight/2)-5;
for (var i = 0; i < categories.length; i++){
  for (var k = 0; k < categories[i].number; k++){
    $('#seize').append('<div class="seize cat'+i+'"/>');
  };
  if (i == 0){
    create(i);
  } else{
    create(i,randomColor());
  };
};

function create(catIndex,color){
  $('.cat'+catIndex).each(function(i){
    if (!color){
      var col = randomColor();
    } else{
      var col = color;
    };
    var size = randomXToY(25,70),
    finalX = randomXToY(50,(window.innerWidth-150)),
    finalY = randomXToY(50,(window.innerHeight-150)),
    speed = Math.round(Math.sqrt(Math.pow((finalX-startX),2)+Math.pow((finalY-startY),2)))*2,
    imageDiv = $('<div/>').css({
      'background-image': 'url('+categories[catIndex].images[i]+')',
      'width': size,
      'height': size,
      '-moz-border-radius': 50,
      '-webkit-border-radius': 50,
      'opacity': 0
    });
    $(this).data({
      'firstSize': size,
      'firstX': finalX,
      'firstY': finalY,
      'zoomPos': (90-size)/2-1.5,
      'unzoomPos': (size-15)/2+1.5,
      'speed': speed
    }).css({
      'position': 'absolute',
      'overflow': 'hidden',
      'left': startX,
      'top': startY,
      'width': 10,
      'height': 10,
      'background-color': 'rgba('+col+', 0.5)',
      'border': '1px solid rgba('+col+', 0.8)',
      '-moz-border-radius': 50,
      '-webkit-border-radius': 50
    }).delay(500).animate({
      'left': finalX,
      'top': finalY,
      'width': size,
      'height': size
      },speed
    ).hover(
      function(){
        $(this).children().animate({
          'width': 90,
          'height': 90
          },350
        ).delay(300).animate({
          'opacity': 1
          },300
        );
        $(this).css('zIndex', 1).animate({
          'left': '-='+$(this).data('zoomPos'),
          'top': '-='+$(this).data('zoomPos'),
          'width': 90,
          'height': 90,
          'border-width': 4
          },350
        ).siblings().each(function(){
          $(this).css('zIndex', 0).animate({
            'left': '+='+$(this).data('unzoomPos'),
            'top': '+='+$(this).data('unzoomPos'),
            'width': 15,
            'height': 15
            },400
          );
        });
      },
      function(){
        $(this).children().animate({
          'width': $(this).data('firstSize'),
          'height': $(this).data('firstSize'),
          'opacity': 0
          },350
        );
        $(this).animate({
          'left': '+='+$(this).data('zoomPos'),
          'top': '+='+$(this).data('zoomPos'),
          'width': $(this).data('firstSize'),
          'height': $(this).data('firstSize'),
          'border-width': 1
          },350
        ).siblings().each(function(){
          $(this).animate({
            'left': '-='+$(this).data('unzoomPos'),
            'top': '-='+$(this).data('unzoomPos'),
            'width': $(this).data('firstSize'),
            'height': $(this).data('firstSize')
            },400
          );
        });
      }
    ).append(imageDiv);
  });
};

function hideCategory(catIndex){
  $('.cat'+catIndex).each(function(){
    $(this).animate({
      'left': startX,
      'top': startY,
      'width': 10,
      'height': 10
      },$(this).data('speed'),function(){
        $(this).hide('slow');
      }
    );
  });
};

function showCategory(catIndex){
  $('.cat'+catIndex).each(function(){
    $(this).show('slow',function(){
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
