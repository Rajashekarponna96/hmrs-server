var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.crm.bookingInfo', {
		url : '/bookingInfo',
		templateUrl : './views/crm/bookingInfo/bookingInfo.html',
		controller : 'bookingInfoController'
	}).state('home.crm.updateBookingInfo', {
		url : '/updateBookingHall',
		templateUrl : './views/crm/bookingInfo/updateBookingHall.html',
		controller : 'bookingInfoController',
		params : {
			bookHall : null
		}
	}).state('home.crm.addPayment', {
		url : '/addPayment',
		templateUrl : './views/crm/payments/addPayment.html',
		controller : 'bookingInfoController',

		params : {
			bookHall : null
		}
	})
	
	.state('home.crm.viewBookingInfo', {
		url : '/viewBookingInfo',
		templateUrl : './views/crm/bookingInfo/viewBookingInfo.html',
		controller : 'bookingInfoController',

		params : {
			bookHall : null
		}
	})

});