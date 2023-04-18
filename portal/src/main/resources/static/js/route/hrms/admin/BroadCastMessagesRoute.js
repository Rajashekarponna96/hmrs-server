var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {

			$stateProvider

					/** broadcasting messages* */

					.state(
							'home.broadcastingMessagesList',
							{
								url : '/broadcastingMessagesList',
								templateUrl : './views/hrms/admin/broadcastingMessages/broadcastingMessagesList.html',
								controller : 'broadcastingMessagesController'
							})
					.state(
							'home.addBroadcastingMessage',
							{
								url : '/addBroadcastingMessage',
								templateUrl : './views/hrms/admin/broadcastingMessages/addBroadcastingMessage.html',
								controller : 'broadcastingMessagesController',
								params : {
									broadCasteMessage : null
								}
							})
					.state(
							'home.updateBroadcastingMessage',
							{
								url : '/updateBroadcastingMessage',
								templateUrl : './views/hrms/admin/broadcastingMessages/editBroadcastingMessage.html',
								controller : 'broadcastingMessagesController',
								params:{
									broadCasteMessage:null
								}
							})
					.state(
							'home.viewBroadCasteMessage',
							{
								url : '/viewBroadCasteMessage',
								templateUrl : './views/hrms/admin/broadcastingMessages/viewBroadCasteMessage.html',
								controller : 'broadcastingMessagesController',
								params:{
									broadCasteMessage:null
								}
							})

		});