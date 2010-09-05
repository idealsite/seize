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
      var color = randomColor();
    }; //uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuhhhhhhh??? bug
    var size = randomXToY(25,70),
    finalX = randomXToY(50,(window.innerWidth-150)),
    finalY = randomXToY(50,(window.innerHeight-150)),
    speed = Math.round(Math.sqrt(Math.pow((finalX-startX),2)+Math.pow((finalY-startY),2)))*2,
    imageDiv = $('<div/>').css({
      'background-image': 'url('+categories[catIndex].images[i].src+')',
      'background-position': 'center center',
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
      'zoomXPos': finalX-(90-size)/2-1.5,
      'zoomYPos': finalY-(90-size)/2-1.5,
      'unzoomXPos': finalX+(size-15)/2,
      'unzoomYPos': finalY+(size-15)/2,
      'imageBigWidth': categories[catIndex].images[i].w,
      'imageBigHeight': categories[catIndex].images[i].h,
      'speed': speed
    }).css({
      'position': 'absolute',
      'overflow': 'hidden',
      'left': startX,
      'top': startY,
      'width': 10,
      'height': 10,
      'background-color': 'rgba('+color+', 0.6)',
      'border': '1px solid rgba('+color+', 0.8)',
      '-moz-border-radius': 50,
      '-webkit-border-radius': 50
    }).delay(500).animate({
      'left': finalX,
      'top': finalY,
      'width': size,
      'height': size
      },speed
    ).hover(mouseEnter, mouseLeave)
    .toggle(
      function(){
        showImage(this);
      },
      function(){
        hideImage(this);
      }
    ).append(imageDiv);
  });
};

function showImage(target){
  $('.seize').unbind('mouseenter mouseleave').not(target).unbind('click');
  $(target).stop().animate({
    'left': startX-($(target).data('imageBigWidth')/2),
    'top': startY-($(target).data('imageBigHeight')/2),
    'width': $(target).data('imageBigWidth'),
    'height': $(target).data('imageBigHeight'),
    'border-width': 4,
    '-moz-border-radius': 4,
    '-webkit-border-radius': 4
    },500
  ).children().stop().animate({
    'width': $(target).data('imageBigWidth'),
    'height': $(target).data('imageBigHeight'),
    'opacity': 1,
    '-moz-border-radius': 0,
    '-webkit-border-radius': 0
    },500
  );
};

function hideImage(target){
  $(target).children().css('opacity', 0).stop().animate({
    'width': $(target).data('firstSize'),
    'height': $(target).data('firstSize'),
    '-moz-border-radius': 50,
    '-webkit-border-radius': 50
    },500
  );
  $(target).stop().animate({
    'left': $(target).data('firstX'),
    'top': $(target).data('firstY'),
    'width': $(target).data('firstSize'),
    'height': $(target).data('firstSize'),
    'border-width': 1,
    '-moz-border-radius': 50,
    '-webkit-border-radius': 50
    },500, function(){
      $('.seize').each(function(){
        $(this).hover(mouseEnter, mouseLeave)
        .toggle(
          function(){
            showImage(this);
          },
          function(){
            hideImage(this);
          }
        );
      });
    }
  ).siblings().each(function(){
    $(this).stop().animate({
      'left': $(this).data('firstX'),
      'top': $(this).data('firstY'),
      'width': $(this).data('firstSize'),
      'height': $(this).data('firstSize')
      },400
    );
  });
};

function mouseEnter(){
  $(this).children().stop().animate({
    'width': 90,
    'height': 90
    },350, function(){
      $(this).animate({
        'opacity': 1
        },350
      );
    }
  );
  $(this).css('zIndex', 1).stop().animate({
    'left': $(this).data('zoomXPos'),
    'top': $(this).data('zoomYPos'),
    'width': 90,
    'height': 90,
    'border-width': 4
    },350
  ).siblings().each(function(){
    $(this).css('zIndex', 0).stop().animate({
      'left': $(this).data('unzoomXPos'),
      'top': $(this).data('unzoomYPos'),
      'width': 15,
      'height': 15
      },400
    );
  });
};

function mouseLeave(){
  $(this).children().css('opacity', 0).stop().animate({
    'width': $(this).data('firstSize'),
    'height': $(this).data('firstSize')
    },350
  );
  $(this).stop().animate({
    'left': $(this).data('firstX'),
    'top': $(this).data('firstY'),
    'width': $(this).data('firstSize'),
    'height': $(this).data('firstSize'),
    'border-width': 1
    },350
  ).siblings().each(function(){
    $(this).stop().animate({
      'left': $(this).data('firstX'),
      'top': $(this).data('firstY'),
      'width': $(this).data('firstSize'),
      'height': $(this).data('firstSize')
      },400
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

function randomXToY(minVal,maxVal){
  return Math.round(Math.random()*(maxVal-minVal))+minVal;
};

function randomColor(){
  var rint = Math.round(0xffffff*Math.random());
  return (rint>>16)+','+(rint>>8&255)+','+(rint&255);
}; //http://develobert.blogspot.com/2008/06/random-color-generation-with-javascript.html
