//界面展示
function showMoveAnimate(fromX, fromY, toX, toY){
    var numberCell = $("#number-cell-"+fromX+"-"+fromY);
    numberCell.animate({
        "top":getPosition(toX)+"px",
        "left":getPosition(toY)+"px"
    },200);
    console.log(fromX+"  "+fromY);
}
