var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.tdv.lookup', {
		url : '/lookup',
		abstract : true,
		templateUrl : "./views/sales/productLineLookupTemplate.html"
	}).state('home.tdv.lookup.segment', {
		url : '/segment',
		templateUrl : './views/sales/vehicle/segment.html',
		controller : 'segmentController'

	}).state('home.tdv.lookup.parentProductLine', {
		url : '/parentProductLine',
		templateUrl : './views/sales/vehicle/parentProductLine.html',
		controller : 'parentProductLineController'
	})
	.state('home.tdv.lookup.addModel', {
		url : '/addModel',
		templateUrl : './views/sales/vehicle/addModel.html',
		controller : 'modelController'
	})
});