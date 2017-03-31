'use strict';

var ComponentManagement = function () {

	var data = [];
	return {
		register: function register(p_name, p_func) {
			data.push({ name: p_name, func: p_func });
		},
		get: function get(p_name) {
			var obj = _.find(data, { name: p_name });
			if (obj == undefined) {
				return undefined;
			}
			return obj.func;
		}
	};
}();

window.onload = function () {
	var routes = [{
		path: '/:section', component: viewMain,
		children: [{ path: 'prototype_v1', component: viewPrototypeV1 }],
		beforeEnter: function beforeEnter(to, from, next) {
			next();
		}
	}];

	var router = new VueRouter({
		routes: routes
	});

	var app = new Vue({ router: router }).$mount("#app");
	location.href = "#/mainView/prototype_v1";
};
"use strict";

var MENUS = [{ id: 0, name: "原型", active: false, subs: [{ id: 0, name: "原型1", active: true, url: "#/mainView/prototype_v1" }] }
/*
{id: 100, name: "物业服务", active: false, subs: [
	{id: 100, name: "1.物业维修", active: false, url: "#/property_management/mainView/repair"},
	{id: 101, name: "2.物业投诉", active: false, url: "#/property_management/mainView/complaint"},
	{id: 102, name: "3.账单推送", active: false, url: "#/property_management/mainView/bill"},
	{id: 103, name: "4.物业呼叫", active: false, url: "#/property_management/mainView/contact"},
	{id: 104, name: "5.物业通知", active: false, url: "#/property_management/mainView/announcement"},
	{id: 105, name: "6.社区活动", active: false, url: "#/property_management/mainView/event"},
	{id: 106, name: "7.家有喜事", active: false, url: "#/property_management/mainView/good_news"},
	{id: 107, name: "8.物品借用", active: false, url: "#/property_management/mainView/borrow"},
]},
*/
];
"use strict";

window.canvas_position = function () {
	return { x: 227, y: 82 };
}();

function App(context) {
	var ctx = context;
	return {
		render: function render() {
			ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
			ctx.fillRect(50, 50, 10, 10);
		}
	};
}

function sample_image_list() {
	return [{ name: "black", url: "../images/black.png" }, { name: "blue", url: "../images/blue.png" }, { name: "green", url: "../images/green.png" }, { name: "purple", url: "../images/purple.png" }, { name: "red", url: "../images/red.png" }, { name: "yellow", url: "../images/yellow.png" }];
}

function TileSet() {
	return {
		WALL: { color: 'red' },
		FLOOR: { color: 'green' },
		DOOR: { color: 'blue' },
		ITEM: { color: 'purple' }
	};
}

function Tile(p_x, p_y, p_w, p_h, p_type) {
	return {
		x: p_x,
		y: p_y,
		w: p_w,
		h: p_h,
		type: p_type
	};
}

function Map(p_width, p_height, p_tile_width, p_tile_height) {
	var gen_data = function gen_data() {
		var x_range = _.range(p_width);
		var y_range = _.range(p_height);
		var data = [];
		_.each(y_range, function (y) {
			data[y] = [];
			_.each(x_range, function (x) {
				data[y][x] = Object.create({});
				data[y][x].type = TileSet().WALL;
				data[y][x].x = x * p_tile_width;
				data[y][x].y = y * p_tile_height;
			});
		});
		return data;
	};
	return {
		width: p_width,
		height: p_height,
		data: gen_data(),
		get: function get(x, y) {
			return this.data[y][x];
		},
		set: function set(x, y, tile_obj) {
			this.data[y][x] = obj;
		},
		render: function render(ctx) {

			_.each(this.data, function (y) {
				_.each(y, function (x) {
					console.log(" x: " + x.x + " y: " + x.y);
					//draw image here
					var img = ImageCenter.get("red");
					if (img != undefined) {
						ctx.drawImage(img, x.x, x.y);
					}
					//draw image end
				});
			});
		}
	};
}

function global_listener() {}

function AddMouseListener(obj) {

	function showCoords(evt) {
		var x = evt.clientX - canvas_position.x;
		var y = evt.clientY - canvas_position.y;
		console.log(" X: " + x + " Y: " + y);
	}

	return function () {
		obj.onmousedown = showCoords;
		obj.onmouseup = showCoords;
		obj.addEventListener('mouseup', function () {
			console.log("mouse up !");
		});
		obj.addEventListener('mousedown', function () {
			console.log("mouse down !");
		});
	}();
}

window.ImageCenter = function () {
	var source_list;
	var img_list;

	//image list sample
	//{ name: "red.png", obj: {}, loaded: true }

	return {

		load: function load(image_list_param) {

			img_list = _.map(image_list_param, function (p) {
				var obj = Object.create({});

				obj.name = p.name;
				obj.obj = undefined;
				obj.loaded = false;

				var img = new Image();

				img.addEventListener('load', function () {
					console.log(p.name + " img loaded !");
					obj.loaded = true;
					obj.obj = this;
				}, false);

				img.src = p.url;

				return obj;
			});
		},

		log: function log() {
			_.each(img_list, function (a) {
				if (!a.loaded) {
					console.log(a.name + " not yet loaded !");
				}
			});
		},

		get: function get(image_name) {
			var img = _.find(img_list, function (i) {
				return i.name == image_name;
			});
			if (img != undefined) {
				return img.obj;
			}
			return;
		}

	};
}();

//	var test = function(){
//		var im_c = ImageCenter;
//		im_c.load( sample_image_list );
//		im_c.log();
//		var a = im_c.get("red");
//	}();
"use strict";

//sideMenu.js
var SideMenu = Vue.extend({
	data: function data() {
		return {
			menus: MENUS,
			current_menu: undefined,
			current_sub: undefined,
			last_menu: undefined,
			last_sub: undefined
		};
	},

	methods: {
		openSubMenu: function openSubMenu(menu) {
			this.last_menu = this.current_menu;
			this.current_menu.active = false;
			this.current_menu = menu;
			this.current_menu.active = true;
		},
		activeSub: function activeSub(sub) {
			this.last_sub = this.current_sub;
			this.current_sub.active = false;
			this.current_sub = sub;
			this.current_sub.active = true;
		},
		undo: function undo() {
			if (this.last_menu == undefined || this.last_sub == undefined) {
				return;
			} else {
				this.openSubMenu(this.last_menu);
				this.activeSub(this.last_sub);
			}
		}
	},
	mouted: function mouted() {},
	beforeMount: function beforeMount() {
		this.current_menu = this.menus[0];
		this.current_sub = this.menus[0].subs[0];
		this.current_menu.active = true;
		this.current_sub.active = true;
	},

	template: "\n\t\t<div id=\"left_menu\">\n\t\t\t<div v-for=\"menu in menus\" class=\"panel panel-primary\" \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t@click=\"openSubMenu(menu)\">\n\n\t\t\t<div class=\"panel-heading\">\n\t\t\t\t<h3 class=\"panel-title\">{{menu.name}}</h3>\n\t\t\t</div>\n\n\t\t\t<div v-if=\"menu.active\">\n\t\t\t\t<div v-for=\"sub in menu.subs\">\n\t\t\t\t\t<a v-bind:href=sub.url\tclass=\"list-group-item\" v-bind:class=\"{active: sub.active}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t@click=\"activeSub(sub)\">{{sub.name}}</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t"
});
"use strict";
"use strict";

var viewMain = {
	data: function data() {
		return {};
	},
	methods: {},
	mounted: function mounted() {
		window.sideMenu = new SideMenu().$mount("#left_menu");
	},
	components: {},
	template: "\n\t<div id=\"main_page\">\n\n\t\t<!-- header begin -->\n\t\t<div id=\"header\">\n\t\t</div>\n\t\t<!-- header end -->\n\n\t\t<div id=\"left_menu\"></div>\n\n\t\t<!-- header begin -->\n\t\t<div id=\"right_main\">\n\t\t\t<router-view></router-view>\n\t\t</div>\n\t\t<!-- header end -->\n\n\t</div>\n"
};
"use strict";

var viewPrototypeV1 = {
	data: function data() {
		return {};
	},
	methods: {
		open_view: function open_view(name, vari, callBack) {
			if (typeof callBack == "function") {
				callBack(vari);
			}
			this.view[name] = true;
		}
	},
	components: {
		//'my_select_add': my_select_add()
	},
	mounted: function mounted() {

		var a = function () {

			var p_f = document.getElementById("painter_field");
			var ctx = p_f.getContext('2d');

			//AddMouseEvent(ctx);
			global_listener();

			var app = new App(ctx);
			app.render();

			var im_c = ImageCenter;
			im_c.load(sample_image_list());

			var red_img = im_c.get("red");
			if (red_img != undefined) {
				ctx.drawImage(red_img, 10, 10);
			}

			AddMouseListener(p_f);

			var map = Map(5, 1, 16, 16);

			window.setTimeout(function () {
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
	template: "\n\t\t<div id=\"prototype_v1\">\n\n\t\t\t<canvas id=\"painter_field\" width=\"800\" height=\"600\"></canvas>\n\n\t\t\t<div id=\"panel\"></div>\n\n\t\t</div>\n\t"
};
//# sourceMappingURL=all.js.map
