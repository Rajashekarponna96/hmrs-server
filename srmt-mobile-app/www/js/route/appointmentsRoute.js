srmtApp.config(function($stateProvider, $urlRouterProvider, $translateProvider,
		$ionicConfigProvider) {
	$ionicConfigProvider.views.maxCache(0);

	$translateProvider.translations('EN', translationsEN);
	$translateProvider.translations('TE', translationsTE);
	$translateProvider.preferredLanguage('EN');

	$stateProvider.state('app.appointments', {
		url : '/appointments',
		views : {
			'menuContent' : {
				templateUrl : 'templates/appointments/appointmentList.html',
				controller : 'appointmentController'
			}
		}
	}).state('app.addAppointment', {
		url : '/addAppointment',
		views : {
			'menuContent' : {
				templateUrl : 'templates/appointments/addAppointment.html',
				controller : 'appointmentController'
			}
		}
	}).state('app.viewAppointment', {
		url : '/viewAppointment',
		views : {
			'menuContent' : {
				templateUrl : 'templates/appointments/viewAppointment.html',
				controller : 'appointmentController'
			}
		}, 
		params : {
			appointment: null
		}
	})
});