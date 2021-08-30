class MySlider {
    constructor(className){
        this.className = className;
        this.direction = "right"; // 자동슬라이드 방향
        var imgSize = 0;

        //l, li 스타일링
        $(className).find("li").css({
            "float": "left",
            "padding": "0px",
            "margin": "0px"
        });
        $.each($(className).find("li img"), function(i, item){
            imgSize += $(this).width();
        });
        $(className).css({
            "list-style": "none", //list 점 표시 none
            "width": imgSize + "px",
            "padding": "0px",
            "margin": "0px"
        });
        console.log(imgSize);
        

        $.each($(className).find("li"), function(i, item){
            $(this).css("width", "600");
            $(this).css("height", "300");
            $(this).css("object-fit", "cover");
        });
        //컨테이너 생성
        $(className).before("<div></div>");
        $(className).prev().append($(className));
        //컨테이너 스타일링
        $(className).parent().css({
            "width": $(className).find("li img").eq(0).width() + "px",
            //"overflow": "hidden" //스크롤바 없애기
        });


    }
}