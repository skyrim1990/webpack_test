var viewPrototypeV1 = {
	data: function(){
		return{
		
		}
	},
	methods: {
		open_view: function(name, vari, callBack){
			if( typeof(callBack) == "function" ){
				callBack(vari);
			}
			this.view[name] = true;
		}
	},
	components: {
		//'my_select_add': my_select_add()
	},
	mounted: function(){

		var a = function(){

			var p_f = document.getElementById("painter_field"); 
			var ctx = p_f.getContext('2d');

			//AddMouseEvent(ctx);
			global_listener();

			var app = new App(ctx);
			app.render();

			var im_c = ImageCenter;
			im_c.load( sample_image_list() );
		
			var red_img = im_c.get("red");
			if(red_img != undefined){
				ctx.drawImage(red_img, 10, 10);
			}

			AddMouseListener(p_f);
			
			var map = Map(5, 1, 16, 16);

			window.setTimeout(function(){
				map.render(ctx);
			}, 1000);

			/*	
			window.setTimeout(function(){

				var red_img = im_c.get("red");
				if(red_img != undefined){
					ctx.drawImage(red_img, 10, 10);
				}

			}, 1000);
			*/

			//ctx.fillStyle='rgba(0,255,0,0.5)';
			//ctx.fillRect(50, 50, 100, 100);
	
		}();

	},
	template: `
		<div id="prototype_v1">

			<canvas id="painter_field" width="800" height="600"></canvas>

			<div id="panel"></div>

		</div>
	`, 
}

