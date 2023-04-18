angular.module('srmt').config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	
	.state('home.employee.experienceDetail',{
		url:'/experienceDetail',
	    templateUrl:'./views/hrms/pim/experience/experienceDetail.html',
		controller:'experienceController'
	})
	
	.state('home.employee.addExperience',{
		url:'/addExperience',
	    templateUrl:'./views/hrms/pim/experience/addExperience.html',
	    controller:'experienceController'
	})
	
	.state('home.employee.updateExperience',{
		url:'/updateExperience',
	    templateUrl:'./views/hrms/pim/experience/updateExperience.html',
	    controller:'experienceController',
	    params: {
	    	experienceData : null
	    }
	})
	
	.state('home.employee.viewExperience',{
		url:'/viewExperience',
	    templateUrl:'./views/hrms/pim/experience/viewExperience.html',
	    controller:'experienceController',
	    params: {
	    	experienceData : null
	    }
	})
	.state('home.employee.addExperienceDocument',{
		url:'/addExperienceDocument',
	    templateUrl:'./views/hrms/pim/experience/addExperienceDocument.html',
	    controller:'experienceController',
	    params: {
	    	experienceData : null
	    }
	})
	
	.state(
			'home.employee.updateExperienceDocument',
			{

				url : '/updateExperienceDocument',
				templateUrl : './views/hrms/pim/experience/updateExperienceDocument.html',
				controller : 'experienceController',
				params : {
					document : null
				}
			})
			.state(
			'home.employee.viewExperienceDocument',
			{

				url : '/viewExperienceDocument',
				templateUrl : './views/hrms/pim/experience/viewExperienceDocument.html',
				controller : 'experienceController',
				params : {
					document : null
				}
			})
})