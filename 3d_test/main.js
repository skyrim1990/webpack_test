function mouse_click(e){
	//console.log(" mouse click !");
	get_mouse_position(e);
} 
function mouse_over(){
	//console.log("mouse over !");
}
function mouse_out(){
	//console.log("mouse out !");
}
function mouse_up(){
	//console.log("mouse up !");
}
function mouse_down(){
	//console.log("mouse down !");
}
// test begin
function get_mouse_position(event) { 
	var e = event || window.event; 
	var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft; 
	var scrollY = document.documentElement.scrollTop || document.body.scrollTop; 
	var x = e.pageX || e.clientX + scrollX; 
	var y = e.pageY || e.clientY + scrollY; 
	return { 'x': x, 'y': y }; 
} 

// test end
//key
window.onload = function(){
	var canvas = document.getElementById("playground");
	var ctx = canvas.getContext("2d");

	var keysDown = {
		"a": false, "s": false, "d": false, 
		"w": false, " ": false, "Enter": false
	};
	
	ctx.fillStyle = "green"; 
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	canvas.onclick = mouse_click
	canvas.onmouseover = mouse_over;
	canvas.onmouseout = mouse_out;
	canvas.onmousedown = mouse_down;
	canvas.onmouseup = mouse_up;

	addEventListener("mousemove", function(e){
		var pos = get_mouse_position(e);
		console.log("x: " + pos.x  + " y: " + pos.y);
	}, false);

	addEventListener("keydown", function(e){
		//console.log(e.key + ":" + e.code);
		keysDown[e.key] = true;
	}, false);

	addEventListener("keyup", function(e){
		//console.log("key up");
		keysDown[e.key] = false;
	}, false);

}
