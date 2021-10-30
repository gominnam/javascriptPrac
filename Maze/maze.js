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
     
        var Direction = [ [1, 0, 2, 0, 0], [0, 1, 0, 2, 1], [-1, 0, -2, 0, 2], [0, -1, 0, -2, 3] ];//상우하좌(1칸 2칸) + 방향
        var mazeCell = [ [0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0] ];
        var directionCheck = [0, 0, 0, 0];
        var stack = [];
        function direction(){
            var dir = Math.floor(Math.random() * (mazeCell.length-1));
            if(dir == 0) return Direction[0];
            if(dir == 1) return Direction[1];
            if(dir == 2) return Direction[2];
            if(dir == 3) return Direction[3];
        }

        function allDirectionCheck(){
            for(var i=0; i<4; i++){
                if(directionCheck[i] == 0) return true;
            }
            directionCheck = [0, 0, 0, 0];
            return false;
        }

        while(true){
            var r1 = Math.floor(Math.random() * (mazeCell.length-1));
            var r2 = Math.floor(Math.random() * (mazeCell.length-1));

            if(r1 == 0 || r1 == mazeCell.length-1 || r1 % 2 == 1 || r2 == 0 || r2 == mazeCell.length-1 || r2 % 2 == 1) 
                continue;

            mazeCell[r1][r2] = 1;
            stack.push([r1, r2]);
            break;
        }

        while(stack.length != 0){
            var standardCell = stack.pop();
            while(allDirectionCheck()){
                var dir = direction();
                directionCheck[dir[4]] = 1;
                var m1 = [standardCell[0] + dir[0], standardCell[1] + dir[1]];
                var m2 = [standardCell[0] + dir[2], standardCell[1] + dir[3]];
                if(m1[0] >= 0 && m1[0] < mazeCell.length && m1[1] >= 0 && m1[1] < mazeCell.length &&
                    m2[0] >= 0 && m2[0] < mazeCell.length && m2[1] >= 0 && m2[1] < mazeCell.length && 
                    mazeCell[m1[0]][m1[1]] == 0 && mazeCell[m2[0]][m2[1]] == 0){

                    mazeCell[m1[0]][m1[1]] = 1;
                    mazeCell[m2[0]][m2[1]] = 1;
                    stack.push(standardCell);
                    stack.push(m2);
                    directionCheck = [0, 0, 0, 0];
                    break;
                }
            }
        }

        mazeCell[0][1] = 1;
        mazeCell[mazeCell.length-1][mazeCell[0].length-2] = 1;

        for(var i =0; i<mazeCell.length; i++){
            var str = "";
            for(var j = 0; j<mazeCell[0].length; j++){
                str += mazeCell[i][j] + " ";
            }
            console.log(str);
        }
    }
}