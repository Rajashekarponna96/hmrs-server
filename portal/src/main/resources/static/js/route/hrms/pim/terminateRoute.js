angular.module('srmt').config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	
	.state('home.employee.TerminateEmploymentDetails',{
		url:'/TerminateEmploymentDetails',
	    templateUrl:'./views/hrms/single_column_template.html',
		controller:'terminateController',
		params : {
			terminateEmpData : null
		}
	})
	.state('home.employee.AddTerminateEmployment',{
		url:'/AddTerminateEmployment',
	    templateUrl:'./views/hrms/pim/terminate/AddTerminateEmployment.html',
		//templateUrl:'./views/hrms/single_column_template.html',
		controller:'terminateController'
	})
	.state('home.employee.addTerminateDocument',{
		url:'/addTerminateDocument',
		templateUrl:'./views/hrms/pim/terminate/addTerminateDocument.html',
		controller:'terminateController'
	})
	
		.state('home.employee.updateTerminateDocument',{
		url:'/updateTerminateDocument',
		templateUrl:'./views/hrms/pim/terminate/updateTerminateDocument.html',
		controller:'terminateController',
		params  : {
			document : document
		}
	})
	
	
	
})