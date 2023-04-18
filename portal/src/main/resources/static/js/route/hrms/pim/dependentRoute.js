angular.module('srmt').config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	
	.state('home.employee.dependentDetail',{
		url:'/dependentDetail',
	    templateUrl:'./views/hrms/pim/dependents/dependentDetail.html',
		controller:'dependentController',
		params : {
			person : null
		}
	})
	
	.state('home.employee.addDependentDetail',{
		url:'/addDependentDetail',
	    templateUrl:'./views/hrms/pim/dependents/addDependentDetail.html',
	    controller:'dependentController'
	})
	
	.state('home.employee.updatedependentDetail',{
		url:'/updatedependentDetail',
	    templateUrl:'./views/hrms/pim/dependents/updatedependentDetail.html',
	    controller:'dependentController',
	    params:{
	    	dependent:null
	    }
	})
	
	.state('home.employee.viewDependentDetail',{
		url:'/viewDependentDetail',
	    templateUrl:'./views/hrms/pim/dependents/viewDependentDetail.html',
	    controller:'dependentController'
	})
	.state('home.employee.addDependentDocument',{
		url:'/addDependentDocument',
	    templateUrl:'./views/hrms/pim/dependents/addDependentDocument.html',
	    controller:'dependentController'
	})
	
	.state(
			'home.employee.updateDependentDocument',
			{

				url : '/updateDependentDocument',
				templateUrl : './views/hrms/pim/dependents/updateDependentDocument.html',
				controller : 'dependentController',
				params : {
					document : null
				}
			})
			.state(
			'home.employee.viewDependentDocument',
			{

				url : '/viewDependentDocument',
				templateUrl : './views/hrms/pim/dependents/viewDependentDocument.html',
				controller : 'dependentController',
				params : {
					document : null
				}
			})

})