var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

	/* WorkShift route */
	.state('home.worKShiftDetails', {
		url : '/worKShiftDetails',
		templateUrl : './views/hrms/admin/workShift/worKShiftDetails.html',
		controller : 'workShiftController'

	}).state('home.addWorkShift', {
		url : '/addWorkShift',
		templateUrl : './views/hrms/admin/workShift/addWorkShift.html',
		controller : 'workShiftController',
		resolve : {
			loadPlugin : function($ocLazyLoad) {
				return $ocLazyLoad
						.load([ ,
						{
							insertBefore : '#loadBefore',
							name : 'toaster',
							files : [
									'js/plugins/clockpicker/clockpicker.js',
									'css/plugins/clockpicker/clockpicker.css' ]
						}]);
			}
		}

	}).state('home.editWorkShift', {
		url : '/editWorkShift',
		templateUrl : './views/hrms/admin/workShift/editWorkShift.html',
		controller : 'workShiftController',
		params : {
			workShift : null
		},
		resolve : {
			loadPlugin : function($ocLazyLoad) {
				return $ocLazyLoad
						.load([ ,
						{
							insertBefore : '#loadBefore',
							name : 'toaster',
							files : [
									'js/plugins/clockpicker/clockpicker.js',
									'css/plugins/clockpicker/clockpicker.css' ]
						}]);
			}
		}

	})

	.state('home.viewWorkShift', {
		url : '/viewWorkShift',
		templateUrl : './views/hrms/admin/workShift/viewWorkShift.html',
		controller : 'workShiftController',
		params : {
			workShift : null
		}

	})

});