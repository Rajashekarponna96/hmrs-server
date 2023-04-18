var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.crm.marriageCertificate', {
		url : '/marriageCertificate',
		templateUrl : './views/crm/certificates/marriageCertificate.html',
		controller : 'marriageCertificateController'
	}).state('home.crm.viewMarriageCertificate', {
		url : '/viewMarriageCertificate',
		templateUrl : './views/crm/certificates/viewMarriageCertificate.html',
		controller : 'marriageCertificateController',
		params: {
			bill : null
		}
	})
	 
});