srmtApp.config(function($stateProvider, $urlRouterProvider, $translateProvider,
		$ionicConfigProvider) {
	$ionicConfigProvider.views.maxCache(0);

	$translateProvider.translations('EN', translationsEN);
	$translateProvider.translations('TE', translationsTE);
	$translateProvider.preferredLanguage('EN');

	$stateProvider
	
	.state('app.addInventory', {
		url : '/addInventory',
		views : {
			'menuContent' : {
				templateUrl : 'templates/inventory/addInventory.html',
				controller : 'inventoryControllerOnline'
			}
		}
	})
	
	.state('app.inventoryList', {
		url : '/inventoryList',
		views : {
			'menuContent' : {
				templateUrl : 'templates/inventory/inventoryList.html',
				controller : 'inventoryControllerOnline'
			}
		}
	})
	

});