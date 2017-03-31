//sideMenu.js
var SideMenu = Vue.extend({
	data: function(){
		return{ 
			menus: MENUS,
			current_menu:		undefined,
			current_sub:		undefined,
			last_menu: 			undefined,
			last_sub: 			undefined
		}
	},

	methods: {
		openSubMenu: function(menu){
			this.last_menu = this.current_menu;
			this.current_menu.active = false;
			this.current_menu = menu;
			this.current_menu.active = true;
		},
		activeSub: function(sub){
			this.last_sub = this.current_sub;
			this.current_sub.active = false;
			this.current_sub = sub;
			this.current_sub.active = true;
		},
		undo: function(){
			if(this.last_menu == undefined || this.last_sub == undefined){
				return;
			}else{
				this.openSubMenu(this.last_menu);
				this.activeSub(this.last_sub);
			}
		}
	},
	mouted: function(){

	},
	beforeMount: function(){
		this.current_menu = this.menus[0];
		this.current_sub = this.menus[0].subs[0];
		this.current_menu.active = true;
		this.current_sub.active = true;
	},

	template:`
		<div id="left_menu">
			<div v-for="menu in menus" class="panel panel-primary" 
																	@click="openSubMenu(menu)">

			<div class="panel-heading">
				<h3 class="panel-title">{{menu.name}}</h3>
			</div>

			<div v-if="menu.active">
				<div v-for="sub in menu.subs">
					<a v-bind:href=sub.url	class="list-group-item" v-bind:class="{active: sub.active}"
																	@click="activeSub(sub)">{{sub.name}}</a>
				</div>
			</div>
			</div>
		</div>
	`
});
