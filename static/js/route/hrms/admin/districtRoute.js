angular.module("srmt").config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	
	.state('home.districtList',{
		url : '/districtList',
		templateUrl : './views/hrms/admin/districts/districtList.html',
		controller : 'districtController'
	})
	
	
	.state('home.addDistrict',{
		url : '/addDistrict',
		templateUrl : './views/hrms/admin/districts/addDistrict.html',
		controller : 'districtController'
	})
	
		.state('home.viewdistrict',{
		url : '/viewdistrict',
		templateUrl : './views/hrms/admin/districts/viewdistrict.html',
		controller : 'districtController',
		params:{
			district:null
		}
	})
	
		.state('home.updateDistrict',{
		url : '/updateDistrict',
		templateUrl : './views/hrms/admin/districts/updateDistrict.html',
		controller : 'districtController',
		params:{
			district:null
		}
	})
	
	
});