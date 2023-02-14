// ----------------------------------------------------------------------------
// Accordion : hide content
// ----------------------------------------------------------------------------
$(function () {

  // --------------------------------------
  // Basic
  // --------------------------------------
  let flag = true,
    open_class = 'is_open',
    accordion_toggle = {
      open: function () {

        $clicked_accordion_item = $(this);

        $clicked_accordion_item
          .trigger('before.accordion_open');

        $clicked_accordion_item
          .find('[data-accordion="trigger"]')
          .attr('aria-expanded', true);

        $clicked_accordion_item
          .addClass(open_class)
          .find('[data-accordion="panel"]')
          .slideDown(200);

        $clicked_accordion_item
          .trigger('after.accordion_open');

      },
      close: function () {

        $clicked_accordion_item = $(this);

        $clicked_accordion_item
          .trigger('before.accordion_close');

        $clicked_accordion_item
          .find('[data-accordion="trigger"]')
          .attr('aria-expanded', false);

        $clicked_accordion_item
          .removeClass(open_class)
          .find('[data-accordion="panel"]')
          .slideUp(200);

        $clicked_accordion_item
          .trigger('after.accordion_close');
      }
    };

  $('[data-accordion="trigger"]').on('click', function () {

    if (flag == false) return;
    flag = false;
    setTimeout(function () { flag = true; }, 500);

    $clicked_accordion_item = $(this).closest('[data-accordion="item"]');
    accordion_toggle[
      $clicked_accordion_item.hasClass(open_class) ?
        'close' : 'open'
    ].bind($clicked_accordion_item)();
  });



  // --------------------------------------
  // Open only 1
  // --------------------------------------
  $('[data-accordion="item"]').on('before.accordion_open', function () {

    let $event_accordion_item = $(this),
      $accordion = $event_accordion_item.closest('[data-accordion-type="open_only_1"]');

    if ($accordion.length === 0) {
      return;
    }

    let $accordion_items = $accordion.find('[data-accordion="item"]');

    $accordion_items.each(function () {

      if ($(this).is($event_accordion_item)) {
        return;
      }

      if ($(this).hasClass(open_class)) {

        $(this).removeClass(open_class)
          .find('[data-accordion="panel"]')
          .slideUp(200);
      }
    });

  });
});






// ----------------------------------------------------------------------------
// Accordion : hide some posts at initial
// ----------------------------------------------------------------------------
$(function () {

  add_height_news_items();
  $(window).on('resize', add_height_news_items);

  $('[data-post-accordion-limit] .btn_more')
    .on('click', toggle_news_items);
});


function add_height_news_items() {
  $('[data-post-accordion-limit]').each(function () {
    let limit = $(this).data('post-accordion-limit'),
      $news_items = $(this).find('[data-post-accordion="items"]'),
      $news_item = $(this).find('[data-post-accordion="item"]'),
      news_item_height = 0;

    for (let i = 0; i <= limit - 1; i++) {
      news_item_height += $($news_item[i]).outerHeight(true);
    }

    if (parseInt($news_items.css('height')) !== news_item_height &&
      $news_items.hasClass('is_show_all') === false) {

      $news_items
        .css('height', news_item_height)
        .attr('data-post-accordion-limited-height', news_item_height);
    }
  });
}


function toggle_news_items() {

  let $news_items = $(this).prev('[data-post-accordion="items"]');

  if ($news_items.hasClass('is_show_all')) {

    $news_items
      .removeClass('is_show_all')
      .animate({ 'height': $news_items.data('post-accordion-limited-height') });

    $(this).text($(this).data('btn_more_text'));
  } else {

    $news_items
      .addClass('is_show_all')
      .animate({ 'height': $news_items.get(0).scrollHeight });

    $(this).text($(this).data('btn_more_text_close'));
  }
}
