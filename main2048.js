//���߼�js
var board = new Array();
var score = 0;
var hasMoved = new Array();

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

var screenLength = window.screen.availWidth;
var container = screenLength*0.92;
var gridlength = screenLength*0.18;
var gridpaddinglength = screenLength*0.04;
$(document).ready(function(){
	newGame();
});
function newGame(){
	viewInit();
	init();
}
function viewInit(){
	if (screenLength > 500) {
		container = 500;
		gridlength = 100;
		gridpaddinglength = 20;
	};
	$(".grid-container").css("width",container-2*gridpaddinglength);
	$(".grid-container").css("height",container-2*gridpaddinglength);
	$(".grid-container").css("padding",gridpaddinglength);
	$(".grid-container").css("border-radius",container*0.02);

	$(".grid").css("width",gridlength);
	$(".grid").css("height",gridlength);
	$(".grid").css("border-radius",gridlength*0.02);
}
function init(){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getPosition(i)+"px");
			gridCell.css("left",getPosition(j)+"px");
		};
	};

	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		hasMoved[i] = new Array();
		for (var j = 0; j < 4; j++) {
				board[i][j] = 0;
				hasMoved[i][j] = false;
			};	
	}
	updateBoardView();
	generateOneNumber();
	generateOneNumber();	
}

function getPosition(num){
	return gridpaddinglength+num*(gridlength+gridpaddinglength);
}
//
function updateBoardView(){
	
	$(".number-cell").remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			
			$(".grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			var numberCell = $('#number-cell-'+i+'-'+j);
			if (board[i][j] == 0) {
				numberCell.css("width","0px");
				numberCell.css("height","0px");
				numberCell.css("left",getPosition(j)+gridlength/2+"px");
				numberCell.css("top",getPosition(i)+gridlength/2+"px");
			}else{
				numberCell.css("width",gridlength+"px");
				numberCell.css("height",gridlength+"px");
				numberCell.css("left",getPosition(j)+"px");
				numberCell.css("top",getPosition(i)+"px");
				numberCell.css("background-color",getNumBackGroundColor(board[i][j]));
				numberCell.css("color",getNumberColor(board[i][j]));
				numberCell.text(board[i][j]);	
			}
			hasMoved[i][j] = false;
		};
	};
	$('.number-cell').css('line-height',gridlength+'px');
    $('.number-cell').css('font-size',0.6*gridlength+'px');
}
//获取数字背景颜色
function getNumBackGroundColor(num){
	switch (num){
		case 2: return "#eee4da";
		case 4: return "#ede0e8";
		case 8: return "#f2b179";
		case 16 : return "#f59563";
		case 32 : return "#f67e5f";
		case 64 : return "#f65e3b";
		case 128 : return "#edcf72";
		case 256 : return "#edcc61";
		case 512 : return "#9c0";
		case 1024 : return "#33b5e5";
		case 2048 : return "#09c";
		case 4096 : return "#a6e";
		case 8192 :return "#93e";
		default : return ;
	}
}
//获取数字的颜色
function getNumberColor(num){
	if (num<=4) {
		return "#776e65"
	}else{
		return "white";
	}
}
//产生随机数
function generateOneNumber(){
	if(nospace(board)){
		return false;
	}
	//产生随机位置
	var randomx = parseInt(Math.floor(Math.random()*4));
	var randomy = parseInt(Math.floor(Math.random()*4));
	var randCount = 0;
	while(randCount<50){
		if(board[randomx][randomy] == 0){
			break ;
		}
		randomx = parseInt(Math.floor(Math.random()*4));
	    randomy = parseInt(Math.floor(Math.random()*4));
	}
	if (randCount == 50) {
		for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j]==0) {
				randomx = i;
				randomy = y;
			};
		};
	};
	};
	//产生随机数字
	var randNum = Math.random() < 0.5 ? 2 : 4;
	//在随机位置显示随机数
	board[randomx][randomy]  = randNum;
	showNumberWithAnimate(randomx,randomy,randNum);
	return true;
}
//判断是否还有空余位置
function nospace(number){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (number[i][j]==0) {
				return false;
			};
		};
	};
	return true;
}
//在界面显示随机数(show)
function showNumberWithAnimate(i,j,randomNum){
	var numCell = $('#number-cell-'+i+'-'+j);
	numCell.css("background-color",getNumBackGroundColor(board[i][j]));
	numCell.css("color",getNumberColor(board[i][j]));
	numCell.text(randomNum);
	numCell.animate({
		"width":gridlength+"px",
		"height":gridlength+"px",
		"top":getPosition(i)+"px",
		"left":getPosition(j)+"px",
	},50);
}

$(document).keydown(function(e){
	var keyNum = e.keyCode;
	switch(keyNum){
		case 37 : 
			if (moveLeft()) {
				generateOneNumber();
				isGameOver();
			};
			break;
		case 39 : 
			if (moveRight()) {
				generateOneNumber();
				isGameOver();
			};
			break;
		case 38 : 
			if (moveTop()) {
				generateOneNumber();
				isGameOver();
			};
			break;
		case 40 : 
			if (moveBottom()) {
				generateOneNumber();
				isGameOver();
			};
			break;
		default : 
			break;
	}
});
function moveLeft(){
	if (!canMoveLeft(board)) {
		return false;
	};
	//向左移动
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < j; k++) {
					if (board[i][k] == 0  && noBlockHorizontal(i,k,j,board)) {
						showMoveAnimate(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						//hasMoved[i][k] = true;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasMoved[i][k]){
						showMoveAnimate(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						hasMoved[i][k] = true;
						score += board[i][k];
						continue;
					}
				};
			};
		};
	};
	setTimeout("updateBoardView()",200);
	$("#score").text(score);
	return true;
}
function moveRight(){
	if (!canMoveRight(board)) {
		return false;
	};
	//向右移动
	for (var i = 0; i <4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j] != 0) {
				for (var k = 3; k > j; k--) {
					if (board[i][k] == 0 && noBlockHorizontal(i,j,k,board)) {
						showMoveAnimate(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						//hasMoved[i][k] = true;
						continue;
					}else if (board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasMoved[i][k]) {
						showMoveAnimate(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						hasMoved[i][k] = true;
						score += board[i][k];
						continue;
					};
				};
			};
		}
	};
	setTimeout("updateBoardView()",200);
	$("#score").text(score);
	return true;
}
function moveTop(){
	if (!canMoveTop(board)) {
		console.log("!canMoveTop");
		return false;
	};
	console.log("canMoveTop");
	//向上移动
	for (var j = 0; j < 4; j++) {
		for (var i = 1; i <4; i++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < i; k++) {
					if (board[k][j] == 0 && noBlockVertical(j,k,i,board)) {
						showMoveAnimate(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						//hasMoved[k][j] = true;
						continue;
					}else if (board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasMoved[k][j]) {
						showMoveAnimate(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						hasMoved[k][j] = true;
						score += board[k][j];
						continue;
					};
				};
			};
		}
	};
	setTimeout("updateBoardView()",200);
	$("#score").text(score);
	return true;
}
function moveBottom(){
	if (!canMoveBottom(board)) {
		return false;
	};
	//向下移动
	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >= 0; i--) {
			if (board[i][j] != 0) {
				for (var k = 3; k > i; k--) {
					if (board[k][j] == 0 && noBlockVertical(j,i,k,board)) {
						showMoveAnimate(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						//hasMoved[k][j] = true;
						continue;
					}else if (board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasMoved[k][j]) {
						showMoveAnimate(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						hasMoved[k][j] = true;
						score += board[k][j];
						continue;
					};
				};
			};
		}
	}
	setTimeout("updateBoardView()",200);
	$("#score").text(score);
	return true;
}
document.addEventListener('touchstart',function(e){
	startX = e.touches[0].pageX;
	startY = e.touches[0].pageY;
});
document.addEventListener('touchend',function(e){
	endX = e.changedTouches[0].pageX;
	endY = e.changedTouches[0].pageY;

	var xrange = endX - startX;
	var yrange = endY - startY;
	if (Math.abs(xrange)>Math.abs(yrange)) {
		if (xrange<0 ) {
			if(moveLeft()) {
				generateOneNumber();
				isGameOver();
			};
		}else if (xrange>0 )  {
			if(moveRight()) {
				generateOneNumber();
				isGameOver();
			};
		}
	}else{
		if (yrange<0 ) {
			if(moveTop()) {
				generateOneNumber();
				isGameOver();
			};
		}else if(yrange>0) {
			if(moveBottom()) {
				generateOneNumber();
				isGameOver();
			};
		}
	}
});
