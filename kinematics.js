// JavaScript Document

var VElements = 6;
var VLength = 30;
var VStyle = '';

var mouseX, mouseY, baseX, baseY, centerX, centerY = 0;
var mouseMoved = false;
var vectors = [];
var allowMoveUpdate = true;
var colors = ['000', 'f00', '0f0', '00f', '0ff', 'ff0', 'f0f'];

$(function() {
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	centerX = Math.round(windowWidth/2);
	centerY = Math.round(windowHeight/2);
	
	$("#canvas").width(windowWidth);
	$("#canvas").height(windowHeight);
	$("#centerDot").css('left', centerX - 5);
	$("#centerDot").css('top', centerY - 5);
	
	baseX = centerX;
	baseY = centerY;
	
	var touchY = baseY;
	var touchX = baseX + (VLength * VElements);
	var mouseTouched = false;

	$(window).mousemove(function(e) {
		if((Math.abs(mouseX - e.pageX) > 0 && Math.abs(mouseY - e.pageY) > 0) || mouseMoved == false) {
			
			$("#cursorInfoX").html(mouseX);
			$("#cursorInfoY").html(mouseY);
			if(mouseMoved == false) {
				mouseX = e.pageX;
				mouseY = e.pageY;
				createVectors();
			}else if(mouseTouched) {
				if(Math.abs(e.pageX - mouseX) > 1 && Math.abs(e.pageY - mouseY) > 1) {
					mouseX = e.pageX;
					mouseY = e.pageY;
					followVectors();
					moveVectors();
				}
			}else {
				mouseX = e.pageX;
				mouseY = e.pageY;
				if(Math.abs(e.pageX - touchX) < 30 && Math.abs(e.pageY - touchY) < 30) {
					mouseTouched = true;
					followVectors();
					moveVectors();
				}
			}
			mouseMoved = true;
		}
	});
	
	
	
});

function createVectors() {
	vectors[0] = new vector([baseX, baseY], VLength, 0, colors[0]);
	vectors[0].create();
	for(var i = 1; i < VElements; i++) {
		var prevB = vectors[i - 1].getB();
		vectors[i] = new vector([prevB[0], prevB[1]], VLength, 0, colors[i]);
		vectors[i].create();
	}
}


function followVectors() {
	vectors[vectors.length - 1].follow([mouseX, mouseY]);
	vectors[vectors.length - 1].draw();
	for(var i = vectors.length - 2; i >= 0; i--) {
		vectors[i].follow(vectors[i + 1].getA());
		vectors[i].draw();
	}
}

function moveVectors() {
	vectors[0].setBase([centerX, centerY]);
	vectors[0].draw();
	for(var i = 1; i < vectors.length; i++) {
		vectors[i].setBase(vectors[i-1].getB());
		vectors[i].draw();
	}
}

class vector {
	
	constructor(base, length, angle, color) {
		this.ID = Math.floor(Math.random() * 9999) + 1;  
		this.color = color;
		this.aX = Math.round(base[0]);
		this.aY = Math.round(base[1]);
		this.angle = angle;
		this.length = length;
		this.element;
		this.createPointB();
	}
	
	createPointB() {
		this.bX = Math.round(Math.cos(this.angle) * this.length + this.aX);
		this.bY = Math.round(Math.sin(this.angle) * this.length + this.aY);
	}
	
	create() {
		var line = "\
			<line \
				id='"+this.ID+"' \
				x1='"+this.aX+"' \
				x2='"+this.bX+"' \
				y1='"+this.aY+"' \
				y2='"+this.bY+"' \
				style='stroke:#"+this.color+";stroke-width:2;' \
			/> \
		";
		var html = $("#canvas").html();
		$("#canvas").html(html + line);
		
	}
	
	getB() {
		return [this.bX, this.bY];
	}
	
	getA() {
		return [this.aX, this.aY];
	}
	
	
	follow(coordinates) {
		var x = coordinates[0];
		var y = coordinates[1];
		var dY = (y - this.aY);
		var dX = (x - this.aX);
		if(dX < 0 && dX > -10) {
			dX = -10;
			//this.angle = Math.atan(dY/dX);
		} else if(dX >= 0 && dX < 10) {
			dX = 10;
			//this.angle = Math.atan(dY/dX);
		}else {
			this.angle = Math.atan(dY/dX);
		}
		
		
		this.bX = x;
		this.bY = y;
		this.aY = y - Math.round(Math.sin(this.angle) * this.length);
		this.aX = x - Math.round(Math.cos(this.angle) * this.length);
	}
	
	setBase(coordinates) {
		var x = coordinates[0];
		var y = coordinates[1];
		var xDiff = this.aX - x;
		var yDiff = this.aY - y;
		this.aX = this.aX - xDiff;
		this.aY = this.aY - yDiff;
		this.bX = this.bX - xDiff;
		this.bY = this.bY - yDiff;
	}
	
	draw() {
		$("#canvas #"+this.ID).remove();
		var line = "\
			<line \
				id='"+this.ID+"' \
				x1='"+this.aX+"' \
				x2='"+this.bX+"' \
				y1='"+this.aY+"' \
				y2='"+this.bY+"' \
				style='stroke:#"+this.color+";stroke-width:2;' \
			/> \
		";
		var html = $("#canvas").html();
		$("#canvas").html(html + line);
	}
}

