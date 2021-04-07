(function($) {
  'use strict';

  function getScrollBarWidth() {
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);
    var widthNoScroll = outer.offsetWidth; // force scrollbars

    outer.style.overflow = 'scroll'; // add innerdiv

    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
    var widthWithScroll = inner.offsetWidth; // remove divs

    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
  }

  function detectElementScrollbarY(element) {
    return element.scrollHeight > element.offsetHeight;
  }

  // throttle
  function throttle(func, ms) {
    var isThrottled = false;
    var savedArgs;
    var savedThis;

    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments);
      isThrottled = true;
      setTimeout(function () {
        isThrottled = false;

        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }

  // platformDetect
  var detectBrowser = {
    isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,// eslint-disable-line
    isFirefox: typeof InstallTrigger !== 'undefined',
    isSafari: /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
    isIE: /* @cc_on!@*/false || !!document.documentMode,
    isEdge: !function () {this.isIE;} && !!window.StyleMedia, // eslint-disable-line
    isChrome: !!window.chrome && !!window.chrome.webstore,
    isBlink: (function () {this.isChrome;} || function () {this.isOpera;}) && !!window.CSS // eslint-disable-line
  };

  var detectMobile = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  };

  if (detectMobile.isMobile) {
    $('html').addClass('mobile');
  } else {
    $('body').addClass('no-mobile');
  }

  var svgAnimation = throttle(function () {
    $('.js-motion-svg:in-viewport').each(function () {
      if (!$(this).hasClass('animated')) {
        $(this).addClass('animated');
        var myVivus = new Vivus(this, {
          duration: 150
        });
      }
    });
  }, 40);

  var counter = throttle(function () {
    if (typeof $.fn.jQuerySimpleCounter !== 'undefined') {
      $('.js-counter:in-viewport').each(function () {
        if (!$(this).hasClass('animated')) {
          $(this).addClass('animated');
          var thisElement = $(this);
          $({
            count: 0
          }).animate({
            count: $(this).attr('data-counter-value')
          }, {
            duration: 2000,
            easing: 'swing',
            step: function step() {
              var mathCount = Math.ceil(this.count);
              thisElement.text(mathCount.toLocaleString('en-IN', {
                maximumSignificantDigits: 3
              }));
            }
          });
        }
      });
    }
  }, 40);

  if (!detectMobile.isMobile) {
    if ($('.js-counter').length) {
      counter();
    }

    if ($('.js-motion-svg').length) {
      svgAnimation();
    }

    $(window).scroll(function () {
      if ($('.js-counter').length) {
        counter();
      }

      if ($('.js-motion-svg').length) {
        svgAnimation();
      }
    });
  }

  $('.popup-video').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
    mainClass: 'my-mfp-slide-bottom'
  });

  $('.animsition').animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 500,
    outDuration: 500,
    linkElement: 'a:not([target="_blank"]):not([href^="#"])',
    loading: true,
    loadingParentElement: 'body',
    //animsition wrapper element
    loadingClass: 'animsition-loading2',
    loadingInner: "<div class=\"spinner\">\n        <div class=\"double-bounce1\"></div>\n      <div class=\"double-bounce2\"></div>\n      </div>",
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: ['animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay: false,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: 'body',
    transition: function transition(url) {
      window.location.href = url;
    }
  });

  svg4everybody();

  // revolution-slider
  (function() {
    var sliderElementSelector = '.revolution-slider__slider';
    var sliderElement = document.querySelector(sliderElementSelector);

    if (sliderElement) {
      let revapi,
        tpj = jQuery;

      tpj(document).ready(function () {
        if (tpj(sliderElementSelector).revolution == undefined){
          revslider_showDoubleJqueryError(sliderElementSelector);
        }else {
          $(sliderElementSelector).each(function(index, item) {
            revapi = tpj(item).show().revolution({
              sliderType: 'standard',
              jsFileLocation: '//tpserver.local/R_5452/wp-content/plugins/revslider/public/assets/js/',
              sliderLayout: sliderElement.classList.contains('revolution-slider__slider_autoheight') ? null : 'fullscreen',
              dottedOverlay: 'none',
              delay: 9000,
              navigation: {
                keyboardNavigation: 'off',
                keyboard_direction: 'horizontal',
                mouseScrollNavigation: 'off',
                mouseScrollReverse: 'default',
                onHoverStop: 'off',
                arrows: {
                  style: 'metis',
                  enable: true,
                  hide_onmobile: false,
                  hide_onleave: false,
                  tmp: '',
                  left: {
                    container: 'layergrid',
                    h_align: 'right',
                    v_align: 'bottom',
                    h_offset: 61,
                    v_offset: 1
                  },
                  right: {
                    container: 'layergrid',
                    h_align: 'right',
                    v_align: 'bottom',
                    h_offset: 0,
                    v_offset: 1
                  }
                }
              },
              responsiveLevels: [1200, 992, 768, 576],
              visibilityLevels: [1200, 992, 768, 576],
              gridwidth: [1200, 992, 768, 576],
              gridheight: [800, 768, 960, 720],
              lazyType: 'single',
              shadow: 0,
              spinner: 'spinner5',
              stopLoop: 'on',
              stopAfterLoops: 0,
              stopAtSlide: 1,
              shuffle: 'off',
              autoHeight: 'off',
              disableProgressBar: 'on',
              hideThumbsOnMobile: 'off',
              hideSliderAtLimit: 0,
              hideCaptionAtLimit: 0,
              hideAllCaptionAtLilmit: 0,
              debugMode: false,
              fallbacks: {
                simplifyAll: 'off',
                nextSlideOnWindowFocus: 'off',
                disableFocusListener: false
              }
            });

            if (revapi.revSliderSlicey) {
              revapi.revSliderSlicey();
            }

            $('.revolution-prev').on('click', function() {
              revapi.revprev();
            });

            $('.revolution-next').on('click', function() {
              revapi.revnext();
            });
          });
        }

        RsAddonPanorama(tpj, revapi);

        window.revapi = revapi;

        // panorama-slider
        (function () {
          if (window.revapi) {
            window.revapi.bind('revolution.slide.onchange', function (e, data) {
              $('.panorama-slider__content').each(function (index, item) {
                if (index === data.slideIndex - 1) {
                  setTimeout(function () {
                    $(item).fadeIn(300);
                  }, 300);
                } else {
                  $(item).fadeOut(300);
                }
              });
            });
          }
        })();
      }); /* ready*/

      jQuery(window).on('scroll', function () {
        var wh = jQuery(this).height();
        jQuery('.tp-parallax-container').each(function () {
          var layer = jQuery(this);
          var po = Math.abs(layer.data('parallaxoffset'));
          if (po > 100) po = 100;
          if (po < 20) po = 0;
          po = (100 - po) / 100;
          TweenLite.to(layer, 0.2, {opacity: po});
        });
      });
    }
  })();

  // faded-block
  (function () {
    var element = document.querySelector('.faded-block');

    if (element) {
      $(window).on('scroll', function () {
        var pixs = element.getBoundingClientRect().top;
        pixs = pixs / -50;
        $(element).css({'filter': 'blur('+pixs+'px)'});
      });
    }
  })();

  // footer
  (function () {
    var bodyElement = document.querySelector('body');
    var footerElement = document.querySelector('.footer');

    if (footerElement) {
      var setPadding = function setPadding() {
        bodyElement.style.paddingBottom = "".concat(footerElement.offsetHeight, "px");
      };

      var onWindowResize = function onWindowResize() {
        setPadding();
      };

      footerElement.classList.add('footer_fixed');
      setPadding();
      window.addEventListener('resize', onWindowResize);
    }
  })();

  // full-screen-block
  (function () {
    var element = $('.full-screen-block');

    function setNavColor(index) {
      if ($($('.full-screen-block__slide')[index - 1]).hasClass('full-screen-block__slide_dark')) {
        element.addClass('is-white');
        $('#pp-nav').addClass('is-white');
        $('.header').addClass('header_white');
      } else {
        element.removeClass('is-white');
        $('#pp-nav').removeClass('is-white');
        $('.header').removeClass('header_white');
      }
    }

    if (element.length) {
      $('.full-screen-block__slides').pagepiling({
        afterRender: function afterRender() {
          setNavColor(1);
        },
        afterLoad: function afterLoad(anchorLink, index) {
          setNavColor(index);
        },
        onLeave: function onLeave(index, nextIndex, direction) {
          var tl = new TimelineLite();
          var el = $('.full-screen-block__slide-inner')[index - 1];
          var el2 = $('.full-screen-block__slide-inner')[nextIndex - 1];
          tl.set(el, {
            opacity: 1
          }).set(el2, {
            y: 50,
            opacity: 0
          }).to(el, .35, {
            opacity: 0
          }, '+=.4').to(el2, .35, {
            y: 0,
            opacity: 1
          });
        }
      });
    }
  })();

  // grid-block
  (function () {
    var imageElements = document.querySelectorAll('.grid-block__image');
    var itemElements = document.querySelectorAll('.grid-block__item');

    if (itemElements.length) {
      itemElements.forEach(function (item, index) {
        item.addEventListener('mouseenter', function () {
          imageElements.forEach(function (image) {
            image.classList.remove('grid-block__image_active');
          });
          itemElements.forEach(function (card) {
            card.classList.remove('grid-block__item_active');
          });
          item.classList.add('grid-block__item_active');
          imageElements[index].classList.add('grid-block__image_active');
        });
      });
    }
  })();

  // header
  (function () {
    var button = $('.header__menu-button');
    var panel = $('.header__menu');
    var overlay = $('.header__overlay');

    function openMenu() {
      var scrollBarWidth = window.innerWidth > document.querySelector('body').offsetWidth ? getScrollBarWidth() : 0;
      $('body').css({
        overflow: 'hidden',
        paddingRight: "".concat(scrollBarWidth, "px")
      });
      button.css({
        marginRight: "".concat(scrollBarWidth, "px")
      });
      $(overlay).fadeIn(300);
    };

    function hideMenu() {
      $('body').css({
        overflow: '',
        paddingRight: ''
      });
      button.css({
        marginRight: ''
      });
      $(overlay).fadeOut(300);
    };

    button.on('click', function () {
      button.toggleClass('header__menu-button_cross');
      button.toggleClass('header__menu-button_burger', !button.hasClass('header__menu-button_cross'));
      panel.toggleClass('header__menu_opened');

      if (button.hasClass('header__menu-button_cross')) {
        openMenu();
      } else {
        hideMenu();
      }
    });

    overlay.on('click', function () {
      button.toggleClass('header__menu-button_cross');
      button.toggleClass('header__menu-button_burger', !button.hasClass('header__menu-button_cross'));
      panel.toggleClass('header__menu_opened');

      if (button.hasClass('header__menu-button_cross')) {
        openMenu();
      } else {
        hideMenu();
      }
    });

    if ($('.header_fixed').length) {
      var headerElement = document.querySelector('.header');
      var nav_offset_top = headerElement.classList.contains('header_offset') ? window.innerHeight : headerElement.offsetHeight + 30;
      var headerContainer = document.querySelector('.header__container');
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= nav_offset_top) {
          $('.header_fixed').addClass('header_is_fixed');
          headerContainer.style.top = "-".concat(headerContainer.offsetHeight, "px");
        } else {
          $('.header_fixed').removeClass('header_is_fixed');
          headerContainer.style.top = '';
        }
      });
    }
  })();

  // info-card
  (function () {
    var card = $('.info-card');
    var openBtn = $('.info-card__button_open');
    var closeBtn = $('.info-card__button_close');
    var body = $('.info-card__body');

    if (card) {
      openBtn.on('click', function (e) {
        var element = $(e.target).parent().find(body);
        element.fadeIn();
      });
      closeBtn.on('click', function (e) {
        var element = $(e.target).parent();
        element.fadeOut();
      });
    }
  })();

  // masonry
  (function () {
    var grid = $('.masonry__grid');
    var filterBtn = $('.masonry__secondary-filter-button');
    var tabButton = $('[data-tab-button]');

    if (grid.length) {
      var $grid = grid.isotope({
        itemSelector: '.masonry__item',
        layoutMode: 'fitRows'
      });

      window.onload = function () {
        $grid.isotope();
      };

      filterBtn.on('click', function () {
        $('.masonry__secondary-filter-button_active').removeClass('masonry__secondary-filter-button_active');
        $(this).addClass('masonry__secondary-filter-button_active');
        var filterBy = $(this).attr('data-filter');
        var filterFns = {
          category: function category() {
            var categories = this.querySelector('[data-filters]').getAttribute('data-filters').split(', ');
            return categories.indexOf(filterBy) >= 0;
          }
        };
        var filterValue = filterBy === '*' || filterBy === 'All' || filterBy === 'all' ? '*' : filterFns.category;
        $grid.isotope({
          filter: filterValue
        });
      });
      tabButton.on('click', function () {
        tabButton.removeClass('masonry__primary-filter-button_active');
        $(this).addClass('masonry__primary-filter-button_active');
        $('.masonry__secondary-filters_active').removeClass('masonry__secondary-filters_active').css({
          position: 'absolute'
        }).fadeOut(300);
        $(".masonry__secondary-filters[data-tab-group=".concat(this.getAttribute('data-tab-button'), "]"));
        $(".masonry__secondary-filters[data-tab-group=".concat(this.getAttribute('data-tab-button'), "]")).addClass('masonry__secondary-filters_active').css({
          position: 'relative'
        }).fadeIn(300);
      });
    }
  })();

  // masonry-large-block
  (function () {
    var grid = $('.masonry-large-block__grid');

    if (grid.length) {
      var $grid = grid.isotope({
        itemSelector: '.masonry-large-block__item',
        layoutMode: 'masonry'
      });

      window.onload = function () {
        $grid.isotope();
      };
    }
  })();

  // minimal-head-block
  (function () {
    var typedElement = document.querySelector('.minimal-head-block__label');

    if (typedElement) {
      var options = {
        strings: ['themeselves', 'value', 'civilization'],
        typeSpeed: 60,
        backSpeed: 40,
        startDelay: 1200,
        backDelay: 2000,
        showCursor: false
      };

      var typed = new Typed(typedElement, options);
    }
  })();

  // parallax-block
  (function () {
    if ($('.parallax-block').length) {
      $(window).on('load', function(){
        var rellax = new Rellax('.parallax-block__image');
      });
    }
  })();

  // parallax-image
  (function () {
    if ($('.parallax-image').length) {
      $(window).on('load', function () {
        var rellax = new Rellax('.parallax-image__image');
      });
    }
  })();

  // project-block
  (function () {
    var grid = $('.project-block__grid');

    if (grid.length) {
      var $grid = grid.isotope({
        itemSelector: '.project-block__item'
      });

      window.onload = function () {
        $grid.isotope();
      };
    }
  })();

  // projects-block
  (function () {
    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

    function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

    var titleElement = document.querySelector('.projects-block__title');
    var filterButtonElements = _toConsumableArray(document.querySelectorAll('.projects-block__filter-link'));
    var buttonPrevElement = document.querySelector('.projects-block__control_prev');
    var buttonNextElement = document.querySelector('.projects-block__control_next');
    var activeFilterClass = 'link_active';
    var sliderElement = $('.projects-block__slider');

    if (sliderElement.length) {
      var sliderElements = _toConsumableArray(document.querySelectorAll('.projects-block__slider .swiper-slide'));

      var gallerySlider = new Swiper(sliderElement, {
        slidesPerView: 'auto',
        slidesOffsetBefore: titleElement.getBoundingClientRect().left,
        slidesOffsetAfter: titleElement.getBoundingClientRect().left,
        spaceBetween: 30
      });
      buttonPrevElement.addEventListener('click', function () {
        gallerySlider.slidePrev();
      });
      buttonNextElement.addEventListener('click', function () {
        gallerySlider.slideNext();
      });
      var slidesElements = _toConsumableArray(document.querySelectorAll('.projects-block .swiper-slide'));
      filterButtonElements.forEach(function (button) {
        button.addEventListener('click', function (e) {
          e.preventDefault();
          var filter = button.getAttribute('data-value');
          filterButtonElements.forEach(function (b) {
            b.classList.remove(activeFilterClass);
          });
          button.classList.add(activeFilterClass);
          var tl = new TimelineLite();
          tl.to(sliderElement, .3, {
            opacity: 0
          }).call(function () {
            gallerySlider.removeAllSlides();
            sliderElements.filter(function (item) {
              if (item.getAttribute('data-filter').indexOf(filter) >= 0 || filter === 'all') {
                gallerySlider.appendSlide(item);
              }
            });
          }).to(sliderElement, .3, {
            opacity: 1,
            clearProps: 'opacity'
          });
        });
      });
    }
  })();

  // review-slider
  (function () {
    var sliderWrapper = $('.review-slider');

    if (sliderWrapper.length) {
      $(sliderWrapper).each(function (index, item) {
        var sliderElement = $(item).find('.review-slider__slider');
        var buttonPrevElement = $(item).find('.review-slider__control_prev');
        var buttonNextElement = $(item).find('.review-slider__control_next');

        var swiper = new Swiper(sliderElement, {
          slidesPerView: 1,
          spaceBetween: 30
        });
        buttonPrevElement[0].addEventListener('click', function () {
          swiper.slidePrev();
        });
        buttonNextElement[0].addEventListener('click', function () {
          swiper.slideNext();
        });
      });
    }
  })();

  // reviews-block
  (function () {
    var buttonPrevElement = document.querySelector('.reviews-block__control_prev');
    var buttonNextElement = document.querySelector('.reviews-block__control_next');
    var sliderElement = $('.reviews-block__slider');

    if (sliderElement.length) {
      var swiper = new Swiper(sliderElement, {
        slidesPerView: 1,
        spaceBetween: 70,
        breakpointsInverse: true,
        breakpoints: {
          992: {
            slidesPerView: 2
          }
        }
      });
      buttonPrevElement.addEventListener('click', function () {
        swiper.slidePrev();
      });
      buttonNextElement.addEventListener('click', function () {
        swiper.slideNext();
      });
    }
  })();

  // simple-slider
  (function () {
    var buttonPrevElement = document.querySelector('.simple-slider__control_prev');
    var buttonNextElement = document.querySelector('.simple-slider__control_next');
    var sliderElement = $('.simple-slider__slider');

    if (sliderElement.length) {
      const swiper = new Swiper(sliderElement, {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      });

      buttonPrevElement.addEventListener('click', () => {
        swiper.slidePrev();
      });

      buttonNextElement.addEventListener('click', () => {
        swiper.slideNext();
      });
    }
  })();

  // studio-reviews
  (function () {
    var sliderElement = $('.studio-reviews__slider');
    var thumbsElement = $('.studio-reviews__buttons');
    var slideButton = $('.studio-reviews__person');

    if (sliderElement.length) {
      (function () {
        var galleryThumbs = new Swiper(thumbsElement, {
          slidesPerView: 3,
          spaceBetween: 30,
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          breakpoints: {
            767: {
              slidesPerView: 1
            },
            991: {
              slidesPerView: 2
            }
          }
        });

        var swiper = new Swiper(sliderElement, {
          slidesPerView: 1,
          spaceBetween: 30,
          on: {
            slideChange: function slideChange() {
              setTimeout(function () {
                slideButton.removeClass('studio-reviews__person_active');
                $(slideButton[swiper.activeIndex]).addClass('studio-reviews__person_active');
              }, 10);
            }
          },
          thumbs: {
            swiper: galleryThumbs
          }
        });

        slideButton.on('click', function (e) {
          swiper.slideTo(slideButton.index(e.currentTarget));
        });
      })();
    }
  })();

  // team-block
  (function () {
    var buttonPrevElement = document.querySelector('.team-block__control_prev');
    var buttonNextElement = document.querySelector('.team-block__control_next');
    var sliderElement = $('.team-block__slider');

    if (sliderElement.length) {
      var swiper = new Swiper(sliderElement, {
        slidesPerView: 1,
        spaceBetween: 30,
        breakpointsInverse: true,
        breakpoints: {
          768: {
            slidesPerView: 2
          },
          992: {
            slidesPerView: 4
          }
        }
      });
      buttonPrevElement.addEventListener('click', function () {
        swiper.slidePrev();
      });
      buttonNextElement.addEventListener('click', function () {
        swiper.slideNext();
      });
    }
  })();

  // zoom-image-head
  (function () {
    var bodyWrapper = document.querySelector('.zoom-image-head');
    var body = document.querySelector('.zoom-image-head__body');
    var bg = document.querySelector('.zoom-image-head__bg');
    var bg2 = document.querySelector('.zoom-image-head__bg2');
    var content = document.querySelector('.zoom-image-head__content');
    var contentSubtitle = document.querySelector('.zoom-image-head__subtitle');
    var contentTitle = document.querySelector('.zoom-image-head__title');
    var contentText = document.querySelector('.zoom-image-head__text');
    var contentIcon = document.querySelector('.zoom-image-head__icon');
    //var counterBlock = document.querySelector('.zoom-counter__card');
    var counterTitle = document.querySelector('.zoom-counter__title');
    var counterText = document.querySelector('.zoom-counter__text');
    var counterLink = document.querySelector('.zoom-counter__read-more');
    var typedElement = document.querySelector('.zoom-counter__subtitle');

    if (body && !detectMobile.isMobile) {
      var checkPosition = function checkPosition() {
        var scroll = $(window).scrollTop();
        var height = bodyWrapper.offsetHeight;
        var opacity = (1 - scroll / height) * 2;
        opacity = opacity > 1 ? 1 : opacity;
        var contentOpacity = (1 - scroll / height) * 1.5;
        contentOpacity = contentOpacity > 1 ? 1 : contentOpacity;
        var scale = 1 + scroll / height * 0.5;
        var bgX = "".concat(scroll / height * -15, "%");
        var bgY = "".concat(scroll / height * -12, "%");
        var bg2X = "".concat(scroll / height * 4, "%");
        var bg2Y = "".concat(scroll / height * 15, "%");
        tl2.set(bg, {
          opacity: opacity,
          scale: scale,
          x: bgX,
          y: bgY
        }).set(bg2, {
          opacity: opacity,
          scale: scale,
          x: bg2X,
          y: bg2Y
        }).set(content, {
          opacity: contentOpacity,
          y: "".concat(scroll / height * -15, "%")
        });

        if (scroll > height) {
          tl2.set(body, {
            display: 'none'
          });
        } else {
          tl2.set(body, {
            display: ''
          });
        }

        if (scroll > height && !contentIsVisible) {
          tl2.to(counterTitle, 0.5, {
            y: 0,
            opacity: 1
          }, '+=1').to(counterText, 0.5, {
            y: 0,
            opacity: 1
          }).to(counterLink, 0.5, {
            y: 0,
            opacity: 1
          });
          contentIsVisible = true;
          var typed = new Typed(typedElement, {
            strings: [typedElementString, typedElementString],
            typeSpeed: 40,
            backSpeed: 0,
            startDelay: 500,
            showCursor: false
          });
        }
      };

      var tl = new TimelineLite({
        onComplete: function onComplete() {
          checkPosition();
          $(window).scroll(function () {
            checkPosition();
          });
        }
      });
      tl.set(bg, {
        opacity: 0,
        scale: 1.5,
        x: '-15%',
        y: '-12%'
      }).set(bg2, {
        opacity: 0,
        scale: 1.5,
        x: '4%',
        y: '15%'
      }).set([contentSubtitle, contentTitle, contentText, contentIcon], {
        opacity: 0,
        y: 30
      }).call(function () {
        document.querySelector('html').scrollTop = 0;
      }, null, null, '+=1').to(bg, 1.5, {
        opacity: 1,
        scale: 1,
        x: '0%',
        y: '0%'
      }).to(bg2, 1.5, {
        opacity: 1,
        scale: 1,
        x: '0%',
        y: '0%'
      }, '-=1.5').staggerTo([contentSubtitle, contentTitle, contentText, contentIcon], 1, {
        opacity: 1,
        y: 0
      }, .2, '-=.6');
      body.style.position = 'fixed';
      var typedElementString = typedElement.innerText;
      typedElement.innerHTML = '';
      var contentIsVisible = false;
      var tl2 = new TimelineLite();
      tl2.set(counterTitle, {
        y: 20,
        opacity: 0
      }).set(counterText, {
        y: 20,
        opacity: 0
      }).set(counterLink, {
        y: 20,
        opacity: 0
      });
    }
  })();

  // zoom-slider
  (function () {
    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

    function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

    var buttonPrevElement = document.querySelector('.zoom-slider__control_prev');
    var buttonNextElement = document.querySelector('.zoom-slider__control_next');
    var sliderElement = $('.zoom-slider__slider');
    var thumbsElement = $('.zoom-slider__buttons');
    var filterButtonElements = document.querySelectorAll('.zoom-slider__filter-link');
    var activeFilterClass = 'link_active';

    if (sliderElement.length) {
      var sliderElements = _toConsumableArray(document.querySelectorAll('.zoom-slider__slider .swiper-slide'));

      var thumbsElements = _toConsumableArray(document.querySelectorAll('.zoom-slider__buttons .swiper-slide'));

      var galleryThumbs = new Swiper(thumbsElement, {
        slidesPerView: 4,
        //loop: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
          767: {
            slidesPerView: 1
          },
          991: {
            slidesPerView: 2
          }
        }
      });
      var gallerySlider = new Swiper(sliderElement, {
        slidesPerView: 1,
        //loop: true,
        thumbs: {
          swiper: galleryThumbs
        }
      });
      buttonPrevElement.addEventListener('click', function () {
        gallerySlider.slidePrev();
      });
      buttonNextElement.addEventListener('click', function () {
        gallerySlider.slideNext();
      });
      filterButtonElements.forEach(function (button) {
        button.addEventListener('click', function (e) {
          e.preventDefault();
          var filter = button.getAttribute('data-value');
          filterButtonElements.forEach(function (b) {
            b.classList.remove(activeFilterClass);
          });
          button.classList.add(activeFilterClass);
          var tl = new TimelineLite();
          tl.to([sliderElement, thumbsElement], .3, {
            opacity: 0
          }).call(function () {
            galleryThumbs.removeAllSlides();
            gallerySlider.removeAllSlides();
            thumbsElements.filter(function (item) {
              if (item.getAttribute('data-filter').indexOf(filter) >= 0 || filter === 'all') {
                galleryThumbs.appendSlide(item);
              }
            });
            sliderElements.filter(function (item) {
              if (item.getAttribute('data-filter').indexOf(filter) >= 0 || filter === 'all') {
                gallerySlider.appendSlide(item);
              }
            });
          }).to([sliderElement, thumbsElement], .3, {
            opacity: 1,
            clearProps: 'opacity'
          });
        });
      });
    }
  })();
})(jQuery);
