$(document).ready(function() {
  // cursor
  $(document).mousemove(function(e) {
    $('#cursor1').css({left: e.pageX,top: e.pageY});
    setTimeout(function() {
    $('#cursor2').css({left: e.pageX,top: e.pageY});
    }, 100);
  })

  
  //fade effect
  // 1) scroll 이벤트 선언
  $(window).on('scroll', function () {
    // 2) 스크롤바의 수직이동거리를 변수에 저장(스크롤을 빨리 움직이는 사용자를 위해 값을 더해주기)
    const scrollY = $(this).scrollTop() + $(this).height();
    // ★위치, 크기, 스크롤이동거리 메서드 기억하기

    // 3) 스크롤바의 수직이동거리와 나(보여질 컨텐츠)의 위치가 가까워질 경우만 .fade.on클래스명 추가
    $('.fade').each(function () {
        if(scrollY > $(this).offset().top) $(this).addClass('on');
        // 하단에서 상단으로 다시 올렸을때 효과가 반복되길 바란다면 추가 
        else $(this).removeClass('on');
    });

});

  


// clickm
$('#project1 a, #project2 a').mouseenter(function (){
  $(this).addClass('clickm');
});


$('#intro2 .stop').hide();
$('#intro2 .play').on('click', function () {
  $(this).hide();
  $('#intro2 .stop').show();
});
$('#intro2 .stop').on('click', function () {
  $(this).hide();
  $('#intro2 .play').show();
});













});

