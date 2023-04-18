angular.module("srmt").config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home.transport',{
		abstart : true,
		url : '/controlroute',
		templateUrl : "views/common/sub-content.html",
		controller : 'controlController',
		params:{
		control:null
		}
	})
	
	.state('home.transport.dashboard', {
		url : '/dashboard',
		templateUrl : 'views/transport/dashboard/dashboard.html',
		controller : 'controlController'
	})

	.state('home.transport.controlList', {
		url : '/controlList',
		templateUrl : './views/transport/Controls/controlList.html',
		controller : 'controlController',
	})

	.state('home.transport.addControl', {
		url : '/addControl',
		templateUrl : './views/transport/Controls/addControl.html',
		controller : 'controlController'
	})

	.state('home.transport.viewControl', {
		url : '/viewControl',
		templateUrl : './views/transport/Controls/viewControl.html',
		controller : 'controlController',
		params : {
			control : null
		}
	})

	.state('home.transport.updateControl', {
		url : '/updateControl',
		templateUrl : './views/transport/Controls/updateControl.html',
		controller : 'controlController',

		params : {
			control : null
		}

	})

});