var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.crm.paymentList', {
		url : '/paymentList',
		templateUrl : './views/crm/payments/paymentList.html',
		controller : 'paymentController'
	})
	
	.state('home.crm.viewPayment', {
		url : '/viewPayment',
		templateUrl : './views/crm/payments/viewPayment.html',
		controller : 'paymentController',
		params : {
			payment : null
		}
	})
});