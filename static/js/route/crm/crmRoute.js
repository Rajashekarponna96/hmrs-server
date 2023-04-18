var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.crm', {
		url : '/crm',
		templateUrl : "views/common/sub-content.html",
		controller : 'functionHallController'
	})

});