window.canvas_position =(function(){
	return {x: 227, y: 82};
})();

function App( context ){
	var ctx = context;
	return {
		render: function(){
			ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
			ctx.fillRect(50, 50, 10, 10);
		}
	}
}

function sample_image_list(){
	return [
		{ name: "black", 	url: "../images/black.png"	},
		{	name: "blue", 	url: "../images/blue.png"  },
		{	name: "green", 	url: "../images/green.png"	},
		{	name: "purple", url: "../images/purple.png"},
		{	name: "red", 		url: "../images/red.png"		},
		{	name: "yellow", url: "../images/yellow.png"}
	];
}

function TileSet(){
	return { 
		WALL:  {color: 'red'},
		FLOOR: {color: 'green'},
		DOOR:  {color: 'blue'},
		ITEM:  {color: 'purple'}
	}
}

function Tile(p_x, p_y, p_w, p_h, p_type){
	return { 
					x: p_x, 
					y: p_y, 
					w: p_w, 
					h: p_h, 
					type: p_type 
				}
}

function Map(p_width, p_height, p_tile_width, p_tile_height){
	var gen_data = function(){
		var x_range = _.range(p_width);
		var y_range = _.range(p_height);
		var data = [];
		_.each(y_range, function(y){
			data[y] = [];
			_.each(x_range, function(x){
				data[y][x] = Object.create({}); 
				data[y][x].type = TileSet().WALL; 
				data[y][x].x = x * p_tile_width; 
				data[y][x].y = y * p_tile_height;
			});
		}); 
		return data;
	}
	return {
		width: p_width,
		height: p_height,
		data: gen_data(),
		get: function(x, y){
			return this.data[y][x]; 
		},
		set: function(x, y, tile_obj){
			this.data[y][x] = obj;
		},
		render: function(ctx){

			_.each(this.data, function(y){
				_.each(y, function(x){
					console.log(" x: " +  x.x + " y: " + x.y );
					//draw image here
					var img = ImageCenter.get("red"); 
					if( img != undefined){
						ctx.drawImage(img, x.x, x.y);
					}
					//draw image end
				});
			}); 

		}
	}
}

function global_listener(){

}

function AddMouseListener(obj){

	function showCoords(evt){
		var x = evt.clientX - canvas_position.x;
		var y = evt.clientY - canvas_position.y;
		console.log(" X: " + x + " Y: " + y );
	}

	return (function(){
		obj.onmousedown = showCoords;
		obj.onmouseup = showCoords;
		obj.addEventListener('mouseup', function(){
			console.log("mouse up !");
		});
		obj.addEventListener('mousedown', function(){
			console.log("mouse down !");
		});
	})();

}


window.ImageCenter = (function(){
	var source_list;
	var img_list;

	//image list sample
	//{ name: "red.png", obj: {}, loaded: true }
	
	return {

		load: function(image_list_param){

			img_list = _.map(image_list_param, function(p){
				var obj = Object.create({});

				obj.name = p.name;
				obj.obj = undefined;
				obj.loaded = false;

				var img = new Image();

				img.addEventListener('load', function(){
					console.log( p.name + " img loaded !" );
					obj.loaded = true;
					obj.obj = this;
				}, false);

				img.src = p.url;

				return obj;
			});

		},

		log: function(){
			_.each(img_list, function(a){
				if(!a.loaded){
					console.log( a.name + " not yet loaded !" );
				}
			});
		},

		get: function(image_name){
			var img =  _.find(img_list, function(i){ return i.name == image_name; });
			if(img != undefined){
				return img.obj;
			}
			return;
		}

	}
})();

//	var test = function(){
//		var im_c = ImageCenter;
//		im_c.load( sample_image_list );
//		im_c.log();
//		var a = im_c.get("red");
//	}();
