var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.crm.enquiryList', {
		url : '/enquiryList',
		templateUrl : './views/crm/enquiries/enquiryList.html',
		controller : 'enquiryController'
	}).state('home.crm.addEnquiry', {
		url : '/addEnquiry',
		templateUrl : './views/crm/enquiries/addEnquiry.html',
		controller : 'enquiryController'
	})

	.state('home.crm.updateEnquiry', {
		url : '/updateEnquiry',
		templateUrl : './views/crm/enquiries/updateEnquiry.html',
		controller : 'enquiryController',
		params : {
			enquiry : null
		}
	})

	.state('home.crm.viewEnquiry', {
		url : '/viewEnquiry',
		templateUrl : './views/crm/enquiries/viewEnquiry.html',
		controller : 'enquiryController',
		params : {
			enquiry : null
		}
	})

	.state('home.crm.bookHall', {
		url : '/bookHall',
		templateUrl : './views/crm/bookingInfo/bookHall.html',
		controller : 'enquiryController',
		params : {
			enquiry : null
		}
	})
});