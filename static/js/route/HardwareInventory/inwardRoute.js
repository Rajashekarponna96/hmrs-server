angular.module("srmt").config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	
	.state('home.inward',{
		abstart : true,
		url : '/inwardroute',
		templateUrl : "views/common/sub-content.html",
		controller : 'inwardController',
		params:{
			inward:null
		}
	})
	.state('home.inward.inwardList',{
		url : '/inwardList',
		templateUrl : './views/HardwareInventory/inventory/inwardList.html',
		controller : 'inwardController'
	
	})
	
	
	.state('home.inward.addInward',{
		url : '/addInward',
		templateUrl : './views/HardwareInventory/inventory/addInward.html'
		
	})
	
	/*	.state('home.station.viewStation',{
		url : '/viewStation',
		templateUrl : './views/transport/Stations/viewStations.html'
		
	})
	
		.state('home.station.updateStation',{
		url : '/updateStation',
		templateUrl : './views/transport/Stations/updateStations.html',
		controller : 'stationController'
		
	})
	*/
	
});