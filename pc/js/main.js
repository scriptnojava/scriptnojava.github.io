
var bgArr = ["#fbda52","#de6c40","#54943f","#22548c","#fbda52","#22548c","#8c227e","#de6c40","#54943f"];
var conArr = ["sun lounger","floor lamp","dining table","love seat","chair","pouffe","armchair","coming soon","coming soon"];
var timerLineMove = null;
var totalIndex = 0;
totalInit();
function totalInit(){
	colorSet(data[0].textColor);
	createHspan("gae aulenti",document.querySelector(".title_clock"),data[0].textColor);
	midContentShow();
	clockMove("#f00");
}

/*function changeColor(color){
	$(".title_clock")
}*/

function createClock(){
	var clock = document.querySelector("#clock_show svg");
	var base = 0;
	for (var i = 30; i <= 300; i++) {
		var line = document.createElementNS("http://www.w3.org/2000/svg","line");
		var x1 = 0;
		var y1 = 0;
		var x2 = 0;
		var y2 = 0;
		line.setAttribute("deg",base);
		var hudu = 2*Math.PI/360*base;
		x1 =300-Math.cos(hudu)*280;
		y1 = 300-Math.sin(hudu)*280;

		if (i%30) {
			x2= 300-Math.cos(hudu)*290;
			y2 = 300-Math.sin(hudu)*290;
			line.setAttribute("stroke-width",1);
			line.setAttribute("stroke","#ccc");
		}else{
			x2= 300-Math.cos(hudu)*295;
			y2 = 300-Math.sin(hudu)*295;
			line.setAttribute("stroke-width",3);
			line.setAttribute("stroke","#555555");
		}
		line.setAttribute("x1",x1);
		line.setAttribute("y1",y1);
		line.setAttribute("x2",x2);
		line.setAttribute("y2",y2);


		base+=1;
		clock.appendChild(line);
	}
}
createClock();
createMidCanvas();
function doHover(){
		$(".bgWater").animate({ 
			width: "32px",
			height: "32px",
			left:"-6px",
			top:"-6px",
			opacity:0  
		}, 1000,"linear",function(){
			this.style.width = "20px"
			this.style.height = "20px"
			this.style.left= "0px"
			this.style.top = "0px"
			this.style.opacity = 0.8
		}).css("display","block");
}

function createMidCanvas(){
	var canvas = document.querySelector(".midCircle canvas");
	var span = document.querySelector(".midCircle");

	var context = canvas.getContext("2d");
	context.moveTo(span.offsetWidth/2+0.5,span.offsetHeight/2+0.5);
	context.lineTo(0+0.5,span.offsetWidth/2+0.5);
	context.strokeStyle = "transparent";
	context.stroke();
}

var canvasMidCircle = document.querySelector(".midCircle canvas");
canvasMidCircle.timer = null;
canvasMidCircle.src = 180;

var degMove = 0;
//360,350
$("#spot").on("mousedown",function(ev){
	clearInterval(timerLineMove);
	//console.log(ev.clientX,ev.clientY)
		$("#knob").css("transition","unset")


	//var beginX = ev.clientX;
	//var beginY = ev.clientY;
	$(document).on("mousemove",function(ev){
		var difX = ev.clientX - 360;
		var difY =  350 -ev.clientY;
		if (difX < 280) {
			 degMove = Math.atan(difY/(280-ev.clientX+360))/Math.PI*180;

		}else{
			//console.log(difX)
			//console.log("else")
			 degMove = 180-Math.atan(difY/(difX-280))/Math.PI*180;

		}
		//console.log(degMove/30)
		//degMove = Math.ceil(degMove/30)*30
		//console.log(degMove)
		//deg = degMove;
		$("#knob").css("transform","rotate("+degMove+"deg)")

		/* var per
		console.log(document.documentElement.clientWidth)*/
	})
	$(document).on("mouseup",function(){

		$(document).off("mousemove");
		$(document).off("mouseup");
		$("#knob").css("transition","1s")
		//console.log(degMove);
		degMove = Math.ceil(degMove/30)*30
		$("#knob").css("transform","rotate("+degMove+"deg)");

		deg = degMove-30<0?0:degMove-30;

/*		console.log(degMove);
		degMove = Math.ceil(degMove/30)*30
		totalIndex =  Math.ceil(degMove/30) 
		//console.log(totalIndex)

		if(-45<degMove && degMove <0 ){
			//console.log("hhh")
			degMove = 0;
		}else if(-90<degMove && degMove <-45){
			degMove = 270;
		}
		//console.log(degMove)
		deg = degMove+deg;
		$("#knob").css("transform","rotate("+deg+"deg)")*/
		//lineColorSet();

			//midContentHide();
			if(Math.ceil(degMove/30)-1 <0)
				totalIndex =1
			else
				totalIndex =  Math.ceil(degMove/30)

			lineColorSet()
			//midContentShow();
			//bgCircleMove();
			//picDis();
		clockMove();

	})
})


midBgWaterMove();
function midBgWaterMove(){
	var spot = document.querySelector("#spot");
	spot.timer  = setInterval(doHover, 1000);
		var bgwater  = document.querySelector(".bgWater");

	spot.addEventListener("mouseover",function(){
	//	var canvasMidCircle = document.querySelector(".midCircle canvas");
		//console.log(spot.timer)
		clearInterval(spot.timer);
			bgwater.style.display = "none";

	});
	spot.addEventListener("mouseout",function(){
	//	var canvasMidCircle = document.querySelector(".midCircle canvas");
		//console.log(spot.timer)

		spot.timer  = setInterval(doHover, 1000);


			//clearInterval(spot.timer);
	});

}
$(".midCircle").on("mouseenter",function(){
		clearInterval(canvasMidCircle.timer);
		$(".midCircle div").css("borderColor","#000");
	var context = canvasMidCircle.getContext("2d");
	 canvasMidCircle.timer = setInterval(function(){
	 	canvasMidCircle.src+=10;
	 	if(canvasMidCircle.src == 550){
	 		clearInterval(canvasMidCircle.timer);
	 		return;
	 	}
		context.beginPath();
		context.fillStyle=data[totalIndex].textColor;
		context.moveTo(20,20)
		context.arc(20,20,20,Math.PI,canvasMidCircle.src*Math.PI/180,false);
		context.closePath();
		context.fill();
	},16);
})

$(".midCircle").on("mouseleave",function(){
	clearInterval(canvasMidCircle.timer);
	var context = canvasMidCircle.getContext("2d");
	canvasMidCircle.timer = setInterval(function(){
		context.clearRect(0,0,40,40);
		if (canvasMidCircle.src==180) {
			$(".midCircle div").css("borderColor",data[totalIndex].textColor);
			clearInterval(canvasMidCircle.timer);
			colorSet(data[totalIndex].textColor)
			//colorSet(data[totalIndex].textColor)
			return;
		}
		context.beginPath();
		context.moveTo(20,20)
		context.fillStyle=data[totalIndex].textColor;
		context.arc(20,20,20,Math.PI,canvasMidCircle.src*Math.PI/180,false);
		context.closePath();
		context.fill();
		canvasMidCircle.src-=10;
	},16)
})

var show = document.querySelector(".right_wrap");
var span = document.querySelector("#goods ul")
var wrap = document.querySelector("#goods")
var totalWrap = document.getElementById('total_wrap');
var shopBg = document.querySelector("#landShow");
var showOnoff = true;
var one = true;
show.onclick = function (ev) {
	var timer = null;
	var num = 0;
	var time = -100;
	if(!one){
		return;
	}
	one = false;
	clearInterval(timerLineMove);
	if (showOnoff) {
	$(this).addClass("rotate");
	clearInterval(timerLineMove);
	}else{
		$(this).removeClass("rotate");
		clockMove("#f00");
	}
	if (showOnoff) {
		wrap.style.display = "block";
		$(shopBg).animate({width:3000,height:3000,borderRadius:3000},1000,"linear",function(){
			span.style.display = "block";
			var imgs = document.querySelectorAll(".goodsImg img");
			for (var i = 0; i < imgs.length; i++) {
				setTimeout(function(){
					$(imgs[num++]).animate({top:0},500,"linear");
					//mTween(imgs[num++],{top:0},500,"linear")
				},time+=100)
			}
			one = true;
		})	
	}else{			
		var imgs = document.querySelectorAll(".goodsImg img");
		for (var i = 0; i < imgs.length; i++) {
			setTimeout(function(){
				if(num==imgs.length-1){
					span.style.display = "none";
					$(imgs[num++]).animate({top:220},100,"linear",function(){
						span.style.display = "none";
						$(shopBg).animate({width:1,height:1,borderRadius:1,opacity:1},1000,"linear")
									one = true;

						//mTween(shopBg,{width:1,height:1,borderRadius:1,opacity:1},1000,"linear")
					})
				}else{
					$(imgs[num++]).animate({top:220},500,"linear")
					//mTween(imgs[num++],{top:220},500,"linear");
				}

			},time+=100)
		}
	}

	showOnoff = !showOnoff
}
document.onmousedown =function(ev){
	return false;
}


liOverMake();

//midKnobMove();
/*中间小圆点的背景的旋转，每次旋转30deg*/
function midKnobMove(){
	var deg = 0;
	//console.log(deg)

	setInterval(function(){
	if(deg==300)
		deg=0
		$("#knob").css("transform","rotate("+deg+"deg)")
			deg+=30;
	},5000)
} 

var bgOff = true;

function bgCircleMove(){
	//console.log(totalIndex)
	if(bgOff){
		bgOff = false;
		midContentHide();
	

	$("#bg_color div").eq(0).css({"display":"block","backgroundColor":data[totalIndex].bgColor}).animate({width:1000,height:1000},1000,"linear")
	$("#bg_color div").eq(1).css({"display":"block","backgroundColor":data[totalIndex].bgColor}).animate({width:1000,height:1000},1000,"linear")
	$("#bg_color div").eq(2).css({"display":"block","backgroundColor":data[totalIndex].bgColor}).animate({width:1000,height:1000},1000,"linear")
	$("#bg_color div").eq(3).css({"display":"block","backgroundColor":data[totalIndex].bgColor}).animate({width:1000,height:1000},1000,"linear")

	$("#bg_color div").eq(4).css({"display":"block","backgroundColor":data[totalIndex].bgColor}).animate({width:1000,height:1000},1000,"linear")

	$("#bg_color div").eq(5).css({"display":"block","backgroundColor":data[totalIndex].bgColor}).animate({width:1000,height:1000},1000,"linear",function(){
		$("#total_wrap").css("backgroundColor",data[totalIndex].bgColor).css("backgroundImage","unset")
		$("#bg_color div").css({"display":"none","width":1,"height":1})
		createHspan(data[totalIndex].text,document.querySelector(".title_clock"),data[totalIndex].textColor);
		midContentShow();
		picChange(data[totalIndex].imgName);
		colorSet(data[totalIndex].textColor)
		bgOff = true;	
		/*totalIndex++;
		if (totalIndex>=9) {
			totalIndex=0;
		}	*/
	})
	}else{
		return;
	}

}



var deg = 0;
var lines = document.getElementsByTagNameNS("http://www.w3.org/2000/svg","line");
//clockMove("#f00");
function clockMove(){
		//console.log(111)

	clearInterval(timerLineMove);
	timerLineMove = setInterval(function(){
		totalIndex++;
		if (totalIndex>9) {
			totalIndex=0;
		}
		if(deg==270){
		lineColorBack();
		}else{
			lineColorSet("#f00");
		}
	},5000)
}
function lastBgShow(){
	$("#total_wrap").css("backgroundImage","url(img/about/bg-gae.jpg)")
	$("#bg_color div").css({"display":"block","backgroundColor":"f00","width":1000,"height":1000}).animate({width:1,height:1},500,"linear",function(){
		$(this).css("display","none");
		createHspan("gae aulenti",document.querySelector(".title_clock"),data[0].textColor);
		midContentShow();

	
	})
}

function lineColorBack(color,lineStart){
	var len = lines.length-1;	
	var timerLineBack = setInterval(function(){
		if (len==0) {
			clearInterval(timerLineBack);
			deg = 0;
			$("#knob").css("transform","rotate("+deg+"deg)")

			lastBgShow();
/*			$("#total_wrap").css("backgroundColor",data[totalIndex].bgColor).css("backgroundImage","url(img/about/bg-gae.jpg)")
			picDis();
			totalInit();
			clockMove("#f00");*/
			picDis();
			//totalInit();
		}
		if(len%30){
		lines[len--].setAttribute("stroke","#ccc");
		}else{
			lines[len--].setAttribute("stroke","#555555");
		}
	},16)
}

function lineColorSet(color){
	var end = deg ;
	var before = deg;
	var times = 29;
	deg+=30;
	var timerLineBack = setInterval(function(){
		if (times==0) {
			clearInterval(timerLineBack);
			$("#knob").css("transform","rotate("+deg+"deg)")
			//midContentHide();
			bgCircleMove();
			picDis();
			for (var i = 0; i < before; i++) {
				lines[i].setAttribute("stroke",data[totalIndex].textColor);
			}
			for (var i = before+30; i < 270; i++) {
				//lines[i].setAttribute("stroke",data[totalIndex].textColor);
				if(i%30){
		lines[i].setAttribute("stroke","#ccc");
		}else{
			lines[i].setAttribute("stroke","#555555");
		}
			}

		}
		lines[end++].setAttribute("stroke",data[totalIndex].textColor);
		times--;
	},50)
}

function colorSet(color){
	var span = document.querySelector(".midCircle span");
	var div =  document.querySelector(".midCircle div");
	span.style.backgroundColor = color;
	div.style.borderColor = color;
}


lineMove(30);
function lineMove(deg){
	var clock = document.querySelector("#clock_show svg")
	var lines = clock.getElementsByTagName('line');
	for (var i = 0; i < lines.length; i++) {
		if(Math.abs(lines[i].getAttribute("deg")-deg) <15){
			//console.log(lines[i])
		} 
	}
	
}

function liOverMake(){
	$(".liCircle").each(function(index,item){
		//console.log(index,item)
		$(item).css("backgroundColor",data[index+1].bgColor);
		//console.log(this)
		createHspan(data[index+1].text,item.parentNode.children[0],data[index+1].textColor);
	})

}

function picDis(){
	var img = document.querySelector(".img_show img");
	img.className = "imgDisappear";
}

function picChange(str){
	var img = document.querySelector(".img_show img");
	img.className = "";
	img.src = str;
}

function midContentHide(){
	var midInfo = document.getElementById("mid_info");
	var title = midInfo.querySelector("h3");
	$(title).animate({top:-180,opacity:0},1000,"linear")
	//mTween(title,{top:-180,opacity:0},1000,"linear");
	var spans1 = midInfo.querySelectorAll(".upDiv span")
	var spans2 = midInfo.querySelectorAll(".downDiv span")
		for (var i = 0; i < spans1.length; i++) {
			spans1[i].className = "spanMoveBack";
		}
		
	if(spans2.length){
		
		for (var i = 0; i < spans2.length; i++) {
			spans2[i].className = "spanMoveBack";
		}

	}
		var p = midInfo.querySelector("p");
		$(p).animate({top:50,opacity:0},1000,"linear")
		//mTween(p,{top:50,opacity:0},1000,"linear")
		var div = midInfo.querySelector(".midCircle");
				$(div).animate({top:150,opacity:0},1000,"linear")

		//mTween(div,{top:150,opacity:0},1000,"linear")
}


function midContentShow(){
	var midInfo = document.getElementById("mid_info");
	var title = midInfo.querySelector("h3");
	$(title).animate({top:-160,opacity:1},1000,"linear")
/*	mTween(title,{top:-160,opacity:1},1000,"linear",function(){

	});*/
	var spans1 = midInfo.querySelectorAll(".upDiv span")
	var spans2 = midInfo.querySelectorAll(".downDiv span")
	var i1 = 0;
	var i2 = 0;
	var timer1 = setInterval(function(){
		if(i1==spans1.length){
			clearInterval(timer1);
			return;
		}
		spans1[i1++].className = "spanMoveUp";
	},100)
	if(spans2.length){
		var timer2 = setInterval(function(){
			if(i2==spans2.length){
				clearInterval(timer2);
				return;
			}
			spans2[i2++].className = "spanMoveDown";
		},100)
	}
			var p = midInfo.querySelector("p");
			$(p).animate({top:60,opacity:1},1000,"linear");
		var div = midInfo.querySelector(".midCircle");
		$(div).animate({top:140,opacity:1},1000,"linear");
}



function createHspan(str,parent,color){
	var firstDiv = parent.getElementsByTagName('div')[0];
	var secDiv = parent.getElementsByTagName('div')[1];
	firstDiv.innerHTML = "";
	secDiv.innerHTML = "";
	var arr = str.split(" ");
	if (arr.length==2) {
	for (var i = 0; i < arr[0].length; i++) {
			var span = document.createElement("span");
			span.innerHTML = arr[0][i];
			span.style.color = color;
			firstDiv.appendChild(span);
		}
	for (var i = 0; i < arr[1].length; i++) {
			var span = document.createElement("span");
			span.innerHTML = arr[1][i];
			span.style.color = color;
			secDiv.appendChild(span);
		}
	}else{
		firstDiv.style.height = "60px"
		for (var i = 0; i < arr[0].length; i++) {
			var span = document.createElement("span");
			span.innerHTML = arr[0][i];
			span.style.color = color;
			secDiv.appendChild(span);
		}
	}
	
}


