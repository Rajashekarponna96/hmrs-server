angular.module("srmt").config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('home.countryList', {
		url : '/countryList',
		templateUrl : './views/hrms/admin/country/countryList.html',
		controller : 'countryController',
	})

	.state('home.addCountry', {
		url : '/addCountry',
		templateUrl : './views/hrms/admin/country/addCountry.html',
		controller : 'countryController'
	})

	.state('home.viewCountry', {
		url : '/viewCountry',
		templateUrl : './views/hrms/admin/country/viewCountry.html',
		controller : 'countryController',
		params : {
			country : null
		}
	})

	.state('home.updateCountry', {
		url : '/updateCountry',
		templateUrl : './views/hrms/admin/country/updateCountry.html',
		controller : 'countryController',

		params : {
			country : null
		}

	})

});