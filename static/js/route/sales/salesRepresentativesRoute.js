var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.salerepresentative', {
		url : '/salerepresentative',
		abstart : true,
		templateUrl : "views/common/sub-content.html",
		controller : 'salesRepresentativesController'
			
	}).state('home.salerepresentative.salerepresentativeslist', {
		url : '/salerepresentativeslist',
		templateUrl : './views/sales/salerepresentative/salerepresentativeslist.html',
		controller : 'salesRepresentativesController',
		params : {
			bookHall : null
		}
	}).state('home.salerepresentative.addSalerepresentative', {
		url : '/addSalerepresentative',
		templateUrl : './views/sales/salerepresentative/addSalerepresentative.html',
		controller : 'salesRepresentativesController'

		
	})
	
	.state('home.salerepresentative.viewSalerepresentative', {
		url : '/viewSalerepresentative',
		templateUrl : './views/sales/salerepresentative/viewSalerepresentative.html',
		controller : 'salesRepresentativesController',

		params : {
			salesRepresentative : null
		}
	})
	
	.state('home.salerepresentative.updateSalerepresentative',{
		url : '/updateSalerepresentative',
		templateUrl : './views/sales/salerepresentative/updateSalerepresentative.html',
		controller : 'salesRepresentativesController',
		
		params:{
			salesRepresentative:null
		}
		
	})

});