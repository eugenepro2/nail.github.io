import Velocity from 'velocity-animate';

let menuButton = $('[data=hamburger-menu]');
let menuBar1 = menuButton.find('b:nth-child(1)');
let menuBar2 = menuButton.find('b:nth-child(3)');
let contactPage = $('.contact');


menuButton.click( function() {
  $(this).toggleClass('active');
  
  if (menuButton.hasClass('active')) {
    //Анимация кнопки
    menuBar1.velocity({ top: '50%' }, {duration: 200, easing: 'swing'});
    menuBar2.velocity({ top: '50%' }, {duration: 200, easing: 'swing'})
    			.velocity({rotateZ:'90deg'}, {duration: 800, delay: 200, easing: [500,20] });
    menuButton.velocity({rotateZ:'135deg'}, {duration: 800, delay: 200, easing: [500,20] });

    //Анимация появления страницы контактов
    contactPage
      .velocity({translateY : '-100%'})
      .velocity({translateY : '0%'}, {duration: 1000, easing: [0.7,0,0.3,1], display: 'block'});
   
    if ($(window).width() > 640) {
      $('body').css('overflow', 'hidden');
    }
  } else {
    //Анимация кнопки
    menuButton.velocity('reverse');
    menuBar2.velocity({rotateZ:'0deg'}, {duration: 800, easing: [500,20] })
    			.velocity({ top: '30%' }, {duration: 200, easing: 'swing'});
    menuBar1.velocity('reverse', {delay: 800});
    //Анимация пропадания страницы контактов
    contactPage.velocity({translateY : '-100%'}, {duration: 1000, easing: [0.7,0,0.3,1], display: 'none'});
    if ($(window).width() > 640) {
      $('body').css('overflow', 'scroll');
    }
  }
});


$(window).on('load', function() {
  if($(window).width() <= 640) {
    $('.inst--mobile')
      .velocity({translateX : '-100%'})
      .delay(2000).velocity({translateX: '25%'}, {duration: 1000, easing: [0.7,0,0.3,1], display: 'block'});
  
  
    setTimeout(function() {
      $('.inst--mobile').velocity({translateX : '20%'}, {duration: 1500, easing: [0.7,0,0.3,1], loop: true});
    }, 4000);  
  }
});





