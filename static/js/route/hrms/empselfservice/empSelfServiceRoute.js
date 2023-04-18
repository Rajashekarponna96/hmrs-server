angular.module('srmt').config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.selfService', {
		abstarct : true,
		url : '/employeeSelfService',
		templateUrl : './views/hrms/empSelfService/selfService_index.html',
		controller : 'personalDetailsSelfServiceController'
	})

});