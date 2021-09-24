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
var board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

init();

//초기화 화면
function init(){
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            var boardId = i + "" + j;
            $('#' + boardId).text(board[i][j]);
        }
    }

    for(var i=0; i<2; i++){
        createNumber();
    }
}

function createNumber(){
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            var boardId = i + "" + j;
            //$('#' + boardId).text(0);
            $('#' + boardId).text(board[i][j]);
        }
    }

    var check = true;
    while(check){
        var x = parseInt(Math.random()*4);
        var y = parseInt(Math.random()*4);
        var pos = x + "" + y;
        console.log(pos);
        if($('#' + pos).text() == 0){
            $('#' + pos).text(2);
            board[y][x] = 2;
            check = false;
        }
    }
    $('#score').html("SCORE : " + score);
    //document.getElementById("score").innerHTML=score;
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
            calculation();
            createNumber();
            break;
        
        case "down":
            rotation(2);
            calculation();
            rotation(2);
            createNumber();
            break;

        case "left":
            rotation(1);
            calculation();
            rotation(3);
            createNumber();
            break;
        
        case "right":
            rotation(3);
            calculation();
            rotation(1);
            createNumber();
            break;
    }
}

function rotation(r){
    for(var k=0; k<r; k++){
        var tmp = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                tmp[i][j] = board[i][j];
            }
        }
        console.log("before");
        console.log(board);
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                board[j][3-i] = tmp[i][j];
            }
        }
        console.log("after");
        console.log(board);
    }
}

function calculation(){
    var flag = false;
    var tmp = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    console.log(board);
    for(var i=0; i<4; i++){
        var rowArr = [board[0][i], board[1][i], board[2][i], board[3][i]];
        console.log(rowArr);
        for(var j=0; j<3; j++){//덧셈 2 0 0 2 일 때 계산 안되는 문제 해결하기
            if(rowArr[j] == 0) continue;
            else if(rowArr[j] == rowArr[j+1]){
                rowArr[j] += rowArr[j+1];
                rowArr[j+1] = 0;
                score += rowArr[j];
                flag = true;
            }
        }
        var pos = 0;
        for(var j=0; j<4; j++){
            if(rowArr[j] != 0){
                //tmp[i][pos++] = rowArr[j];
                tmp[pos++][i] = rowArr[j];
            }
            else flag = true;
        }
    }

    board = tmp;
    if(!flag) {
        var maxNum = 0;
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                if(board[i][j] > maxNum) maxNum = board[i][j];
            }
        }
        alert("[The End]\n Score : " + score + "\nMax Number : " + maxNum);
    }
    //else createNumber();
}