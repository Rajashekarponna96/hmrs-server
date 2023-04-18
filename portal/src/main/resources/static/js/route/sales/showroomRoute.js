var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.showroom', {
		url : '/showroom',
		abstart : true,
		templateUrl : "views/common/sub-content.html",
		controller : 'showroomController'
			
	}).state('home.showroom.showroomlist', {
		url : '/showroomlist',
		templateUrl : './views/sales/showroom/showroomlist.html',
		controller : 'showroomController',
		 
	}).state('home.showroom.addShowroom', {
		url : '/addShowroom',
		templateUrl : './views/sales/showroom/addShowroom.html',
		controller : 'showroomController',

		params : {
			bookHall : null
		}
	})
	
	.state('home.showroom.viewShowroom', {
		url : '/viewShowroom',
		templateUrl : './views/sales/showroom/viewShowroom.html',
		controller : 'showroomController',

		params : {
			showroom : null
		}
	})
	
	.state('home.showroom.updateShowroom',{
		url : '/updateShowroom',
		templateUrl : './views/sales/showroom/updateShowroom.html',
		controller : 'showroomController',
		
		params:{
			showroom :null
		}
		
	})

});