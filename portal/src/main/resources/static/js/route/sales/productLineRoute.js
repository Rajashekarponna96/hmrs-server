var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.tdv.productLine', {
		url : '/productLine',
		abstract : true,
		templateUrl : "./views/sales/addProductLineLookup.html",
		controller : 'productLineController'
	

	}).state('home.tdv.productLine.productLineDetail', {
		url : '/addProductLine',
		templateUrl : './views/sales/productLine/addProductLine.html'
		
	}).state('home.tdv.productLine.prodctLineSpecification', {
		url : '/prodctLineSpecification',
		templateUrl : './views/sales/productLine/prodctLineSpecification.html'
	

	}).state('home.tdv.productLineList', {
		url : '/productLineList',
		templateUrl : './views/sales/productLine/productLineList.html',
		controller : 'productLineController',

	}).state('home.tdv.productLine.confirmSaveProductLine', {
		url : '/confirmProductLine',
		templateUrl : './views/sales/productLine/confirmProductLine.html'

	}).state('home.tdv.viewProductLine', {
		url : '/viewProductLine',
		templateUrl : './views/sales/productLine/viewProductLine.html',
		controller : 'productLineController',
		params:{
			productline:null
		}

	}).state('home.tdv.productLine.addVehicleColor', {
		url : '/addVehicleColor',
		templateUrl : './views/sales/vehicle/addVehicleColor.html',
		controller : 'vehiclemodelColorController'

	}).state('home.tdv.updateProductLine.updateProductLineConfirm', {
		url : '/updateProductLineConfirm',
		templateUrl : './views/sales/productLine/updateProductLineConfirm.html',
	}).state('home.tdv.updateProductLine.updateProductLineDetails', {
		url : '/updateProductLine',
		templateUrl : './views/sales/productLine/updateProductLine.html',
	}).state('home.tdv.updateProductLine.updateProductLineSpecifications', {
		url : '/updateProductLineDetails',
		templateUrl : './views/sales/productLine/updateProductLineSpecifications.html',
	}).state('home.tdv.updateProductLine', {
		url : '/ProductLine',
		templateUrl : './views/sales/productLine/updateProductLineTemplate.html',
		controller : 'productLineController',
		params:{
			productline:null
		}
	})
});