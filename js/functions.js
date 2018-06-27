

var win         = window;
var doc         = document;
var winW        = win.innerWidth;
var winH        = win.innerHeight;
var currentBreakpoint;


// Adaptive breakpoints from bootstrap


var breakpoints = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200
};

var containerSizes = {
	sm: 540,
	md: 720,
	lg: 960,
	xl: 1140
};


var phoneSwiper, phoneSwiper__xs, phoneCasesSwiper, casesContentSwiper;
var panelController = new ScrollMagic.Controller();
var scrollDirection;


// var phone           = document.getElementById("phone");
// var backend         = document.getElementById("screen--backend");

var getBreakpoint = function() {

	var size = 'xs';

	if (winW < breakpoints.sm) {
		size = 'xs';
	} else if ((winW >= breakpoints.sm) && (winW < breakpoints.md)) {
		size = 'sm';
	} else if ((winW >= breakpoints.md) && (winW < breakpoints.lg)) {
		size = 'md';
	} else if ((winW >= breakpoints.lg) && (winW < breakpoints.xl)) {
		size = 'lg';
	} else if (winW >= breakpoints.xl) {
		size = 'xl';
	}

	return size;
	// return breakpoints[breakpoint];
};

currentBreakpoint = getBreakpoint();


function handleResize() {
	winW              = win.innerWidth;
	winH              = win.innerHeight;
	currentBreakpoint = getBreakpoint();

	scrollyTelling.reInit();
}


/*
  _________________________________________________________

  //! Inject SVGs

*/

var mySVGsToInject = document.querySelectorAll('img.inject-me');
SVGInjector(mySVGsToInject);






// __________________________________________________
//
//
//			! Panel slider to switch between phone screens.

// desktop

function initPhoneSwiper() {
	phoneSwiper = new Swiper('.swiper--phone--screens', {
		speed:        200,
		spaceBetween: 0,
		effect:       'fade', // 'slide',
		fadeEffect: {
			crossFade: true, // false,
		},
		simulateTouch: false
	});
}


// mobile

function initPhoneSwiper__xs() {
	phoneSwiper__xs = new Swiper('.swiper--phone--screens--xs', {
		speed:        200,
		spaceBetween: 0,
		effect:       'fade', // 'slide',
		fadeEffect: {
			crossFade: true, // false,
		},
	});
}


// Cases screen swiper, desktop

function initPhoneCasesSwiper() {
	phoneCasesSwiper = new Swiper('.swiper--phone--cases', {
		speed:        200,
		spaceBetween: 0,
		effect:       'slide',
		fadeEffect: {
			crossFade: true, // false,
		},
		simulateTouch: false
	});

	casesContentSwiper = new Swiper('.swiper--cases--content', {
		speed:        200,
		spaceBetween: 0,
		effect:       'fade',
		fadeEffect:   {
			crossFade: true, // false,
		},
		controller:   {
			control: phoneCasesSwiper
		},
		pagination: {
			el: '.swiper-pagination--cases',
			type: 'bullets',
		},
		simulateTouch: false
	});

	$('.useCases__menu [data-showcase]').each(function() {
		var $me = $(this);

		$me.click(function(e) {
			e.preventDefault();
			$('.useCases__menu [data-showcase].active').removeClass('active');
			$me.toggleClass('active');

			var nextSlide = $me.attr('data-showcase')
			casesContentSwiper.slideTo(nextSlide);

		});
	});


}



// Set date and time inside phone screen.

function setPhoneScreenDate() {
	var d          = moment().format('dddd, MMMM Do');
	var t          = moment().format('H:mm'); // d.getTime();
	var $phoneTime = $('.lockedScreen--time');
	var $phoneDate = $('.lockedScreen--date');

	$phoneTime.html(t);
	$phoneDate.html(d);
}


// Set up pulldown navigation / burger.

function initNavdrop() {
	$('[data-toggle-navlayer]').click(function(e) {
		$('html').toggleClass('navlayer--open');
	});
}

$(document).ready(function() {

	setPhoneScreenDate();
	intPhoneDate = setInterval(setPhoneScreenDate, 1000 * 60);
	// console.log('Ratio: ' + window.devicePixelRatio);

	$('a[href=\\#]').click(function(e) {
		e.preventDefault();
	});

	initPhoneCasesSwiper();
	initNavdrop();


});


$(window).on("throttledresize", function( event ) {
	handleResize();
});






var phoneAnimation__Chat = function() {
  
  var chatItems  = document.querySelectorAll('.phoneScreen--chat.slide--chat .chat__item');
  var tl_Chat     = new TimelineLite({
    delay: 0.5
  });
  
  
  function animateChat() {
    
      
    tl_Chat
      .staggerFromTo(chatItems, 0.2,{
        cycle: { 
          x: [ "-" + 140 + "%", 140 + "%" ],
          },
        scale: 0.5,
        opacity: 0,
        ease: Back.easeOut,
      },{
        x: 0 + "%",
        scale: 1,
        opacity: 1,
        ease: Back.easeOut,
      }, .1);
  }
  
  return {
    
    start : function() {
      animateChat();
      // tl_Chat.restart();
    }

  };
  
}();


var phoneAnimation__Stream = function() {
  
  var speed         = 1, // 0.3,
      phoneSpeed    = speed,
      interval      = 3000,
      isPaused      = false,
      isPausedChat  = false,
      currentSlideNum, leftSlideX, currentScreenNum, topScreenY,
      lastPhoneScreenNum, animation; 
  
  var phoneSlides   = document.querySelectorAll('.phoneScreen--animated .slide');
  var chatSlide     = document.querySelectorAll('.phoneScreen--animated .slide--chat')[0];
  var chatItems     = document.querySelectorAll('.phoneScreen--animated .slide--chat .chat__item');
  
  
  function initPhoneStream() {
    lastPhoneScreenNum = phoneSlides.length - 1;
    phoneSlides.forEach(function (el) {
      el.initialOffsetY = el.offsetTop;
    });
  }
  
  
  var tl_Phone        = new TimelineLite();
  
  function animatePhoneStream() {
        
    var lastPhoneScreen = phoneSlides[lastPhoneScreenNum];
    var offsetY         = $(lastPhoneScreen).outerHeight(true);
    var delay           = 0.2;
        
    
    var offsetTop       = $(lastPhoneScreen).outerHeight();
    
  
    
    tl_Phone.set(lastPhoneScreen, {
          y: (lastPhoneScreen.initialOffsetY * -1) - lastPhoneScreen.offsetHeight,
        }, '-=' + phoneSpeed)
      .to(phoneSlides,phoneSpeed,{
          y:    "+=" + offsetY,
          ease: Power4.easeOut,
        })
      .to(lastPhoneScreen, phoneSpeed,{
          y:     lastPhoneScreen.initialOffsetY * -1,
          ease:  Power4.easeOut,
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
  
  
  /*
    _________________________________________________________
    
    //! Chat
    
  */
  
  var tl_Chat     = new TimelineLite();
  
  function animateChat() {
    
      
      tl_Chat.call(function() {
          isPausedChat = true;
        })
        .to([ phoneSlides, chatSlide ], 0.5,{
          x:    "-=" + 90 + "%",
          ease:  Power2.easeOut,
          delay: 1
        })
        .staggerFrom(chatItems,0.2,{
          cycle: { 
            x: [ "-=" + 140 + "%", "+=" + 140 + "%" ],
            },
          scale:   0.5,
          opacity: 0,
          delay:   0.1,
          ease:    Back.easeOut,
        }, 0.2)
        .to([phoneSlides,chatSlide], 0.5,{
          x:     "+=" + 90 + "%",
          ease:  Power2.easeIn,
          delay: 1
        })
        .call(function() {
          isPausedChat = false;
        });
  }
  
  function animateAll() {
    if((!isPaused) && (!isPausedChat)) {
      animatePhoneStream();
    }
  }
  
  window.addEventListener("load", function(event) {
    initPhoneStream();
    animateAll();
    animation = setInterval(animateAll, interval);
  });
  
  // Handlers
  
  return {
    
    start : function() {
      isPaused = false;
      // console.log("Home start");
    },
    
    stop : function() {
      isPaused = true;
      // console.log("Home stop");
    }
  
  };
  
  
  
  
}();


var phoneAnimation__Channels = function() {

  var channelSwitcher = document.querySelectorAll('.phoneScreen__channelSwitcher');
  var contentDimmer   = document.querySelectorAll('.phoneScreen__dimmer')[0];
  var channelItems    = document.querySelectorAll('.phoneScreen__channelSwitcher li');
  var tl_Channels     = new TimelineLite({
    delay: 1
  });


  function animateChannel() {


    tl_Channels
      .set(channelSwitcher, {
            y: "-=100%"
          }
        )
      .set(contentDimmer, {
          opacity: 0,
        })
      .add("switcher-open", "+=1")
      .to(contentDimmer, 0.3, {
          opacity: 0.6,
        }, "switcher-open")
      .to(channelSwitcher, 0.3, {
          y: "0%",
          ease: Power4.easeOut
        }, "switcher-open");
  }

  return {

    start : function() {
      animateChannel();
    }

  };

}();


var phoneAnimation__Brand = function() {
  
  // App icon + branding
  
  var tl_Icon;
  var appIcon,
      appIconSquare,
      appIconBrand,
      appIconCircle,
      appIconTitle,
      phoneSlides,
      appHeader,
      bumpSpeed       = 0.8,
      appIconColorOne = '#F6704D',
      appIconColorTwo = '#f8f8f8'; // '#FFD138';
  
  function initAppIconAnimation() {
    
    appIcon            = doc.querySelectorAll('.phoneScreen--appicon .img--appicon')[0];
    appIconSquare      = doc.querySelectorAll('.phoneScreen--appicon #appicon_square')[0];
    appIconBrand       = doc.querySelectorAll('.phoneScreen--appicon #appicon__branding')[0];
    appIconCircle      = doc.querySelectorAll('.phoneScreen--appicon #appicon__oval')[0];
    appIconTitle       = doc.querySelectorAll('.phoneScreen--appicon .appicon__title')[0];
    phoneSlides        = doc.querySelectorAll('.slide--yourbrand .phoneScreenSlide');
    appHeader          = doc.querySelectorAll('.slide--yourbrand .phoneScreenSlide .phoneScreen__header')[0];
    // appIconFont        = doc.querySelectorAll('.phoneScreen--appicon .appicon__font')[0];
    // appIconLine        = doc.querySelectorAll('.phoneScreen--appicon .appicon__font .line');
    // appIconColors      = doc.querySelectorAll('.phoneScreen--appicon .appicon__colors')[0];
    // appIconColorRed    = doc.querySelectorAll('.phoneScreen--appicon .appicon__color--red')[0];
    // appIconColorYellow = doc.querySelectorAll('.phoneScreen--appicon .appicon__color--yellow')[0];
    
    // splitText(appIconLine);
    //appIconLetters     = doc.querySelectorAll('.phoneScreen--appicon .appicon__font .letter');
    tl_Icon            = new TimelineLite({
        paused: true,
      });
    
    tl_Icon
      // .addLabel("logoBumpIn",1)
      // .addLabel("titleBumpIn",3)
      // .addLabel("appBumpIn",3)
      
      // reset
      .set(appIcon, {
              scale:   8,
              // opacity: 0,
            }, 0)
      .set([appIconBrand, appIconTitle], {
          scale:   5,
          opacity: 0,
        }, 0)
      .set(appIconCircle, {
          attr:    { fill: "#eeeeee" },
        }, 0)
      .set(appIconSquare, {
          attr:    { 
              fill: 'rgba(255,255,255,0.5)',
              rx:   14
            }, // "#ffffff"
        })
      
        
      // animate icon  
      .to(appIcon, 0.5, {
          scale:   1,
          opacity: 1,
          delay:   0.5,
          ease:    Back.easeOut
        })
        
      .addLabel("logoBumpIn")  
      .to(appIconSquare, bumpSpeed, {
          attr:    {rx: 44},
          ease:    Power4.easeOut
        },"logoBumpIn")
      .to(appIcon, bumpSpeed, {
          scale:   2,
          ease:    Power4.easeOut
        }, "logoBumpIn")
      .to(appIconBrand, bumpSpeed, {
          // scale:   0.3,
          opacity: 1,
          ease:    Power4.easeOut
        }, "logoBumpIn")
      .to(appIconSquare, bumpSpeed, {
          attr:    {rx: 14},
          ease:    Elastic.easeOut
        }, "logoBumpIn+=0.2")
      .to(appIcon, bumpSpeed, {
          scale:   1,
          ease:    Elastic.easeOut
        }, "logoBumpIn+=0.2")
  
      
      .to(appIconSquare, 0.5, {
          attr:    { fill: appIconColorTwo },
          ease:    Power4.easeOut,
        },"-=" + bumpSpeed)
      .to(appIconCircle, 0.5, {
          attr:    { fill: appIconColorOne },
          ease:    Power4.easeOut,
        },"-=" + bumpSpeed)
      
      
      .to(appIconTitle, bumpSpeed, {
          scale:   1,
          opacity: 1,
          ease:    Elastic.easeOut
        }, "logoBumpIn+=0.2");
      
      
      //- .addLabel("appBumpIn","+=0.5")
      //- .to(appIcon, .5, {
      //-     scale:   8,
      //-     ease:    Power4.easeOut
      //-   },"appBumpIn")
      //- .to(appIconBrand, .5, {
      //-     opacity: 0,
      //-     ease:    Power4.easeOut
      //-   }, "appBumpIn")
      //- .to(appIconSquare, .5, {
      //-     attr:    { fill: '#ccc' },
      //-     ease:    Power4.easeOut,
      //-   },"appBumpIn")
      
      //- // slide to stream
      //- .set(appHeader, {
      //-   y: -100
      //- })
      //- .to(phoneSlides, 0.5, {
      //-   x: "-=100%",
      //-   ease: Power4.easeOut
      //- })
      //- .to(appHeader, 0.3, {
      //-   y: 0,
      //-   ease: Expo.easeOut
      //- }, "-=0.3");
      
  
  }
  
  
  win.addEventListener("load", function(event) {
    initAppIconAnimation();
  });
  
  
  return {
    
    start : function() {
      tl_Icon.restart();
      // tl_Chat.restart();
    },
    
    stop : function() {
      tl_Icon.kill();
      // animateChat();
      // tl_Chat.restart();
    }
  
  };
  
  
  
}();


var phoneAnimation__Integrations = function() {
  
  var tl_Integrations = new TimelineLite({
        paused: true,
      });
  
  var screenWrapper   = document.querySelectorAll('.slide--integrations .phoneScreenSlideWrapper')[0];
  
  function initAnimation() {
    tl_Integrations
      .set(screenWrapper, {
        x: 0
      })
      .to(screenWrapper, 0.5, {
        x:    "-=100%",
        ease: Power4.easeOut,
      }, "+=1")
      .to(screenWrapper, 0.5, {
        x:    "-=100%",
        ease: Power4.easeOut,
      }, "+=4")
      .to(screenWrapper, 0.5, {
        x:    "-=100%",
        ease: Power4.easeOut,
      }, "+=4")
      
      .to(screenWrapper, 0.5, {
        x:    "0%",
        ease: Power4.easeOut,
      }, "+=4")
      .call(function() {
        tl_Integrations.restart();
      });
  }
  
  initAnimation();
  
  // Handlers
  
  return {
    
    start : function() {
      tl_Integrations.restart();
    },
    
    stop : function() {
      tl_Integrations.kill();
    }
  
  };
  
  
}();


var animation__Backend = function() {

  var interval       = 3000;

  var win             = window,
      doc             = document,
      winH            = win.innerHeight;

  var backendBrowser         = document.querySelectorAll('#screen--backend .screenBackend__browser')[0],
      backendContent         = document.querySelectorAll('#screen--backend .screenBackend__content')[0],
      backendCards           = document.querySelectorAll('#screen--backend .screenBackend__card'),
      backendIntIconWrapper  = document.querySelectorAll('#screen--backend .screenBackend__integrations')[0],
      backendIntIcons        = document.querySelectorAll('#screen--backend .intIcon'),
      intMeta                = document.querySelectorAll('#screen--backend .screenBackend__integrations .metaLayer')[0],
      //- backendIntArrow        = document.querySelectorAll('#screen--backend .intArrow')[0],
      backendSlack           = document.querySelectorAll('#screen--backend .screenBackend__slackBrowser')[0],
      slackMeta              = document.querySelectorAll('#screen--backend .screenBackend__slackBrowser .metaLayer')[0],
      backendUsers           = document.querySelectorAll('#screen--backend .screenBackend__users')[0],
      backendUserCards       = document.querySelectorAll('#screen--backend .screenBackend__userCard');

  var currentCardNum         = backendCards.length - 1;
  var currentCard            = backendCards[currentCardNum];

  var dropIsPaused           = true,
      dimBackendOpacity      = 0.6,
      elOuterPos             = 100,
      intIconsCenter         = 0,
      backendBottomOut       = 330; // winH * 0.4,
      speed                  = 0.5;


  var tl_Cards               = new TimelineLite();
  var tl_Integrations        = new TimelineLite();
  var tl_Slack               = new TimelineLite();
  var tl_Users               = new TimelineLite();



  /*
    _________________________________________________________

    //! Card drop

  */

  // Save card´s initial position
  backendCards.forEach(function (el) {
    el.initialOffsetY = el.offsetTop;
  });


  function animateCardDropIn(options) {

    var dropSpeed = speed;
    var dropDelay = null;

    if(typeof(options) !== 'undefined') {
      if(typeof(options.speed) !== 'undefined') {
        dropSpeed = options.speed;
      }
      if(typeof(options.speed) !== 'undefined') {
        dropDelay = "+=" + options.delay;
      }
    }

    currentCard    = backendCards[currentCardNum];
    var offsetY    = $(currentCard).outerHeight(true);

    tl_Cards
      .set(currentCard, {
        y: function() {
            var y = currentCard.initialOffsetY * -1 - offsetY;
            // console.log(y);
            return y;
          },
      })
      .to(backendCards, dropSpeed, {
        y:    "+=" + offsetY,
        ease: Power3.easeOut,
      }, dropDelay);

    if(currentCardNum > 0) {
      currentCardNum--;
    } else {
      currentCardNum = backendCards.length - 1;
    }

  }

  function cardDropIn() {
    if(!dropIsPaused) {
      animateCardDropIn();
    }
  }



  /*
    _________________________________________________________

    //! Integrations

  */

  function initIntegrations() {
    backendIntIcons.forEach(function (el) {
      el.initialX = el.offsetLeft;
    });
    intIconsCenter = backendIntIconWrapper.offsetWidth / 2;
  }


  function integrationsIn() {




    tl_Integrations
      .set(backendIntIcons, {
          y:       -elOuterPos,
          opacity: 0,
          scale:   1.4,
        })
      .set(intMeta, {
          opacity: 0,
          y: -100
        })
      .to(backendBrowser, speed, {
          y: backendBottomOut,
          // opacity: dimBackendOpacity,
          ease:    Power3.easeOut
        })
      .staggerTo(backendIntIcons, speed * 0.25, {
          y:       0,
          opacity: 1,
          scale:   1,
          ease:    Power4.easeOut
        },0.03, "-=" + speed)
      .to(intMeta, speed * 0.5, {
          opacity: 1,
          y:       0,
          ease:    Power4.easeOut
        },"-=0.2");

  }

  function integrationsOut() {
    tl_Integrations
      .add("integrationsOut")
      .to(intMeta, speed * 0.5, {
          opacity: 0,
          y:       -100,
          ease:    Power4.easeIn
        }, "integrationsOut")
      .staggerTo(backendIntIcons, speed * 0.25, {
        y:       function() { return (scrollDirection === "FORWARD") ? -elOuterPos : elOuterPos; },
        x:       0,
        opacity: 0,
        scale:   1.4,
        ease:    Power4.easeOut
      },0.03, "integrationsOut")
      .to(backendBrowser, speed * 0.5, {
        y:       function() { return (scrollDirection === "FORWARD") ? null : 0; },
        ease:    Power3.easeIn
      }, "integrationsOut");

  }








  /*
    _________________________________________________________

    //! Slack

  */


  function slackIn(direction) {

    tl_Slack
      .add("slackIn")
      .set(backendSlack, {
          y:       -200,
          opacity: 0,
          ease:    Power4.easeOut
        }, "slackIn")
      .to(backendBrowser, speed, {
          y: function() { return (scrollDirection === "FORWARD") ? null : backendBottomOut; },
          ease:    Power3.easeInOut
        }, "slackIn")


      .to(backendSlack, speed, {
          y:       0,
          opacity: 1,
          ease:    Power4.easeOut
        }, "slackIn+=0.2")

      .to(slackMeta, speed * 0.5, {
          opacity: 1,
          y:       0,
          ease:    Power4.easeOut
        }, "slackIn+=0.3");
  }

  function slackOut(direction) {

      tl_Slack
        .add("slackOut")

      .to(slackMeta, speed * 0.5, {
          opacity: 0,
          y:       -100,
          ease:    Power4.easeIn
        }, "slackOut")
      .to(backendSlack, speed * 0.5, {
          y:       -200,
          // x:       -300,
          opacity: 0,
          ease:    Power4.easeOut
        }, "slackOut")
      .to(backendBrowser, speed, {
          // x:       0,
          // scale:   1,
          y:       function() { return (scrollDirection === "FORWARD") ? 0 : null; },
          ease:    Power3.easeOut
        }, "slackOut");
    }



  /*
    _________________________________________________________

    //! Users / Access

  */

  function usersIn() {
    tl_Users
      .to(backendUsers, speed, {
        opacity: 1,
        ease:    Power4.easeOut
      })
      .add("usersIn")
      .staggerFrom(backendUserCards, speed * 0.5, {
        opacity: 0,
        ease:    Power4.easeIn,
        y:      50,
      },0.1, "usersIn-=0.2")
      .staggerTo(backendUserCards,speed * 0.5, {
        className: "-=inactive"
        // y: -100,
      },0.1, "usersIn+=0.2");
  };
  function usersOut() {
    tl_Users
      .to(backendUsers, speed * 0.5, {
        opacity: 0,
        ease:    Power4.easeOut,
      })
      .set(backendUserCards, {
        className: "+=inactive"
      });
  };


  /*
    _________________________________________________________

    //! Init

  */


  window.addEventListener("load", function(event) {
    animateCardDropIn();
    intCardDropIn = setInterval(cardDropIn, interval);
    initIntegrations();

    // animateIntegrations();
    // animateSlack();
  });

  // Handlers

  return {

    cardDropStart : function() {
      dropIsPaused = false;
    },
    cardDropPause : function() {
      dropIsPaused = true;
    },

    integrateStart : function() {
      integrationsIn();
      // tl_Integrations.restart();
    },
    integrateStop : function() {
      integrationsOut();
      // tl_Integrations.reverse(0);
    },

    slackStart : function() {
      slackIn();
    },
    slackStop : function() {
      slackOut();
    },

    usersStart : function() {
      usersIn();
    },
    usersStop : function() {
      usersOut();
    }

  };



}();




var animation__Backend__xs = function() {
  
  var tl_Integrations_xs        = new TimelineLite();
  var tl_Users_xs               = new TimelineLite();
  var tl_Slack_xs               = new TimelineLite();
  
  var speed = 0.5;
  
  function integrationsIn() {
    
    xOffset = 160;
    tl_Integrations_xs
          .set('.screenBackend__integrations--xs', {
                x: winW,
            })
          .add('integrationsIn')
          .to('.screenBackend__browser--xs', speed, {
                x:       -xOffset,
                ease:    Power4.easeOut
              },'integrationsIn')
          .to('.screenBackend__integrations--xs', speed * 0.5, {
                x: 0,
            },'integrationsIn')
  }
  
  function integrationsOut() {
    
    tl_Integrations_xs
          .add('integrationsOut')
          .to('.screenBackend__browser--xs', speed, {
              x:       0,
              ease:    Power4.easeOut
            })
          
          .to('.screenBackend__integrations--xs', speed, {
                x: winW,
            },'integrationsOut')
          .set('.screenBackend__integrations--xs', {
                x: winW,
            });
  }
  
  
  function usersIn() {
    
    tl_Users_xs
          .set('.screenBackend__users--xs', {
                opacity: 0,
            })
          .to('.screenBackend__users--xs', speed * 0.5, {
                opacity: 1,
            })
  }
  
  function usersOut() {
    
    tl_Users_xs
          .to('.screenBackend__users--xs', speed * 0.5, {
                opacity: 0,
            })
          .set('.screenBackend__users--xs', {
                opacity: 0,
            })
  }
  
  function slackIn() {
    xOffset = 160;
    tl_Slack_xs
          .set('.screenBackend__slack--xs', {
                x: winW,
            })
          .add('slackIn')
          .to('.screenBackend__browser--xs', speed, {
                x:       -xOffset,
                ease:    Power4.easeOut
              },'slackIn')
          .to('.screenBackend__slack--xs', speed * 0.5, {
                x: 0,
            },'slackIn')
  }
  
  
  function slackOut() {
    tl_Slack_xs
          .add('slackOut')
          .to('.screenBackend__browser--xs', speed, {
              x:       0,
              ease:    Power4.easeOut
            })
          
          .to('.screenBackend__slack--xs', speed, {
                x: winW,
            },'slackOut')
          .set('.screenBackend__slack--xs', {
                x: winW,
            });
  }
  
  // Handlers
  
  return {
    

    
    integrateStart : function() {
      integrationsIn();
    },
    integrateStop : function() {
      integrationsOut();
    },
    usersStart : function() {
      usersIn();
    },
    usersStop : function() {
      usersOut();
    },
    
    slackStart : function() {
      slackIn();
    },
    slackStop : function() {
      slackOut();
    },

  
  };
  
}();



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



// Boostrap

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.1.1): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
var Util = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */
  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || '';
      }

      try {
        var $selector = $(document).find(selector);
        return $selector.length > 0 ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    }
  };
  setTransitionEndSupport();
  return Util;
}($);
//# sourceMappingURL=util.js.map


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.1.1): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
var Modal = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'modal';
  var VERSION = '4.1.1';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    RESIZE: "resize" + EVENT_KEY,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top',
    NAVBAR_TOGGLER: '.navbar-toggler'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isTransitioning || this._isShown) {
        return;
      }

      if ($(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      $(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();

      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (this._isTransitioning || !this._isShown) {
        return;
      }

      var hideEvent = $.Event(Event.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $(this._element).hasClass(ClassName.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $(document).off(Event.FOCUSIN);
      $(this._element).removeClass(ClassName.SHOW);
      $(this._element).off(Event.CLICK_DISMISS);
      $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(window, document, this._element, this._backdrop).off(EVENT_KEY);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    }; // Private


    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = $(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.scrollTop = 0;

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        $(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      $(document).off(Event.FOCUSIN) // Guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            event.preventDefault();

            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $(window).on(Event.RESIZE, function (event) {
          return _this6.handleUpdate(event);
        });
      } else {
        $(window).off(Event.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        $(_this7._element).trigger(Event.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          $(this._backdrop).addClass(animate);
        }

        $(this._backdrop).appendTo(document.body);
        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($(this._element).hasClass(ClassName.FADE)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    }; // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------


    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this9 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        // Adjust fixed content padding
        $(Selector.FIXED_CONTENT).each(function (index, element) {
          var actualPadding = $(element)[0].style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $(Selector.STICKY_CONTENT).each(function (index, element) {
          var actualMargin = $(element)[0].style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
        }); // Adjust navbar-toggler margin

        $(Selector.NAVBAR_TOGGLER).each(function (index, element) {
          var actualMargin = $(element)[0].style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) + _this9._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $(document.body).css('padding-right');
        $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      $(Selector.FIXED_CONTENT).each(function (index, element) {
        var padding = $(element).data('padding-right');

        if (typeof padding !== 'undefined') {
          $(element).css('padding-right', padding).removeData('padding-right');
        }
      }); // Restore sticky content and navbar-toggler margin

      $(Selector.STICKY_CONTENT + ", " + Selector.NAVBAR_TOGGLER).each(function (index, element) {
        var margin = $(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $(document.body).data('padding-right');

      if (typeof padding !== 'undefined') {
        $(document.body).css('padding-right', padding).removeData('padding-right');
      }
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    }; // Static


    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = _objectSpread({}, Default, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this10).is(':visible')) {
          _this10.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}($);
//# sourceMappingURL=modal.js.map



//# sourceMappingURL=functions.js.map