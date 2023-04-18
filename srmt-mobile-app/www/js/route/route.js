srmtApp.config(function($stateProvider, $urlRouterProvider, $translateProvider,
		$ionicConfigProvider) {
	$ionicConfigProvider.views.maxCache(0);

	$translateProvider.translations('EN', translationsEN);
	$translateProvider.translations('TE', translationsTE);
	$translateProvider.preferredLanguage('EN');

	$stateProvider.state('app', {
		url : '/app',
		abstract : true,
		templateUrl : 'templates/menu.html',
		controller : 'LoginCtrl'
	}).state('login', {
		url : '/login',
		templateUrl : 'templates/login/login.html',
		controller : 'LoginCtrl'
	}).state('app.dashboard', {
		url : '/dashboard',
		views : {
			'menuContent' : {
				templateUrl : 'templates/profile/dashboard.html',
				controller : 'LoginCtrl'
			}
		}
	}).state('app.changePassword', {
		url : '/changePassword',
		views : {
			'menuContent' : {
				templateUrl : 'templates/changePassword/changePassword.html',
				controller : 'LoginCtrl'
			}
		}
	}).state('app.settings', {
		url : '/settings',
		views : {
			'menuContent' : {
				templateUrl : 'templates/inventory/settings.html',
				controller : 'LoginCtrl'
			}
		}
	}).state('app.quotes', {
		url : '/quotes',
		views : {
			'menuContent' : {
				templateUrl : 'templates/quotes/quotes.html',
				controller : 'LoginCtrl'
			}
		}
	}).state('app.deals', {
		url : '/deals',
		views : {
			'menuContent' : {
				templateUrl : 'templates/inventory/deals.html',
				controller : 'LoginCtrl'
			}
		}
	}).state('app.profile', {
		url : '/profile',
		views : {
			'menuContent' : {
				templateUrl : 'templates/profile/profile.html',
				controller : 'personalInfoControllerOnline'
			}
		}
	})
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');
});
