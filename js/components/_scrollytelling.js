var scrollyTelling = function(){
  

  
  var win               = window,
      doc               = document,
      winH              = win.innerHeight,
      headerHeight      = 80,
      currentPanel      = 0,
      keyboardScrolling = false;
  
  var panelController   = new ScrollMagic.Controller();
                        
  var phone             = document.getElementById("phone"),
      phone_xs          = document.getElementById("phone--xs"),
      backend           = document.getElementById("screen--backend"),
      backend_xs        = document.getElementById("screen--backend--xs"),
      panelsPhone       = document.querySelectorAll('[data-phonescreen]'),
      panelsAnimation   = document.querySelectorAll('[data-animation]'),
      scrollPanels      = document.querySelectorAll('.panel--fullscreen');
                        
  var animatePushChat   = false;
    
  
  
   
  /* Snap panels on scroll */ 
  function initScrollPanels() {
    
    // console.log('scrollpanels')
    
    for(var i=0; i<scrollPanels.length; i++) {
      var me        = scrollPanels[i];
      var $me       = $(me);
      var scrolltoPos = 0;
      me.panelIndex = i;
      me.nextPanel  = (i < scrollPanels.length) ? i + 1 : null;
      me.prevPanel  = (i > 0) ? i - 1 : null;
      
      

      
      new ScrollMagic.Scene({
              duration:       $(me).outerHeight(true), // winH,
              offset:         0, // "50%", // 80,
              triggerHook:    0.75, // "onCenter",
              triggerElement: me
          })
          .on("enter", function(e) {
            scrolltoPos  = Math.round($(e.target.triggerElement()).offset().top - headerHeight);
            currentPanel = e.target.triggerElement().panelIndex;
            if (keyboardScrolling === false) {
              TweenMax.to(window, 0.5, {
                  scrollTo: { 
                    y:        scrolltoPos, 
                    autoKill: false,
                    },
                  // ease:     Power3.easeOut,
                });
            }
            
          })
          // .addIndicators({ name: 'Scroll snap ' })
          .addTo(panelController);
          
    }
  }
  

  
  
  // switch smartphone screens on scroll
    
  function phoneScreenHandler() {
  
    for(var i=0; i<panelsPhone.length; i++) {
      
      var me      = panelsPhone[i];
      var $me     = $(me);
      var slideTo;
      
      new ScrollMagic.Scene({
              duration:       $(me).outerHeight(true), // winH,
              offset:         winH / 4 * -1, // 80,
              triggerHook:    "onCenter",
              triggerElement: me
          })
          .on("enter", function(e) {
            slideTo = e.target.triggerElement().getAttribute('data-phonescreen');
            phoneSwiper.slideTo(slideTo);
            phoneSwiper__xs.slideTo(slideTo);
            switch(slideTo) {
              
              case "0":
                phoneAnimation__Stream.start();
                break;
              case "1":
                tl_Push.restart();
                break;
              case "2":
                phoneAnimation__Brand.start();
                break;
              case "4":
                phoneAnimation__Chat.start();
                break;
              case "5":
                phoneAnimation__Channels.start();
                break;
              case "7":
                phoneAnimation__Integrations.start();
                break;
            }
  
          })
          .on("leave", function(e) {
            switch(slideTo) {
              case "0":
                phoneAnimation__Stream.stop();
                break;
              case "1":
                tl_Push.kill(); // pause();
                break;
              case "2":
                phoneAnimation__Brand.stop();
                break;
              case "7":
                phoneAnimation__Integrations.stop();
                break;

            }
          })
          // .addIndicators({ name: 'Phone screen: ' + slideTo })
          .addTo(panelController);
    }
  }
  
  
  function animationHandler() {
    
    
    for(var i=0; i<panelsAnimation.length; i++) {
      
      var me               = panelsAnimation[i];
      var $me              = $(me);
      var currentAnimation = me.getAttribute('data-animation');
      
      new ScrollMagic.Scene({
              duration:       $(me).outerHeight(), // winH,
              offset:         0, // winH / 4 * -1, // 80,
              triggerHook:    "onCenter",
              triggerElement: me
          })
          .on("enter", function(e) {
            currentAnimation = e.target.triggerElement().getAttribute('data-animation');
            
            switch(currentAnimation) {
              
              case "backend__cardsDropIn":
                animation__Backend.cardDropStart();
                break;
              case "backend__integrate":
                animation__Backend.integrateStart();
                animation__Backend__xs.integrateStart();
                console.log("Integrate Start");
                break;
              case "backend__slack":
                animation__Backend.slackStart();
                animation__Backend__xs.slackStart();
                break;
              case "backend__users":
                animation__Backend.usersStart();
                animation__Backend__xs.usersStart();
                break;
                
            }
            
          })
          .on("leave", function(e) {
            currentAnimation = e.target.triggerElement().getAttribute('data-animation');
            
            switch(currentAnimation) {
              
              case "backend__cardsDropIn":
                animation__Backend.cardDropPause();
                break;
              case "backend__integrate":
                animation__Backend.integrateStop();
                animation__Backend__xs.integrateStop();
                console.log("Integrate Stop");
                break;
              case "backend__slack":
                animation__Backend.slackStop();
                animation__Backend__xs.slackStop();
                break;
              case "backend__users":
                animation__Backend.usersStop();
                animation__Backend__xs.usersStop();
                break;
                
            }
          })
          .on("update", function() {
            scrollDirection = panelController.info("scrollDirection");
          })
          // .addIndicators({ name: 'Animation: ' + currentAnimation })
          .addTo(panelController);
    };
    
  };
  
  
  
  // change background color on scroll
  
  function bgColorHandler() {
    
    var panelsColor = document.querySelectorAll('[data-bodybackground]');
    
    for(var i=0; i<panelsColor.length; i++) {
      
      var me  = panelsColor[i];
      var $me = $(me);
      
      new ScrollMagic.Scene({
              duration:       $(me).outerHeight(), // me.offsetHeight, // winH,
              offset:         0, // -80,
              triggerHook:    "onCenter",
              triggerElement: me
          })
          // .addIndicators({ name: 'Color' })
          .on("enter", function(e) {
            var bodyColor = e.target.triggerElement().getAttribute('data-bodybackground');
            document.body.setAttribute('data-bodybackground', bodyColor);
          })
          .addTo(panelController);
      
    }
  }
  
  
  
  // scroll smartphone in / out (dektop)
  
  function phoneScrollHandler() {
    
    var currentPhone, durationOffset;
    
    if(getBreakpoint() === 'xs') {
      currentPhone   = phone_xs;
      durationOffset = 0;
    } else {
      currentPhone   = phone;
      durationOffset = -260;
    }
    
    var panelsShowPhone = document.querySelectorAll('[data-showphone]');
    var phoneInitialPos = $(currentPhone).css(['top','bottom']);
    var phoneHeight     = $(currentPhone).outerHeight(true);
    
    var phoneBottom     = (getBreakpoint() === 'xs') ? 'auto' : phoneInitialPos.bottom;
    var phoneTop        = (getBreakpoint() === 'xs') ? phoneInitialPos.top : 'auto'
    // console.log(phoneInitialPos);
    
    for(var i=0; i<panelsShowPhone.length; i++) {
      
      var me       = panelsShowPhone[i];
      var duration = me.clientHeight;
      
      new ScrollMagic.Scene({
              duration:       duration + durationOffset,
              offset:         0, // 80,
              triggerHook:    "onEnter",
              triggerElement: me
          })
          // .addIndicators({ name: 'ShowPhone' })
          .on("enter", function(e) {
            
            TweenMax.set(currentPhone, {
                position: "fixed",
                top:  phoneTop,               
                bottom: phoneBottom
              });
          
          })
          
          .on("leave", function(e) {
              // console.log("enter:" + e.progress);
              TweenMax.set(currentPhone, {
                position: "absolute",
                top: function() {
                  return win.scrollY + parseInt(phoneInitialPos.top);
                },
                bottom: 'auto'
              });
            })
          // .setTween(tweenIn)
          .addTo(panelController);
      
    }
    
  }
  

  
  
  
  
  

  
  
  
  
  
  
  
  
  
  // scroll backend screen in / out
  
  function backendScrollHandler() {
    
    
    var currentBackend, durationOffset, offset, backendTweenIn, backendTweenOut;
    var backendInitialPos, backendBottom, backendTop;
    var speed = 0.5;
    
    if(getBreakpoint() === 'xs') {
      currentBackend   = backend_xs;
      offset           = 0;
      backendTop       = 80;
    } else {
      currentBackend   = backend;
      offset           = 80;
      backendTop       = 140;
    }
    
    var panelShowBackend = document.querySelectorAll('[data-showbackend="true"]')[0];
    panelInitialPos  = $(currentBackend).css(['top','bottom']);
      

    var panelTop       = panelShowBackend.offsetTop;
    var duration       = panelShowBackend.clientHeight;

    
    new ScrollMagic.Scene({
            duration:       duration,
            offset:         offset,
            triggerHook:    "onCenter",
            triggerElement: panelShowBackend
        })
        // .addIndicators({ name: 'Show Backend' })
        .on("enter", function(e) {
          TweenMax.to(currentBackend, speed, {
              position: "fixed",
              top:  backendTop,               
            });
        
        })
        
        .on("leave", function(e) {
            TweenMax.to(currentBackend, speed, {
              position: "fixed",
              top: function() {
                if(scrollDirection === "FORWARD") {
                  return '-100vh';
                } else {
                  return panelInitialPos.top;
                }
              },
            });
          })
          
        .addTo(panelController);
        


    
    

    

    
  }
  









  
  
  
  /*
    _________________________________________________________
    
    //! Animate particular screens
    
  */
  
  
  
  
  // Push notes
  
  // Push notes / chat
  var tl_Push = new TimelineLite({
      paused: true,
      onComplete: function() {
        this.restart();
      }
    });
  
  function initPushAnimation() {
    
    var phoneSlidePush = doc.querySelectorAll('.phoneSlide--push')[0];
    var pushItem       = doc.querySelectorAll('.phoneScreen--push .pushMessage')[0];

  
    
    tl_Push
      .set(pushItem, {
          scale:   0.5,
          opacity: 0,
        })
      .to(pushItem, 0.3, {
          opacity: 1,
          ease:    Power1.easeOut
        }, 0.25)
      .to(pushItem, 0.8, {
          scale:   1,
          ease:    Elastic.easeOut
        }, 0.25)
      .to(pushItem, 1, {
          scale:   0.5,
          opacity: 0,
          ease:    Power4.easeIn,
        }, "+=8");
  }
  
  
  function splitText(target) {
    $(target).each(function() {
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
  }
  
  /*
    _________________________________________________________
    
    //! Keyboard arrow scrolling
    
  */
  
  function handleKeyboardScroll(key) {

    if(key === 40) {
      currentPanel = (currentPanel < scrollPanels.length) ? currentPanel + 1 : currentPanel;
    } else if (key === 38) {
      currentPanel = (currentPanel > 0) ? currentPanel - 1 : 0;
    } else if (key === 36) {
      currentPanel = 0;
    } else {
      return false;
    }
    scrolltoPos = Math.round($(scrollPanels[currentPanel]).offset().top - headerHeight);
    keyboardScrolling = true;
    TweenMax.to(win, 0.5, {
      scrollTo: { y: scrolltoPos },
      onComplete: function() { 
          keyboardScrolling = false; 
        }
    });
  }
  
  /*
    _________________________________________________________
    
    //! Panel pagination
    
  */
  
  function initPanelPagination() {
    
    var panels = document.querySelectorAll('.panel');
    
    $('.panel').each(function(index) {
      
      var me        = document.querySelectorAll('.panel')[index];
      var $me       = $(this);
      $('#panelPagination').append('<div class="panelPagination__bullet"></div>');
      var $myBullet = $('.panelPagination__bullet')[index];
      
      
      
      new ScrollMagic.Scene({
            duration:       $me.outerHeight(true), // winH,
            offset:         0,
            triggerHook:    "onCenter",
            triggerElement: me
        })
        .on("enter", function(e) {
          $($myBullet).addClass('active');
        })
        .on("leave", function(e) {
          $($myBullet).removeClass('active');
        })
        // .addIndicators({ name: 'Panel: ' })
        .addTo(panelController);

        
    });
    


  }
  
  var scrollPosPrev  = win.pageYOffset;
  var scrollingSpeed = 0;
  
  function detectScrollingSpeed() {
    var scrollPosCurrent = win.pageYOffset;
    setTimeout(function(){ 
      scrollingSpeed       = Math.abs(scrollPosCurrent - scrollPosPrev);
      // console.log('Speed: ' + scrollingSpeed);
      scrollPosPrev        = scrollPosCurrent;
    }, 100);
    
    
  }
  
  
  function initScrollytelling() {
    initPhoneSwiper();
    initPhoneSwiper__xs();
    // initPhoneCasesSwiper();
    initPushAnimation();
    phoneScreenHandler();
    bgColorHandler();
    phoneScrollHandler();
    backendScrollHandler();
    animationHandler();
  }
  
  
  function scrollingHandlers() {
    detectScrollingSpeed();
  }
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  $(document).ready(function() {
    // console.log("Event: $ ready");
    // initScrollytelling();
    initPanelPagination();
    initScrollPanels();

  });
  
  win.addEventListener("load", function(event) {
    // console.log("Event: load");
    initScrollytelling();
  });
  
  win.addEventListener("scroll", scrollingHandlers);
  
  win.addEventListener ('keydown', function (event) {
     // console.log("Key pressed: " + event.which);
     handleKeyboardScroll(event.which);
  });
  
  
  return {
    
    reInit : function() {
      initScrollytelling();
    }
  
  };
  
}();