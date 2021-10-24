class maze{
    constructor(className){
        this.className = className;


        $(className).css({
            "border": "1px solid black",
            "border-collapse": "collapse"
        });

        $(className).find("td").css({
            "border": "1px solid black",
            "height": "50px",
            "width": "50px",
            "text-align": "center",
            "font-size": "30px",
            "font-weight": "bold",
            "color": "#F49551"
            //"border-left": "hidden"
        });
     
        var Direction = [ [1, 0], [0, 1], [-1, 0], [0, -1] ];//상우하좌

        var mazeCell = [ [0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0] ];

        var endCnt = 0;
        var stack = [];
        while(true){
            if(endCnt >= (mazeCell.length-2)*(mazeCell.length-2)) //
                break;

            var r1 = Math.floor(Math.random() * (mazeCell.length-1));
            var r2 = Math.floor(Math.random() * (mazeCell.length-1));
            if(r1 == 0 || r1 == mazeCell.length-1 || r1 % 2 == 0 || r2 == 0 || r2 == mazeCell.length-1 || r2 % 2 == 0 || mazeCell[r1][r2] == 1) 
                continue;
            mazeCell[r1][r2] = 1;
            endCnt++;
            stack.push([r1, r2]);
            while(stack.length != 0){
                var stdCell = stack.pop();
                var dir;
                var array = [0, 0, 0, 0];
                var cnt = 0;
                while(cnt != 4){
                    var index = Math.floor(Math.random() * (mazeCell.length-1));
                    if(array[index] == 1) continue;
                    array[index] = 1;
                    cnt++;
                    dir = Direction[index];
                    var ny = stdCell[0] + dir[0];
                    var nx = stdCell[1] + dir[1];
                    if(ny > 0 && ny < mazeCell.length-1 && nx > 0 && nx < mazeCell.length-1 && mazeCell[ny][nx] == 0) {
                        stack.push([ny, nx]);
                        mazeCell[ny][nx] = 1;
                        var cId = stdCell[0] + "" + stdCell[1];
                        console.log("stdCell : " + stdCell + ", new : " + ny + ":" + nx + ", " + index);
                        if(index == 0) $('#' + cId).attr('style', "border-top:hidden");
                        else if(index == 1) $('#' + cId).attr('style', "border-right:hidden");
                        else if(index == 2) $('#' + cId).attr('style', "border-bottom:none");
                        else if(index == 3) $('#' + cId).attr('style', "border-left:hidden");

                        //else if(i == 3) $('#' + stdCell[0] + "" + stdCell[1]).css('border-left', 'none');
                        cnt = 4;
                    }
                }

                endCnt++;
                console.log("endCnt : " + endCnt);
            }
            
            break;
        }
    }
}