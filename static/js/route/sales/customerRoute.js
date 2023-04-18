var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.tdv.customerList', {
		url : '/customerList',
		templateUrl : "./views/sales/customer/customerList.html",
		controller : "customerController"
	}).state('home.tdv.addCustomer', {
		url : '/addCustomer',
		templateUrl : "views/sales/customer/addCustomer.html",
		controller : "customerController"
	})
	.state('home.tdv.viewCustomer', {
		url : '/viewCustomer',
		templateUrl : "views/sales/customer/viewCustomer.html",
		controller : "customerController",
		params:{
			customer:null
		}
	})
	.state('home.tdv.updateCustomer', {
		url : '/updateCustomer',
		templateUrl : "views/sales/customer/updateCustomer.html",
		controller : "customerController",
		params:{
			customer:null
		}
	})
});