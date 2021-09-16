class Game2048{
    constructor(className){
        $(className).find("td").css({
            "border": "3px solid #DRDRDR",
            "height": "100px",
            "width": "100px",
            "text-align": "center",
            "font-size": "30px",
            "font-weight": "bold",
            "color": "#F49551",
            "background-color": "#BEBEBE"
        })
        
    }
}
var score = 0;

init();

//초기화 화면
function init(){
    for(var i=1; i<=4; i++){
        for(var j=1; j<=4; j++){
            var boardId = i*10 + j + "";
            $('#' + boardId).text(0);
        }
    }

    for(var i=0; i<2; i++){
        createNumber();
    }
}

function createNumber(){
    var check = true;
    while(check){
        var x = parseInt(Math.random()*4 + 1) * 10;
        var y = parseInt(Math.random()*4 + 1);
        var pos = x + y;
        if($('#' + pos).text() == 0){
            $('#' + pos).text(2);
            check = false;
        }
    }
}

//키보드 입력 이벤트
$(document).ready(function() {
    $(this).keydown(function(e) {
        e.preventDefault();
        if(e.keyCode == 38) { keyDir("up"); }
        if(e.keyCode == 40) { keyDir("down"); }
        if(e.keyCode == 37) { keyDir("left"); }
        if(e.keyCode == 39) { keyDir("right"); }
    });

});

//키보드 이동방향 처리
function keyDir(e){
    switch(e){
        case "up":
            rotation(0);
            break;
        
        case "down":
            break;

        case "left":
            break;
        
        case "right":
            break;
    }
}

function rotation(){
    
}
