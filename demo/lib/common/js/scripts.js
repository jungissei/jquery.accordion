// ----------------------------------------------------------------------------
// Accordion
// ----------------------------------------------------------------------------
add_height_news_items();
$(window).on('resize', add_height_news_items);

function add_height_news_items(){
  $('.page_news[data-limit]').each(function(){
    let limit = $(this).data('limit'),
        $news_items = $(this).find('.news_items'),
        $news_item = $(this).find('.news_item'),
        news_item_height = 0;

    for (let i = 0; i <= limit-1; i++){
      news_item_height += $($news_item[i]).outerHeight(true);
    }

    if(parseInt($news_items.css('height')) !== news_item_height&&
        $news_items.hasClass('is_show_all') === false){

      $news_items
        .css('height', news_item_height)
        .attr('data-limited-height', news_item_height);
    }
  });
}


$('.page_news[data-limit] .btn_more').on('click', toggle_news_items);

function toggle_news_items(){

  let $news_items = $(this).prev('.news_items');

  if($news_items.hasClass('is_show_all')){

    $news_items
      .removeClass('is_show_all')
      .animate({'height' : $news_items.data('limited-height')});

    $(this).text($(this).data('btn_more_text'));
  }else{

    $news_items
      .addClass('is_show_all')
      .animate({'height' : $news_items.get(0).scrollHeight});

    $(this).text($(this).data('btn_more_text_close'));
  }
}
