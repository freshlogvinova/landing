var typeAnimation = function() {
  
  var interval = 2000;
  

  
  function initTypeAnimation() {
    $loopText             = $('.loopText');
    
    
    
    $loopText.each(function() { 
      
      var $thisLoop              = $(this);
      $thisLoop.loopContent      = $thisLoop.attr('data-content').split(',');
      $thisLoop.currentLoopIndex = 0;
      $thisLoop.intervalType     = setInterval(function() {
          animateType($thisLoop);
        }, interval);
    });
  }
  
  function splitText(target,string) {
    target.each(function() {
      $(this).html(string.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
  }
  
  function animateType($thisLoop) {
    
    if($thisLoop.currentLoopIndex < $thisLoop.loopContent.length - 1) {
      $thisLoop.currentLoopIndex++;
    } else {
      $thisLoop.currentLoopIndex = 0;
    }    
    
    splitText($thisLoop,$thisLoop.loopContent[$thisLoop.currentLoopIndex]);    
    
    var $loopLetters = $thisLoop.find('.letter');
    
    $thisLoop.tlType = new TimelineLite();
    $thisLoop.tlType.staggerFromTo($loopLetters, .5, {
      y: "-=30",
      ease: Elastic.easeOut,
    },{
      y: 0,
      ease: Elastic.easeOut,
    }, .01 );
  }
  
  $(document).ready(function() {
    initTypeAnimation();
  });
  
}();