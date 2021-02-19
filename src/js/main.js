$(function () {
  $('.js-access-setting').on('change', function() {
    var $this = $(this);
    var $root = $this.closest('.setting-block');
    var $sections = $root.find('.setting-block__hidden-section');
    var $hiddenSection = $this.siblings('.setting-block__hidden-section');

    if ($(this).prop('checked') && $hiddenSection.length) {
      $hiddenSection.fadeIn();
    } else {
      $sections.hide();
    }
  });

  $('.js-close-notify').on('click', function() {
    $(this).closest('.notify').fadeOut();
  });

  $('.js-burger').on('click', function() {
    $('body').toggleClass('overflow');
    $(this)
      .toggleClass('burger--active')
      .closest('.header')
      .find('.header__content')
      .fadeToggle()
      .css('display', 'flex');
  });

  
  // Handle Form

  $('.setting-block').on('submit', function (event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: 'https://httpbin.org/post',
      data: new FormData($('.setting-block').get(0)),
      processData: false,
      contentType: false,
      dataType: "json",
    }).done(showSuccessNotify);
  });
  $('.js-reset-form').on('click', resetForm);


  // Functions

  function showSuccessNotify () {
    $('.js-notify-popup').fadeIn();
    resetForm();
    setTimeout(function () {
      $('.js-notify-popup').fadeOut();
    }, 4000);
  }
  function resetForm () {
    $('.setting-block').get(0).reset();
    $('.setting-block__hidden-section').hide();
  }
  function resetMobileMenuStyle () {
    if ($(window).width() > 767) {
      $('body').removeClass('overflow');
      $('.header__content').removeAttr('style');
      $('.js-burger').removeClass('burger--active'); 
    }
  }

  // Events
  
  $(window).on('resize.reset-style', resetMobileMenuStyle);
});