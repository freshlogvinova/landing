var phoneAnimation__Brand = function() {
  
  // App icon + branding
  
  var brandBackground = document.querySelectorAll('.slide--yourbrand .phoneScreen__background')[0],
      cardsContent    = document.querySelectorAll('.slide--yourbrand .tchopCard__content');
  
  var tl_Brand,
      bgSpeed = 0.5, // 1,
      bgInterval = 1; // 1;
  
  tl_Brand = new TimelineLite({        
        onComplete: function (){
                      this.restart();
                    },
      });
  
  // tl_Content = new TimelineLite({        
  //       onComplete: function (){
  //                     this.restart();
  //                   },
  //     });
      
      
  /*
    $blue:    #488ED8; // #007bff !default;
    $indigo:  #6610f2 !default;
    $purple:  #6f42c1 !default;
    $pink:    #e83e8c !default;
    $red:     #dc3545 !default;
    $orange:  #F6704D; // #fd7e14 !default;
    $yellow:  #FFD138; // #ffc107 !default;
    $green:   #28a745 !default;
    $teal:    #20c997 !default;
    $cyan:    #17a2b8 !default;
  */
  var bgColors      = ['#488ED8','#6610f2','#6f42c1','#e83e8c','#dc3545','#FFD138', '#28a745'];
  
  var bgColorsIndex = 0;
  
  function initAppIconAnimation() {
    
    
    /*
      _________________________________________________________
      
      //! Background-colors
      
    */
    
    TweenMax.set(brandBackground, {
        background: 'none',
        backgroundColor: bgColors[bgColorsIndex],
      });

    
    
    tl_Brand.set(brandBackground, {
      backgroundColor: bgColors[0],
    })
    
    bgColors.forEach(function(element, index) {
      tl_Brand
        .to(brandBackground, bgSpeed, {
          backgroundColor: function() {
            return bgColors[index];
            },
        }, "+=" + bgInterval)
    });
    
    tl_Brand
      .to(brandBackground, bgSpeed, {
        backgroundColor: bgColors[0],
      }, "+=" + bgInterval)
    
    /*
      _________________________________________________________
      
      //! Cards
      
    */
    
    // tl_Content
    //   .to(cardsContent, 0.5, {
    //     paddingLeft: "40px",
    //     paddingRight: "40px",
    //   }, "+=3");

  }
  
  
  win.addEventListener("load", function(event) {
    initAppIconAnimation();
  });
  
  
  return {
    
    start : function() {
      tl_Brand.restart();
      // tl_Chat.restart();
    },
    
    stop : function() {
      tl_Brand.kill();
      // animateChat();
      // tl_Chat.restart();
    }
  
  };
  
  
  
}();