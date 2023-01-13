$(function () {

  const swiper = new Swiper('.swiper', {
    loop: true,
    grabCursor: true,
    speed: 1000,
    autoplay: {
      delay: 2000,
      disableOnInteraction: true,
    },
    simulateTouch: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      414: {
        centeredSlides: true,
        slidesPerView: 1.2,
        spaceBetween: 10
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 15
      },
    },
    pagination: {
      el: '.swiper-pagination',
      // type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  $('.menu_btn').on('click', function () {
    $('.menu-list__burger').toggleClass('menu_list--active');
    $('.menu_btn').toggleClass('menu_btn--active');
    $('.menu-hover__burger').toggleClass('menu_list--active');
    $('.body').toggleClass('body_active');
  });
  $('.menu-list').on('click', function () {
    $('.menu-list__burger').removeClass('menu_list--active');
    $('.menu_btn').removeClass('menu_btn--active');
    $('.menu-hover__burger').removeClass('menu_list--active');
    $('.body').removeClass('body_active');
  });

  $('.questions-wrap__show').click(function () {
    $(this).parent().find('.questions-wrap__hidden').slideToggle(300);
  })

  var tab = $('#tabs .tabs-items > div');
  tab.hide().filter(':first').show();
  $('#tabs .tabs-nav a').click(function () {
    tab.hide();
    tab.filter(this.hash).show();
    $('#tabs .tabs-nav a').removeClass('active');
    $(this).addClass('active');
    return false;
  }).filter(':first').click();
  $('.tabs-target').click(function () {
    $('#tabs .tabs-nav a[href=' + $(this).attr('href') + ']').click();
  });
  if (window.location.hash) {
    $('#tabs-nav a[href=' + window.location.hash + ']').click();
    window.scrollTo(0, $("#".window.location.hash).offset().top);
  }

  $(".phone_mask").mask("+7(999)999-99-99");

  $('.popupGet').magnificPopup();

  var lastScroll = 0;
  $(".menu-opened").addClass("open-copy");
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > lastScroll) {
      $(".menu-opened").removeClass("open-copy");
    } else if (scroll < lastScroll) {
      $(".menu-opened").addClass("open-copy");
    }
    lastScroll = scroll;
  });

  // Cursor
  const body = document.querySelector('body')
  const cursor = document.getElementById('cursor'),
    links = document.getElementsByTagName('a')
  let mouseX = 0,
    mouseY = 0,
    posX = 0,
    posY = 0

  function mouseCoords(e) {
    mouseX = e.pageX
    mouseY = e.pageY
  }
  gsap.to({}, .01, {
    repeat: -1,
    onRepeat: () => {
      posX += (mouseX - posX) / 6
      posY += (mouseY - posY) / 6
      gsap.set(cursor, {
        css: {
          left: posX,
          top: posY
        }
      })
    }
  })

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('mouseover', () => {
      cursor.classList.add('active')
    })
    links[i].addEventListener('mouseout', () => {
      cursor.classList.remove('active')
    })
  }
  body.addEventListener('mouseout', () => {
    cursor.classList.add('hidden')
  })
  body.addEventListener('mousemove', e => {
    mouseCoords(e)
    cursor.classList.remove('hidden')
  })

  // ПОЛЗУНКИ
  if ($('.calc').get(0)) {
    var days = $('#slider__days').get(0);
    var days_val = $('[name="slider__days__val"]').get(0);

    noUiSlider.create(days, {
      range: {
        'min': 1,
        'max': 7
      },
      format: wNumb({
        decimals: 0, // default is 2
      }),
      step: 1,
      start: [3],
      // Display colored bars between handles
      connect: 'lower',
      // Move handle on tap, bars are draggable
      behaviour: 'tap-drag',
      pips: {
        mode: 'positions',
        density: 20,
        values: [0, 100 / 7, (100 / 7) * 2, (100 / 7) * 3, (100 / 7) * 4, (100 / 7) * 5, (100 / 7) * 6, (100 / 7) * 7],
        stepped: true
      }
    });
    days.noUiSlider.on('update', function (values, handle) {
      days_val.value = values[handle];
      $('#slider__days .noUi-value-large').removeClass('on');
      $('#slider__days .noUi-value-large[data-value=' + values[handle] + ']').addClass('on');
      calc();
    });

    var hours = $('#slider__hours').get(0);
    var hours_val = $('[name="slider__hours__val"]').get(0);

    noUiSlider.create(hours, {
      range: {
        'min': 1,
        'max': 12
      },
      format: wNumb({
        decimals: 0, // default is 2
      }),
      step: 1,
      start: [7],
      // Display colored bars between handles
      connect: 'lower',
      // Move handle on tap, bars are draggable
      behaviour: 'tap-drag',
      pips: {
        mode: 'positions',
        density: 20,
        values: [0, 100 / 12, (100 / 12) * 2, (100 / 12) * 3, (100 / 12) * 4, (100 / 12) * 5, (100 / 12) * 6, (100 / 12) * 7, (100 / 12) * 8, (100 / 12) * 9, (100 / 12) * 10, (100 / 12) * 11, (100 / 12) * 12],
        stepped: true
      }
    });
    hours.noUiSlider.on('update', function (values, handle) {
      hours_val.value = values[handle];
      $('#slider__hours .noUi-value-large').removeClass('on');
      $('#slider__hours .noUi-value-large[data-value=' + values[handle] + ']').addClass('on');
      calc();
    });

    var level = $('#slider__level').get(0);
    var level_val = $('[name="slider__level__val"]').get(0);
    var pipFormats = {
      '857': 'Низкий',
      '1285': 'Средний',
      '1714': 'Высокий'
    };

    noUiSlider.create(level, {
      range: {
        // Starting at 500, step the value by 500,
        // until 4000 is reached. From there, step by 1000.
        'min': [857, 428],
        '50%': [1285, 429],
        'max': [1714]
      },
      format: wNumb({
        decimals: 0, // default is 2
      }),
      step: 1,
      start: [1285],
      // Display colored bars between handles
      connect: 'lower',
      // Move handle on tap, bars are draggable
      behaviour: 'tap-drag',
      pips: {
        mode: 'positions',
        density: 50,
        values: [0, 100 / 3, (100 / 3) * 2, (100 / 3) * 3],
        stepped: true,
        format: {
          to: function (a) {
            return pipFormats[a];

          }
        }
      }
    });
    level.noUiSlider.on('update', function (values, handle) {
      level_val.value = values[handle];
      $('#slider__level .noUi-value-large').removeClass('on');
      $('#slider__level .noUi-value-large[data-value=' + values[handle] + ']').addClass('on');
      calc();
    });

    function calc() {
      var days = $('[name="slider__days__val"]').val(); // дней в неделю
      var hours = $('[name="slider__hours__val"]').val(); // часов в день
      var level = $('[name="slider__level__val"]').val(); // уровень
      $('.calc__price').html(days * hours * level);
    }
  }

});
