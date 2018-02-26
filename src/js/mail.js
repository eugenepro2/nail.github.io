import Velocity from 'velocity-animate';

//Ajax отправка формы
$('form').submit(function(e) {
  e.preventDefault(); 
  var $form = $(this);
  ajaxMail($form);
});
function ajaxMail($form) {
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize()
  }).done(function() {
    $('form').velocity({translateX : '200%'}, {duration: 1000, easing: [0.7,0,0.3,1], display: 'none'});  
    $('.response').text('Спасибо! Ваши данные успешно отправлены.');
    $('.response')
      .velocity({translateX : '200%'})
      .delay(500).velocity({translateX : '0%'}, {duration: 1000, easing: [0.7,0,0.3,1], display: 'block'});
    $('form input').each(function() {
      $(this).delay(3000).val('');
    });
  }).fail(function() {
    console.log('fail');
  });
}
