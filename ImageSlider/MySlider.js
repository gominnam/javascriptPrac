class MySlider {
    constructor(className){
        this.className = className;
        this.direction = "right"; // 자동슬라이드 방향

        //l, li 스타일링
        $(className).find("li").css({
            "float": "left",
            "padding": "0px",
            "margin": "0px",
            "object-fit": "cover"
        });

        $(className).css({
            "list-style": "none", //list 점 표시 none
            "width": ($(className).find("li img").eq(0).width() * $(className).find("li img").length) + "px",
            "padding": "0px",
            "margin": "0px"
        });
        
        //컨테이너 생성
        $(className).before("<div></div>");
        $(className).prev().append($(className));

        //컨테이너 스타일링
        $(className).parent().css({
            "width": $(className).find("li img").eq(0).width() + "px",
            "overflow": "hidden" //스크롤바 없애기
        });

        //자동슬라이드 시작

        //버튼을 담을 컨테이너 생성
        $(className).parent().after("<div></div>");
        
        //버튼 컨테이너 안에 이전버튼/다음버튼 생성
        $(className).parent().next().append("<button class='prev'>이전 이미지</button>");
        $(className).parent().next().append("<button class='next'>다음 이미지</button>");

        //이전버튼, 다음버튼에 이벤트 바인딩
        $(className).parent().next().find("button.prev").on("click", () => { //에로우를 써야 앞의 this를 사용할 수 있다.
            this.prev();
        });
        $(className).parent().next().find("button.next").on("click", () => {
            this.next();
        });

        //이미지별 바로가기 버튼 생성
        for(var i=0; i<$(this.className).find("li img").length; i++){
            $(className).parent().next().append("<button class='go' data-index='"+i+"'>"+(i+1)+"</button>");
        };

        //이미지별 바로가기 버튼 이벤트 바인딩
        $(className).parent().next().find("button.go").on("click", (ev) => {
            this.goto( $(ev.target).attr("data-index"));
        });

        //이미지에 마우스 올렸을 때 슬라이드 중단, 이미지에서 마우스 벗어나면 슬라이드 재개
        $(className).find("li img").on("mouseenter", () => {
            this.stopAutoSlide();
        });
        $(className).find("li img").on("mouseleave", () => {
            this.startAutoSlide();
        });
    }

    /* 매서드 정의 */
    //다음이미지 버튼 클릭 이벤트
    next(){
        this.stopAutoSlide();
        $(this.className).parent().animate({
            "scrollLeft": $(this.className).parent().scrollLeft() + $(this.className).find("li img").eq(0).width()
        }, 200, () => {
            if($(this.className).parent().scrollLeft() == $(this.className).find("li img").eq(0).width()*($(this.className).find("li img").length-1))
                this.direction = "left";
            this.startAutoSlide();
        });
    }

    //이전이미지 버튼 클릭 이벤트
    prev(){
        this.stopAutoSlide();
        $(this.className).parent().animate({
            "scrollLeft" : $(this.className).parent().scrollLeft() - $(this.className).find("li img").eq(0).width()
        }, 200, () => {
            if($(this.className).parent().scrollLeft() == 0)
                this.direction = "right";
            this.startAutoSlide();
        });
    }

    //이미지 인덱스 바로가기
    goto(n) {
        this.stopAutoSlide();
        $(this.className).parent().animate({
            "scrollLeft" : $(this.className).find("li img").eq(0).width() * n
        }, 200, () => {
            if($(this.className).parent().scrollLeft() == 0)
                this.direction = "right";
            this.startAutoSlide();
        });
    }

    //자동 슬라이드 시작
    startAutoSlide(){
        this.timer = setInterval(() => {
            if(this.direction == "right") this.next();
        }, 3000);
    }

    //자동 슬라이드 중단
    stopAutoSlide(){
        clearInterval(this.timer);
    }

}