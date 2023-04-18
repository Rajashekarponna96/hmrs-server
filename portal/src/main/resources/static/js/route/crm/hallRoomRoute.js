var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.crm.hallRoomsList', {
		url : '/hallRoomsList',
		templateUrl : './views/crm/hallRooms/hallRoomsList.html',
		controller : 'hallRoomController'
	}).state('home.crm.addHallRoom', {
		url : '/addHallRoom',
		templateUrl : './views/crm/hallRooms/addHallRoom.html',
		controller : 'hallRoomController'
	})

	
	.state('home.crm.viewHallRoom', {
		url : '/viewHallRoom',
		templateUrl : './views/crm/hallRooms/viewHallRoom.html',
		controller : 'hallRoomController',
		params : {
			hallRoom : null
		}
	})
});