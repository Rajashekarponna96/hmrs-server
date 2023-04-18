var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.crm.functionHallList', {
		url : '/functionHallList',
		templateUrl : './views/crm/functionHalls/functionHallList.html',
		controller : 'functionHallController'
	}).state('home.crm.addFunctionHall', {
		url : '/addFunctionHall',
		templateUrl : './views/crm/functionHalls/addFunctionHall.html',
		controller : 'functionHallController'
	})

	.state('home.crm.updateFunctionHall', {
		url : '/updateFunctionHall',
		templateUrl : './views/crm/functionHalls/updateFunctionHall.html',
		controller : 'functionHallController',
		params : {
			functionHall : null
		}
	})

	.state('home.crm.viewFunctionHall', {
		url : '/viewFunctionHall',
		templateUrl : './views/crm/functionHalls/viewFunctionHall.html',
		controller : 'functionHallController',
		params : {
			functionHall : null
		}
	})
});