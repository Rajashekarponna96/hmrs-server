angular.module('srmt').config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	
	.state('home.employee.reportingTo',{
		url:'/reportingTo',
	    templateUrl:'./views/hrms/pim/reporting-To/reporting-to.html',
		controller:'reportingToController',
		params : {
			reportingData : null
		}
	})
	
	
})