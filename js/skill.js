
 // 객체.addEventListener('이벤트명', 함수);
  document.addEventListener('DOMContentLoaded', function() {
    const digEle = document.getElementById('digital'); //전역변수 - 모든곳에서 변수를 호출해서 사용가능
    function clock() {
     const now = new Date();
     const yy = now.getFullYear();
     const mm = now.getMonth()+1; //0~11월 => 1월~12월
     const dd = now.getDate();
     const day = now.getDay(); //0(일)~6(토)요일
     let h = now.getHours();
     let m = now.getMinutes();
     let s = now.getSeconds();
    //  console.log(now)
    //  console.log(yy,mm,dd,day,h,m,s);

     //요일변경
     const week = ['일', '월', '화', '수', '목', '금', '토'];
    //  console.log(week[day]);

     //오전, 오후 -> ampm
     const ampm = h < 12? 'AM': 'PM'; 
    //  console.log(ampm);

     //24시간제(0~23) -> 12시간제(0~11)
     h %= 12; // h= h%12
    //  console.log(h);
     //삼항조건연산자  조건식? 실행문1 : 실행문2;
     h = h? h : 12;
    //  console.log(h);

     // 시, 분, 초 모두 한자리일 경우 2자리로 변경: '0' 결합연산
     if (h < 10) h = '0'+ h; 
     if (m < 10) m = '0'+ m; 
     if (s < 10) s = '0'+ s; 
    //  console.log(h, m, s);

     const result = `${yy}-${mm}-${dd} ${week[day]}요일<br>${ampm} ${h}:${m}:${s}`;
    //  console.log(result); 
     
     //#digital을 찾아서 내부에 result를 출력시키기 (스크립트:innerHTML or 제이쿼리:html매서드에 출력하기)
     //대상.innerHTML = 값;
     // const digEle = document.getElementById('digital'); > 지역변수: {}코드블럭 안에서만 사용된다
     digEle.innerHTML = result;
    }
    //clock(); //문서가 실행되고 한번만 동작 
             //즉시실행

    //1초에 한번씩 clock() 함수 호출하기 => setInterval (함수이름 or 익명함수, 시간간격)
    //setInterval() 메서드 내부에서 호출하는 함수 이름은 ()를 작성하지 않는다 
    let timer = setInterval(clock, 1000); //조건을 만족시킬때 실행

    //#btn 버튼을 클릭하면 setInterval() 멈추기 => clearInterval(참조변수);
    document.querySelector('#btn').addEventListener('click', function () {
        clearInterval(timer);
        //(자바스크립트에서 스타일 추가) 대상.style.속성명 = 값;
        /*digEle.style.backgroundColor = 'coral'; //자바스크립트 스타일 속성명에는 - 사용불가
        digEle.style.color = 'yellow';*/
        digEle.style.cssText = 'background-color: #7D9BA8;color: #fff';  //cssText는 css와 동일하게 사용
    
    }); 
  });

  $(document).ready(function () {
    // skill3
   // 1) 초기값설정
   $('#cnt2Tab .tab:first-of-type, #cnt2Tab .tabpanel:first-of-type').addClass('on').attr({tabIndex: 0});
   $('#cnt2Tab .tab:first-of-type').attr({'aria-selected': true}).siblings().attr({'aria-selected': false});
   $('#cnt2Tab .tabpanel:first-of-type').attr({'aria-hidden': false}).siblings('.tabpanel').attr({'aria-hidden': true});
 
 
     // 2) 키보드 제어
     $('.tab').on('keydown', function (e) {
       const key = e.keyCode;
       console.log(key);
 
       // tab(9), 이전방향키(37), 다음방향키(39), home(36), end(35), enter(13)/spacebar(32)
 
       switch (key) {
         case 37:
           if($(this).is('.first')){
             $(this).parent().find('.last').attr({tabIndex: 0}).focus();
           }else {
             $(this).prev().attr({tabIndex: 0}).focus();
           }
           break;
         case 39:
           if($(this).is('.last')){
             $(this).parent().find('.first').attr({tabIndex: 0}).focus();
           }else {
             $(this).next().attr({tabIndex: 0}).focus();
           }
           break;
         case 36:
           e.preventDefault(); //기본 기능을 제한:홈키는 문서의 가장 처음으로 이동
         $(this).attr({tabIndex: -1});
         $(this).siblings('.first').attr({tabIndex: 0}).focus();
         break;
         case 35:
           e.preventDefault();  
         $(this).attr({tabIndex: -1});
         $(this).siblings('.last').attr({tabIndex: 0}).focus();
         break;
         case 13:
         case 32:
           e.preventDefault();
           // a,button은 엔터나 스페이스바를 누르면 자동으로 클릭이 가능하지만 li는 불가능 하기때문에 강제로 클릭 이벤트를 넣어주어야 함. 
          $(this).click();
           const $tgTab = $(this);
           tabActive($tgTab)
       }
 
     });
 
     // 3) 마우스 제어 - 클릭이벤트
     $('#cnt2Tab .tab').on('click', function () {
      // 탭 : 클릭한탭.tab.on -> tabIndex0 -> aria-selected:true / 클릭하지 않은탭은 반대로 설정하기
      $(this).addClass('on').attr({tabIndex: 0, 'aria-selected': true}).siblings('.tab').removeClass('on').attr({tabIndex: -1, 'aria-selected': false});
  
      // 탭패널 : 선택된 탭패널 .tabpanel.on -> tabIndex0 -> aria-hidden:false / 선택되지 않은 탭패널은 반대로 설정
      // 선택된 탭패널 변수 생성
      const $tgPanel = $('#' + $(this).attr('aria-controls'));
      console.log($tgPanel, typeof $tgPanel);
      $tgPanel.addClass('on').attr({tabIndex: 0, 'aria-hidden': false}).siblings('.tabpanel').removeClass('on').attr({tabIndex: -1, 'aria-hidden': true});
    });


     // skill4
     const $visualCnt = $('#miniSlider .visual ul');
      /* 이전 버튼 클릭
      0) 현재 애니메이션 중이라면 함수를 강제로 종료
      :animated 필터선택자 : 현재 애니메이션 진행여부를 알려줌
      1) 가장 마지막 li를 복제  .clone()
      2) ul의 첫번째 자식으로 동적생성 .prepend()
      3) ul의 margin-left: -400px; (추가된 li 때문에 한칸씩 밀리지 못하도록 제어)
      4) ul에 .animate({properties}[, duration, easing, complete]) margin-left:0;으로 
      5) animate() 완료후 마지막 li를 삭제 .remove()
      */
      $('#prev').on('click', function () {
        if ($visualCnt.is(':animated')) return false;
        $visualCnt.prepend($visualCnt.children().last().clone()).css('marginLeft', -390).animate({marginLeft: 0}, 1000, function () {
          $(this).children().last().remove();
          ariaHidden();
        });
      });
    
      /* 다음 버튼 클릭이벤트
        0) 현재 애니메이션이 진행중이면 함수 강제 종료
        1) 가장 첫번째 li를 복제  .clone()
        2) ul의 마지막 자식으로 동적생성 .append()
        3) ul에 .animate() margin-left:-400;으로
        4) animate() 완료후 ul의 margin-left:0으로 되돌리고 그리고 첫번째 li를 삭제
      */
      $('#next').on('click', function () {
        if ($visualCnt.is(':animated')) return false;
        $visualCnt.append($visualCnt.children().first().clone()).animate({marginLeft: -390}, 1000, function () {
          $(this).css('marginLeft', 0).children().first().remove();
          ariaHidden();
        });
      });

      // 접근성 추가
      function ariaHidden() {
        // 1) 모든 li를 aria-hidden: true 속성 설정
        $visualCnt.children().attr('aria-hidden', true);
        // 2) 1개만 aria-hidden: false로 바꾸기 .slice(시작인덱스, 종료인덱스) 종료인덱스 자신은 포함하지 않음
        $visualCnt.children().slice(0,1).attr('aria-hidden', false);
      }
      ariaHidden();

 
 
 });