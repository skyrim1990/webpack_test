var ComponentManagement = function(){

	var data = [];
	return {
		register: function(p_name, p_func){
			data.push( { name: p_name, func: p_func } );
		},
		get: function(p_name){
			var obj = _.find(data, {name: p_name});
			if( obj == undefined){
				return undefined;
			}
			return obj.func;
		}
	}

}();

window.onload = function(){
	var routes = [
		{
			path: '/:section', component: viewMain,
			children: [
				{path: 'prototype_v1', component: viewPrototypeV1 }
			],
			beforeEnter: function(to, from, next){
				next();
			}
		}
	]

	const router = new VueRouter({
		routes
	});

	const app = new Vue({router}).$mount("#app");
	location.href = "#/mainView/prototype_v1";
};
