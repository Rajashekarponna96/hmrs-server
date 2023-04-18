var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.crm.bookingSummaryList', {
		url : '/bookingSummaryList',
		templateUrl : './views/crm/bookingSummary/bookingSummaryList.html',
		controller : 'BookingSummaryController'
	}) 
});