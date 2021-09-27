$(document).ready(function() {
    

    //#cnt2-1 장식요소들
    let currentX = '';
    let currentY = '';
    const moveDis = 0.01;
    $('#cnt2-1').on('mousemove', function(e){
        if (currentX == '') currentX = e.pageX;
        const xdiff = e.pageX - currentX;
        currentX = e.pageX;
        if (currentY == '') currentY = e.pageY;
        const ydiff = e.pageY - currentY;
        currentY = e.pageY;
        $('#cnt2-1 .mouseM').each(function(i, el) {
            let movementx = (i + 1) * (xdiff * moveDis);
            let movementy = (i + 1) * (ydiff * moveDis);

            if (i%2 === 0) {
                movementx = -movementx;
                movementy = -movementy;
            }
            const newX = $(el).position().left + movementx;
            const newY = $(el).position().top + movementy;
            $(el).css({left: newX + 'px', top: newY + 'px'});
        });
    });

    $(window).scroll(function () {
      //#cnt2-1
      $('.bg_img').addClass('active');
      $('.txt').addClass('active');

      const scrollTop = $(this).scrollTop();
        // #cnt2-1 창열리기 sticky로 제어
        if (scrollTop >= $('#cnt2-1').offset().top && scrollTop < $('#cnt2-1').offset().top + 1200) {
            $('#cnt2-1').addClass('on');
        } 
        else {
            $('#cnt2-1').removeClass('on');
        }

      //#cnt4
      const $project_wrap = $('.project_wrap');
      const projectwrapY = $project_wrap.offset().top;  //.project_wrap 상단 브라우저에서 떨어진 거리
      const projectwrapHei = $project_wrap.outerHeight(); //.project_wrap 세로 높이(border 포함)
      // console.log(projectwrapY, projectwrapHei);  //2100, 3666
      const scrollY = $(this).scrollTop();    //스크롤바 이동거리
      const leftMove = scrollY - projectwrapY; // absolute를 가지는 .hor_long의 left좌표
      console.log(scrollY);

      if (scrollY < projectwrapY - $(window).height()/10) {  //.cnt_top이 보여지는 동안: left 0고정, 스크롤을 빨리 움직이는 사용자 때문에 조금만 빨리 animate()
        /* gsap.to('#box', {rotation: 27, x: 100, duration: 1});
        첫 번째 파라미터는 트윈 할 대상(Target)
        두 번째 속성(Properties) */
        gsap.to('.hor_long', {left: 0, duration: 0.5, ease: Power3.easeOut});
      } else if (scrollY < projectwrapY + projectwrapHei - $(window).height()) { //.cnt_btm이 보이지 전 : left=> 스크롤바의 이동거리-.sticky_wrap의수직위치
        gsap.to('.hor_long', {left: -leftMove, duration: 0.5, ease: Power3.easeOut});
      }  
    });
  





    // #cnt2
        //  1) 첫번째 .tab과 .tabpanel 활성화 (클래스 추가, tabIndex 0) / aria의 state 초기 설정
        // :first-of-type 필터선택자는 같은 부모에서 동일한 타입을 가진 자식중에 첫번째
        $('#cnt2 .tab:first-of-type, #cnt2 .tabpanel:first-of-type').addClass('on').attr({tabIndex: 0});
        $('#cnt2 .tab:first-of-type').attr({'aria-selected': false}).siblings().attr({'aria-selected': true});
        $('#cnt2 .tabpanel:first-of-type').attr({'aria-hidden': false}).siblings('.tabpanel').attr({'aria-hidden': true});
      
        // 2) 키보드 제어 - tab(9), 이전방향키(37), 다음방향키(39), home(36), end(35), enter(13)/spacebar(32)
        $('#cnt2 .tab').on('keydown', function (e) {
          const key = e.keyCode;
          console.log(key);
          switch (key) {
            case 37:  //이전 방향키
              // 나자신의 포커스 제거
              $(this).attr({tabIndex: -1});
              // if (만약 내가 .first라는 클래스명을 가졌다면) .last로 포커스 보내기
              // else 이전 li를 찾아서 포커스 보내기
              if ($(this).is('.first')) {
                $(this).siblings('.last').attr({tabIndex: 0}).focus();
              } else {
                $(this).prev().attr({tabIndex: 0}).focus();
              }
              break;
            case 39:  //다음 방향키
              $(this).attr({tabIndex: -1});
              if ($(this).hasClass('last')) {
                $(this).siblings('.first').attr({tabIndex: 0}).focus();
              } else {
                $(this).next().attr({tabIndex: 0}).focus();
              }
              break;
            case 36:  //home
              e.preventDefault(); //기본 기능을 제한:홈키는 문서의 가장 처음으로 이동
              $(this).attr({tabIndex: -1});
              $(this).siblings('.first').attr({tabIndex: 0}).focus();
              break;
            case 35:  //end
              e.preventDefault();
              $(this).attr({tabIndex: -1});
              $(this).siblings('.last').attr({tabIndex: 0}).focus();
              break;
            case 13:
            case 32:
              e.preventDefault();
              $(this).click();
          }
        });
      
        // 3) 마우스 제어 - 클릭이벤트
        $('#cnt2 .tab').on('click', function () {
          // 탭 : 클릭한탭.tab.on -> tabIndex0 -> aria-selected:true / 클릭하지 않은탭은 반대로 설정하기
          $(this).addClass('on').attr({tabIndex: 0, 'aria-selected': true}).siblings().removeClass('on').attr({tabIndex: -1, 'aria-selected': false});
      
          // 탭패널 : 선택된 탭패널 .tabpanel.on -> tabIndex0 -> aria-hidden:false / 선택되지 않은 탭패널은 반대로 설정
          // 선택된 탭패널 변수 생성
          const $tgPanel = $('#' + $(this).attr('aria-controls'));
          console.log($tgPanel, typeof $tgPanel);
          $tgPanel.addClass('on').attr({tabIndex: 0, 'aria-hidden': false}).siblings('.tabpanel').removeClass('on').attr({tabIndex: -1, 'aria-hidden': true});
        });
  


    // #cnt3
    const $acdn = $('#cnt3 .accordion')
    // 1) header의 초기설정 아코디언 패널이 열려있는지 열려있지 않는지
    $acdn.find('.title:nth-of-type(4) .header').addClass('on').attr({'aria-expanded': true, 'aria-disabled': false}).parent().siblings('.title').children().attr({'aria-expanded': false});

    $acdn.find('.panel:nth-of-type(4)').addClass('on').attr({tabIndex : 0});
    // 2) 키보드제어 - 상단방향키(38), 하단방향키(40), home(36), end(35), enter/spacebar(click 이벤트가 대신함)

    // 3) 마우스제어 - 클릭이벤트
    $acdn.find('.header').on('click', function () {
        if ($(this).hasClass('on')) {//열려진 경우 =>현재 열려진 헤더,패널 초기화
            $(this).removeClass('on').attr({'aria-expanded': false}).removeAttr('aria-disabled').parent().next().removeClass('on').attr({tabIndex: -1});
        } else{ // 닫긴경우
        //아코디언 헤더
        $(this).addClass('on').attr({'aria-expanded': true, 'aria-disabled': true}).parent().siblings('.title').children().removeClass('on').attr({'aria-expanded': false}).removeAttr('aria-disabled');

        //아코디언 패널
        $(this).parent().next().addClass('on').attr({tabIndex : 0}).siblings('.panel.on').removeClass('on').attr({tabIndex: -1});
        }
        
    });
    $acdn.find('.header').mouseenter(function () {
        $(this).addClass('clickm')
    });

    $('.header').on({
      'mouseenter focusin': function (){
        $(this).addClass('mouseon');
      },
      'mouseleave focusout': function (){
        $(this).removeClass('mouseon');
      }
    })





    // top 이동 버튼
	$(".top").on("click", function () {
		$("html, body").stop().animate({scrollTop: 0});
		return false;
	});



});

  