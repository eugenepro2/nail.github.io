import Velocity from 'velocity-animate';


$(window).on('load', function() {
  let preloader = $('#preloader');

  preloader.delay(500).velocity(
    {translateY : '-100%'}, 
    {duration: 1000, easing: [0.7,0,0.3,1]}
  );  
});

