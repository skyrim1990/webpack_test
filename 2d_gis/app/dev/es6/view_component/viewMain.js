var viewMain = {
	data: function(){
		return{}
	},
	methods: {
	},
	mounted: function(){
		window.sideMenu = new SideMenu().$mount("#left_menu");
	},
	components: {
	},
template: `
	<div id="main_page">

		<!-- header begin -->
		<div id="header">
		</div>
		<!-- header end -->

		<div id="left_menu"></div>

		<!-- header begin -->
		<div id="right_main">
			<router-view></router-view>
		</div>
		<!-- header end -->

	</div>
`
};
