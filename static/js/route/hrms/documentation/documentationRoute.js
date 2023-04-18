angular.module('srmt').config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.documentation', {
		url : '/documentation',
		abstract: true,
		templateUrl : "views/common/sub-content.html",
		controller : 'documentationController'
	}).state('home.documentation.documentationList', {
		url : '/documentationList',
		templateUrl : './views/hrms/documentation/documentationList.html',
		controller : 'documentationController'
	}).state('home.documentation.addDocuments', {
		url : '/uploadDocumentationFile',
		templateUrl : './views/hrms/documentation/uploadDocumentationFile.html',
		controller : 'documentationController'
	}).state('home.documentation.updateDocument', {
		url : '/updateDocumentationFile',
		templateUrl : './views/hrms/documentation/updateDocumentationFile.html',
		controller : 'documentationController',
		params : {
			docData : null
		}
	})
});