srmtApp.config(function($stateProvider, $urlRouterProvider, $translateProvider,
		$ionicConfigProvider) {
	$ionicConfigProvider.views.maxCache(0);

	$translateProvider.translations('EN', translationsEN);
	$translateProvider.translations('TE', translationsTE);
	$translateProvider.preferredLanguage('EN');

	$stateProvider.state('app.addClient', {
		url : '/addClient',
		views : {
			'menuContent' : {
				templateUrl : 'templates/clients/addClient.html',
				controller : 'clientControllerOnline'
			}
		}
	}).state('app.clientList', {
		url : '/clientList',
		views : {
			'menuContent' : {
				templateUrl : 'templates/clients/clients.html',
				controller : 'clientControllerOnline'
			}
		}
	}).state('app.viewClient', {
		url : '/viewClient',
		views : {
			'menuContent' : {
				templateUrl : 'templates/clients/viewClient.html',
				controller : 'clientControllerOnline'
			}
		},
		params : {
			client : null
		}
	})

});