angular.module("srmt").config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	
	.state('home.agent',{
		abstart : true,
		url : '/agentroute',
		templateUrl : "views/common/sub-content.html",
		controller : 'agentController',
		params:{
			agent:null
		}
	})
	.state('home.agent.agentList',{
		url : '/agentList',
		templateUrl : './views/transport/Agents/agentsList.html',
		controller : 'agentController'
	})
	
	
	.state('home.agent.addAgent',{
		url : '/addAgent',
		templateUrl : './views/transport/Agents/addAgent.html'
		
	})
	.state('home.agent.confirmAgent',{
		url : '/confirmAgent',
		templateUrl : './views/transport/Agents/confirmAgent.html'
		
	})
	
	
	
	
	/*
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