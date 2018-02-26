// import sayHello from './lib/sayHello.js';
import './menu.js';
import './smosth-scroll.js';
import 'moment/locale/ru';
import './preloader.js';
import './mail.js';
import Instafeed from 'instafeed.js';
import JqueryModal from 'jquery-modal';
import Moment from 'moment';
import './lib/jquery.maskedinput.min.js';


$(function() {

  $(document).on('click', '.amo-button-holder', function() {
    $('.amo-brand__link').attr('href', 'http://excv.ru/?utm_sourse=iynail.studio');
    $('.amo-brand__link').text('EXCV');
  });

  
  
  $('input[type="tel"]').mask('+7(999)999-99-99');

  

  var moment = require('moment');
  moment.locale('ru');
  
  //Отображение ленты
  var loadButton = $('.load');
  var userFeed = new Instafeed({
    get: 'user',
    userId: '505230800',
    limit: 8,
    accessToken: '505230800.1677ed0.b49757894fe14acc99e01c4700d06c28',
    template: '<a href="#{{id}}" rel="modal:open" class="inst__block">' +
    '<div class="inst__block__image">' +
    '<img src="{{image}}"></img>' +
    '</div></a>',
    resolution: 'low_resolution',
    after: function() {
      // disable button if no more results to load
      if (!this.hasNext()) {
        loadButton.setAttribute('disabled', 'disabled');
      }
    }
  });
  userFeed.run();
  
  
  
  
  //Модальные окна для фотографий
  var modalFeed = new Instafeed({
    get: 'user',
    target: 'modal-feed',
    userId: '505230800',
    limit: 8,
    accessToken: '505230800.1677ed0.b49757894fe14acc99e01c4700d06c28',
    template: '<div id="{{id}}" style="display: none">' +
    '<div class="row">' +
    '<div class="modal__image"><img src="{{image}}"></div>' +
    '<div class="modal__info">' +
    '<div class="modal__nav">' +
    '<a rel="modal:open" class="prev"><svg class="icon icon-arrow "><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../img/sprite.svg#icon-arrow"></use></svg></a>' +
    '<a rel="modal:open" class="next"><svg class="icon icon-arrow "><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../img/sprite.svg#icon-arrow"></use></svg></a>' +
    '</div>' +
    '<div class="modal__info__user middle-xs">' +
    '<div class="modal__info__user__photo"><img src=""></div>' +
    '<div class="row modal__info__user__block">' +
    '<div class="modal__info__user__name"></div>' +
    '<div class="modal__info__user__date"></div>' +
    '</div>' +
    '</div>' +
    '<div class="modal__info__caption"></div>' +
    '</div>' +
    '</div>' +
    '</div>',
    resolution: 'standard_resolution',
    success: function(data) {
      getPhoto(data);
    }
  });
  modalFeed.run();
  loadButton.on('click', function() {
    userFeed.next();
    modalFeed.next();
  });
  

  
  
  
  //Получаем фотки и закидываем их в модальное окно
  function getPhoto(data) {
    let obj = data.data;
  
    obj.forEach(function(photo) {
      let date = new Date(new Date(parseInt(photo.created_time) * 1000));
      let newDate = moment(date).format('LL');
      let userPhoto = photo.user.profile_picture;
      let userName = photo.user.username;
      let caption = photo.caption.text;
      let newCaption = maxLength(caption);
      setTimeout(function() {
        navigation(photo.id);
        $(`#${photo.id} .modal__info__user__photo img`).attr('src', userPhoto);
        $(`#${photo.id} .modal__info__user__name`).text(userName);
        $(`#${photo.id} .modal__info__user__date`).text(newDate);
        $(`#${photo.id} .modal__info__caption`).text(newCaption);
      }, 1000);
      
    });
  
  }
  
  //Слишком большое описание на фотке? Не проблема, укоротим его до 100 символов
  function maxLength(string) {
    let sliced = string.slice(0,200);
    if (sliced.length < string.length) {
      sliced += '...';
    }
    return sliced;
  }
  
  //Навигация между модальным окнами
  function navigation(id) {
    let prev = $(`#${id}`).prev().attr('id');
    let next = $(`#${id}`).next().attr('id');
    if (prev === undefined) {
      $(`#${id}`).find('.prev').css('pointer-events', 'none');
    }
    if (next === undefined) {
      $(`#${id}`).find('.next').css('pointer-events', 'none');
    }
    $(`#${id}`).find('.prev').attr('href', `#${prev}`);
    $(`#${id}`).find('.next').attr('href', `#${next}`);
  }
  
  

});
