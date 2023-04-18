var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.crm.rentalChargeList', {
		url : '/rentalChargeList',
		templateUrl : './views/crm/rentalCharge/rentalChargeList.html',
		controller : 'rentalChargeListController'
	}).state('home.crm.addRentalCharge', {
		url : '/addRentalCharge',
		templateUrl : './views/crm/rentalCharge/addRentalCharge.html',
		controller : 'rentalChargeController'
	}).state('home.crm.updateRentalCharge', {
		url : '/updateRentalCharge',
		templateUrl : './views/crm/rentalCharge/updateRentalCharge.html',
		controller : 'rentalChargeController',
		params : {
			rentalCharge : null
		}
	}).state('home.crm.viewRentalCharge', {
		url : '/viewRentalCharge',
		templateUrl : './views/crm/rentalCharge/viewRentalCharge.html',
		controller : 'rentalChargeController',
		params : {
			rentalCharge : null
		}
	})
});