angular.module('srmt').config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	
	.state('home.employee.qualificationDeatil',{
		url:'/qualificationDeatil',
	    templateUrl:'./views/hrms/pim/qualificationDetail/qualificationDeatil.html',
		controller:'qualificationController'
	})
	
	.state('home.employee.addQualoification',{
		url:'/addQualoification',
	    templateUrl:'./views/hrms/pim/qualificationDetail/addQualoification.html',
	    controller:'qualificationController'
	})
	
	.state('home.employee.updateQualification',{
		url:'/updateQualification',
	    templateUrl:'./views/hrms/pim/qualificationDetail/updateQualification.html',
	    controller:'qualificationController',
	    params : {
	    	qualificationData : null
	    }
	})
	
	.state('home.employee.viewQulaification',{
		url:'/viewQulaification',
	    templateUrl:'./views/hrms/pim/qualificationDetail/viewQulaification.html',
	    controller:'qualificationController',
	    params : {
	    	qualificationData : null
	    }
	})
	.state('home.employee.addQualificationDocument',{
		url:'/addQualificationDocument',
	    templateUrl:'./views/hrms/pim/qualificationDetail/addQualificationDocument.html',
	    controller:'qualificationController',
	    params : {
	    	qualificationData : null
	    }
	})
	
	.state(
			'home.employee.updateQualificationDocument',
			{

				url : '/updateQualificationDocument',
				templateUrl : './views/hrms/pim/qualificationDetail/updateQualificationDocument.html',
				controller : 'qualificationController',
				params : {
					document : null
				}
			})
			.state(
			'home.employee.viewQualifictionDocument',
			{

				url : '/viewQualifictionDocument',
				templateUrl : './views/hrms/pim/qualificationDetail/viewQualifictionDocument.html',
				controller : 'qualificationController',
				params : {
					document : null
				}
			})
})