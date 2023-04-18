angular.module('srmt').config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	
	.state('home.employee.jobDetail',{
		url:'/jobDetail',
	    templateUrl:'./views/hrms/pim/jobDetails/jobDetail.html',
		controller:'jobController'
	})
	
	
})