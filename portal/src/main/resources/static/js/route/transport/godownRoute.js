angular.module("srmt").config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	
	.state('home.godown',{
		abstart : true,
		url : '/godownroute',
		templateUrl : "views/common/sub-content.html",
		controller : 'godownController',
		params:{
			godown:null
		}
	})
	.state('home.godown.godownsList',{
		url : '/godownList',
		templateUrl : './views/transport/Godowns/godownsList.html'
	
	})
	
	.state('home.godown.addGodown',{
		url : '/addGodown',
		templateUrl : './views/transport/Godowns/addGodown.html'
		
	})
	
	.state('home.godown.confirmGodown',{
		url : '/confirmGodown',
		templateUrl : './views/transport/Godowns/confirmGodown.html'
		
	})
	
	/*
	.state('home.station.addStation',{
		url : '/addStation',
		templateUrl : './views/Transport/Stations/addStations.html'
		
	})
	
		.state('home.station.viewStation',{
		url : '/viewStation',
		templateUrl : './views/Transport/Stations/viewStations.html'
		
	})
	
		.state('home.station.updateStation',{
		url : '/updateStation',
		templateUrl : './views/Transport/Stations/updateStations.html'
		
		
	})
	*/
	
});