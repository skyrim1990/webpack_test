window.onload = function(){
	console.log(" ready !");
	app();
}

var click_points = [];
var select_rects = [];

COLORS = {
	WHITE : 'rgb(255, 255, 255)',
	RED : 'rgb(255,0 ,0)',
	GREEN : 'rgb(0, 255, 0)', 
	BLUE : 'rgb(0, 0, 255)',
	YELLOW : 'rgb(255, 255, 0)',
	BLACK : 'rgb(0, 0, 0)',
	GREY :'rgb(80, 80, 80)' 
}
function draw_building(ctx, x, y){

	stroke_draw_iso(ctx, x, y, 64, 32, COLORS.GREY);

	stroke_draw_iso(ctx, x+8, y, 48, 24, COLORS.GREY);
	stroke_draw_iso(ctx, x+8, y-60, 48, 24, COLORS.GREY);

	ctx.fillStyle = COLORS.WHITE;
	ctx.moveTo(x + 8 , y - 48);
	ctx.lineTo(x + 8  , y + 12);
	ctx.lineTo(x + 32, y + 24);
	ctx.lineTo(x + 32, y - 36);
	ctx.fill();

	ctx.fillStyle = COLORS.WHITE;
	ctx.moveTo(x + 32, y - 36);
	ctx.lineTo(x + 32, y + 24);
	ctx.lineTo(x + 56  , y + 12);
	ctx.lineTo(x + 56 , y - 48);
	ctx.fill();

	stroke_draw_iso(ctx, x+8, y-60, 48, 24, COLORS.GREY);
	ctx.moveTo(x + 8 , y - 48);
	ctx.lineTo(x + 8  , y + 12);
	ctx.stroke();

	ctx.moveTo(x + 32, y + 24);
	ctx.lineTo(x + 32, y - 36);
	ctx.stroke();

	ctx.moveTo(x + 56  , y + 12);
	ctx.lineTo(x + 56 , y - 48);
	ctx.stroke();

}

function draw_hole(ctx, x, y){
	fill_draw_iso(ctx, x+8, y+8, 48, 24, COLORS.GREY);
	stroke_draw_iso(ctx, x, y, 64, 32, COLORS.GREY);
	ctx.fillStyle = COLORS.GREY;
	ctx.moveTo(x + 32, y);
	ctx.lineTo(x + 32, y + 10);
	ctx.stroke();
}

function draw_full_point(ctx, x, y){
	fill_draw_iso(ctx, x, y, 2, 2, COLORS.BLACK);
}

function draw_hollow_point(ctx, x, y){
	stroke_draw_iso(ctx, x, y, 2, 2, COLORS.BLACK);
}

function draw_full(ctx, x, y){
	fill_draw_iso(ctx, x, y, 64, 32, COLORS.GREY);
}

function draw_blank(ctx, x, y){
	stroke_draw_iso(ctx, x, y, 64, 32, COLORS.GREY);
}

function stroke_draw_iso(ctx, x, y, w, h, c ){
	ctx.beginPath();
	ctx.fillStyle = c;
	ctx.moveTo( x      , y + h/2 );
	ctx.lineTo( x + w/2, y );
	ctx.lineTo( x + w     , y + h/2 );
	ctx.lineTo( x + w/2, y + h );
	ctx.lineTo( x , y + h/2 );
	ctx.stroke();
}

function fill_draw_iso(ctx, x, y, w, h, c ){
	ctx.beginPath();
	ctx.fillStyle = c;
	ctx.moveTo( x      , y + h/2 );
	ctx.lineTo( x + w/2, y );
	ctx.lineTo( x + w     , y + h/2 );
	ctx.lineTo( x + w/2, y + h );
	ctx.fill();
}

function app(){
	var canvas = document.getElementById("sample");
	if(canvas.getContext){
		var ctx = canvas.getContext('2d');

		//ctx.fillStyle = "rgba(200, 200, 200, 0.5)" 
		//ctx.fillStyle = COLORS.RED;
		//ctx.fillRect( 10, 10, 50, 50);

		//fill_draw_iso(ctx, 100, 100, 64, 32, COLORS.GREEN);
		//fill_draw_iso(ctx, 100 + 32, 100 + 16, 64, 32, COLORS.RED);

		//stroke_draw_iso(ctx, 100, 100, 64, 32, COLORS.BLACK);
		//stroke_draw_iso(ctx, 100 + 32, 100 + 16, 64, 32, COLORS.BLACK);

		//stroke_draw_iso(ctx, 200, 200, 64, 32, COLORS.BLACK);

		//draw_full(ctx, 100 + 32 * 4, 100 + 16 * 4);
		//draw_blank(ctx, 100 + 32 * 6, 100 + 16 * 6);
		//draw_hole(ctx, 100 + 32 * 8, 100 + 16 * 8);
		//draw_building(ctx, 100 + 32 * 10, 100 + 16 * 10);
		bind_btn();
		window.requestAnimationFrame(draw);
		function draw(){
			draw_map(ctx);

			for(var i=0; i!= click_points.length; i++){
				draw_full_point(ctx, click_points[i].x, click_points[i].y );
			} 
			window.requestAnimationFrame(draw);
		}

		canvas.onmousedown = mouse_down;
	}
}

//0 blank
//1 full
//2 hole
//3 building
CUR_VAL = 0;
function bind_btn(){
	var border_btn = document.getElementById("border_btn");
	var green_btn = document.getElementById("green_btn");
	var blue_btn = document.getElementById("blue_btn");
	var red_btn = document.getElementById("red_btn");

	border_btn.onclick = function(){ CUR_VAL = 0; }
	green_btn.onclick = function(){ CUR_VAL = 1; }
	red_btn.onclick 	= function(){ CUR_VAL = 2; }
	blue_btn.onclick  = function(){ CUR_VAL = 3; }
}
/* 
MAP = [
	[0, 0, 3, 3],
	[1, 0, 0, 3],
	[1, 0, 2, 0],
	[1, 0, 2, 2],
]
*/
 
MAP = [
	[0, 1, 0, 1],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[3, 0, 0, 2],
]



// offset x: 0 y 12 * 4

function draw_map(ctx){
	for(var i =0;i<4;i++  ){
		for(var j=0; j<4; j++){

			var _x  = j*64/2 + i*64/2 + 0;
			var _y  = i*32/2 - j*32/2 + 12 * 4;

			//console.log( _x + ":" + _y );
			(function(){

			if(MAP[i][j] == 0){
				//debugger;
				stroke_draw_iso(ctx, _x, _y, 64, 32, COLORS.BLACK);
				return;
			}
			if(MAP[i][j] == 1){
				fill_draw_iso(ctx, _x, _y, 64, 32, COLORS.GREEN);
				return;
			}
			if(MAP[i][j] == 2){
				fill_draw_iso(ctx, _x, _y, 64, 32, COLORS.RED);
				return;
			}
			if(MAP[i][j] == 3){
				fill_draw_iso(ctx, _x, _y, 64, 32, COLORS.BLUE);
				return;
			}
			})();
			//stroke_draw_iso(ctx, _x, _y, 64, 32, COLORS.BLACK);
		}
	}
}
function get_canvas_position(evt){
	var x = evt.clientX - 2; // - canvas position x 
	var y = evt.clientY - 2; // - canvas position y
	//console.log(x + ":" + y);
	return {x: x, y: y};
}
function get_cal(){

}

function get_map_position(p){

	var p_x = p.x;
	var p_y = p.y;

	var off_x = p.x % 64;
	var off_y = p.y % 32; 

	var origin_x = parseInt( ( (p_x / 64) + (p_y - 64 )/ 32) ); 
	var origin_y = parseInt( ( (p_x / 64) - (p_y - 64 )/ 32) ); 
	
	select_rects.push({x: origin_x, y: origin_y});

	console.log("x:"+ origin_x +":" +"y:"+ origin_y);

	//parseInt( ( (p_y - 12*4 )/ 32) + (p_x / 64) );
	//parseInt( ( (p_y - 12*4 )/ 32) - (p_x / 64) );

	return {x: origin_x, y: origin_y};
}

function mouse_down(e){
	var p = get_canvas_position(e);
	click_points.push({x: p.x, y: p.y});
	var m = get_map_position(p);
	if(m.x >3 || m.y> 3){
		return;
	}
	MAP[m.x][m.y] = CUR_VAL;
}


