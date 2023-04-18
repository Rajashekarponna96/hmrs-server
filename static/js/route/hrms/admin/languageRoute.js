var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

	/** Language Details * */

	.state('home.languageDetailsList', {
		url : '/languageDetailsList',
		templateUrl : './views/hrms/admin/language/languageDetailsList.html',
		controller : 'languageController'
	}).state('home.addLanguageDetail', {
		url : '/addLanguageDetail',
		templateUrl : './views/hrms/admin/language/addLanguageDetail.html',
		controller : 'languageController',
		params : {
			languageData : null
		}
	}).state('home.updateLanguageDetail', {
		url : '/updateLanguageDetail',
		templateUrl : './views/hrms/admin/language/updateLanguageDetail.html',
		controller : 'languageController',
		params : {
			languageData : null
		}
	}).state('home.viewLanguageDetail', {
		url : '/viewLanguageDetail',
		templateUrl : './views/hrms/admin/language/viewLanguageDetail.html',
		controller : 'languageController',
		params : {
			languageData : null
		}
	})

});