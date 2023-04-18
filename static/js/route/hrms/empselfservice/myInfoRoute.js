angular.module('srmt').config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.selfService.myinfo', {
		abstarct : true,
		url : '/myInfo',
		templateUrl : './views/hrms/empSelfService/myInfo/myinfo_template.html',
		controller : 'personalDetailsSelfServiceController'
	})
});