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
    $(this).toggleClass('burger--active');
  });
});