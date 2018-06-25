var phoneAnimation = function() {
  
  var speed         = 0.3,
      phoneSpeed    = speed,
      interval      = 2000,
      isPaused      = false,
      currentSlideNum, leftSlideX, currentScreenNum, topScreenY,
      lastPhoneScreenNum, animation; 
  
  // var snippetSlides = document.querySelectorAll('.snippets--animated .slide--snippet');
  var phoneSlides   = document.querySelectorAll('.phoneScreen--animated .slide');
  var chatSlide     = document.querySelectorAll('.phoneScreen--animated .slide--chat')[0];
  var chatItems     = document.querySelectorAll('.phoneScreen--animated .slide--chat .chat__item');
  
  // currentSlideNum   = snippetSlides.length - 1;
  
  function initSlides() {
    
    // snippets
    leftSlideX = snippetSlides[0].offsetLeft;
    snippetSlides.forEach(function (el) {
      el.initialOffsetX = el.offsetLeft;
    });
    
  }
  
  

  
  
  /*
    _________________________________________________________
    
    //! Phone
    
  */
  
  function initPhoneScreens() {
    lastPhoneScreenNum = phoneSlides.length - 1;
    phoneSlides.forEach(function (el) {
      el.initialOffsetY = el.offsetTop;
    });
  }
  
  function animatePhoneScreens() {
        
    var lastPhoneScreen = phoneSlides[lastPhoneScreenNum];
    var offsetY         = $(lastPhoneScreen).outerHeight(true);
    var delay           = 0.2;
        
    var tlPhone         = new TimelineLite();
    var offsetTop       = $(lastPhoneScreen).outerHeight();
    

    
    tlPhone.to(phoneSlides,phoneSpeed,{
        y:    "+=" + offsetY,
        ease: Back.easeOut,
      })
      .set(lastPhoneScreen, {
          y: (lastPhoneScreen.initialOffsetY * -1) - lastPhoneScreen.offsetHeight,
        }, '-=' + phoneSpeed)
      .to(lastPhoneScreen, phoneSpeed,{
          y:     lastPhoneScreen.initialOffsetY * -1,
          ease:  Back.easeOut,
        })
      .call(function() {
        
        if (lastPhoneScreen.hasAttribute('data-show-animation')) {
          animateChat();
        }

      });
     
      
      

    
    if(lastPhoneScreenNum > 0 ) {
      lastPhoneScreenNum--;
    } else {
      lastPhoneScreenNum = phoneSlides.length - 1;
    }
    
    
  }
  
  
  function animateChat() {
    var tlPhone     = new TimelineLite({
      // delay: 2
    });
      
      tlPhone.call(function() {
          isPaused = true;
        })
        /* .set(chatItems, {
          x: "-=" + 100 + "%",
        }) */
        .to(phoneSlides,phoneSpeed,{
          x:    "-=" + 100 + "%",
          ease:  Power2.easeOut,
          delay: 1
        })
        .to(chatSlide,phoneSpeed, {
          x: "-=" + 100 + "%",
          ease: Power2.easeOut,
          delay: -phoneSpeed,
        })
        .staggerFrom(chatItems,phoneSpeed * 0.5,{
          cycle: { 
            x: [ "-=" + 140 + "%", "+=" + 140 + "%" ],
            },
          scale: 0.5,
          opacity: 0,
          delay: 0.5,
          ease: Back.easeOut,
        }, 0.5)
        .to(phoneSlides,phoneSpeed,{
          x:     "+=" + 100 + "%",
          ease:  Power2.easeIn,
          delay: 1
        })
        .to(chatSlide,phoneSpeed, {
          x: "+=" + 100 + "%",
          ease: Power2.easeIn,
          delay: -phoneSpeed,
        }).call(function() {
          isPaused = false;
        });
  }
  
  function animateAll() {
    if(!isPaused) {
      animatePhoneScreens();
      // animateSnippets();
    }
  }

  window.addEventListener("load", function(event) {
    initPhoneScreens();
    animateAll();
    animation = setInterval(animateAll, interval);
  });
  
  
  /*
    _________________________________________________________
    
    //! Pause / resume on scroll
    
  */
  
  var panelIntro = document.querySelectorAll('.panel--intro')[0];
  var introController = new ScrollMagic.Controller();
  
  new ScrollMagic.Scene({
          duration:       window.innerHeight * 0.75,
          offset:         0,
          triggerHook:    "onCenter",
          triggerElement: panelIntro
      })
      /* .addIndicators({
        name: 'Intro Controller'
      }) */
      .on("enter", function(e) {
        isPaused = false;
      })
      .on("leave", function(e) {
        isPaused = true;
      })
      .addTo(panelController);

  
  return {
    pauseAnimation : function() {
      clearInterval(animation);
    },
    resumeAnimation : function() {
      animateAll();
      animation = setInterval(animateAll, interval);
    }
  };
  
  
}();