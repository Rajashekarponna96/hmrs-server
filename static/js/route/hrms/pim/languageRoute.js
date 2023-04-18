angular.module('srmt').config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	
	.state('home.employee.languageDetail',{
		url:'/languageDetail',
	    templateUrl:'./views/hrms/pim/languageDetails/languageDetail.html',
		controller:'pimLanguageController'
	})
	
	.state('home.employee.addLanguage',{
		url:'/addLanguage',
	    templateUrl:'./views/hrms/pim/languageDetails/addLanguage.html',
	    controller:'pimLanguageController'
	})
	
	.state('home.employee.updateLanguage',{
		url:'/updateLanguage',
	    templateUrl:'./views/hrms/pim/languageDetails/updateLanguage.html',
	    controller:'pimLanguageController',
	    params: {
	    	languageProficiencyData : null
	    }
	})
	
	.state('home.employee.viewLanguage',{
		url:'/viewLanguage',
	    templateUrl:'./views/hrms/pim/languageDetails/viewLanguage.html',
	    controller:'pimLanguageController',
	    params: {
	    	languageProficiencyData : null
	    }
	})
})