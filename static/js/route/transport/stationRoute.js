angular.module("srmt").config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	
	.state('home.station',{
		abstart : true,
		url : '/stationroute',
		templateUrl : "views/common/sub-content.html",
		controller : 'stationController',
		params:{
			station:null
		}
	})
	.state('home.station.stationList',{
		url : '/stationList',
		templateUrl : './views/transport/Stations/stationsList.html',
		controller : 'stationController'
	
	})
	
	
	.state('home.station.addStation',{
		url : '/addStation',
		templateUrl : './views/transport/Stations/addStations.html'
		
	})
	
		.state('home.station.viewStation',{
		url : '/viewStation',
		templateUrl : './views/transport/Stations/viewStations.html'
		
	})
	
		.state('home.station.updateStation',{
		url : '/updateStation',
		templateUrl : './views/transport/Stations/updateStations.html',
		controller : 'stationController'
		
	})
	
	
});