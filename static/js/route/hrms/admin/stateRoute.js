angular.module("srmt").config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	
	.state('home.state',{
		abstart : true,
		url : '/stateroute',
		templateUrl : "views/common/sub-content.html",
		controller : 'stateController',
		params:{
			state:null
		}
	})
	.state('home.state.stateList',{
		url : '/stateList',
		templateUrl : 'views/hrms/admin/State/stateList.html'
	
	})
	
	
	.state('home.state.addState',{
		url : '/addState',
		templateUrl : './views/hrms/admin/State/addState.html'
		
	})
	
		.state('home.state.viewState',{
		url : '/viewState',
		templateUrl : './views/hrms/admin/State/viewState.html'
		
	})
	
		.state('home.state.updateState',{
		url : '/updateState',
		templateUrl : './views/hrms/admin/State/updateState.html'
		
		
	})
	
	
});