var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider,IdleProvider) {
			
			IdleProvider.idle(300); 
			$stateProvider
					.state('home', {
						url : '/home',
						abstart : true,
						templateUrl : "views/common/content.html",
						controller : 'commonController'
					})
					.state(
							'login',
							{
								url : "/login",
								templateUrl : "views/hrms/login/login.html",
								data : {
									pageTitle : 'Login',
									specialClass : 'gray-bg'
								},
								controller : 'loginController',
								resolve : {
									loadPlugin : function($ocLazyLoad) {
										return $ocLazyLoad
												.load([
														{
															name : 'cgNotify',
															files : [
																	'css/plugins/angular-notify/angular-notify.min.css',
																	'js/plugins/angular-notify/angular-notify.min.js' ]
														},
														{

															name : 'toaster',
															files : [
																	'js/plugins/toastr/toastr.min.js',
																	'css/plugins/toastr/toastr.min.css' ]
														},
														{
															files : [
																	'js/plugins/sweetalert/sweetalert.min.js',
																	'css/plugins/sweetalert/sweetalert.css',
																	]
														},
														{
															name : 'oitozero.ngSweetAlert',
															files : [ 'js/plugins/sweetalert/angular-sweetalert.min.js' ]
														},
														{
															name : 'datePicker',
															files : [
																	'css/plugins/datapicker/angular-datapicker.css',
																	'js/plugins/datapicker/angular-datepicker.js' ]
														},
														{
															name : 'ui.multiselect',
															files : [
															         	'css/plugins/chosen/chosen.css',
															         	'css/plugins/ui-select/docsupport/style.css',
															         	'css/plugins/ui-select/docsupport/prism.css'
															         	
															        ]
														}
														]);

									}
								}
							})
					.state('openBroadcastMessage', {
						url : '/openBroadcastMessage',
						templateUrl : './views/openBroadcastMessage.html',
						controller : 'loginController',
						params : {
							broadcastMessage : null
						}
					})

					.state('home.progresspages', {
						url : '/progresspages',
						templateUrl : './views/progresspages.html'

					})
					.state(
							'home.organisation',
							{
								url : '/organisation',
								templateUrl : './views/hrms/admin/orgnaization/companyInformation.html',
								controller : 'organaisationController'
							})

					.state('home.dashboard', {
						url : '/dashboard',
						templateUrl : './views/hrms/dashboard/dashboard.html',
						controller : 'loginController',

					});

			$urlRouterProvider.otherwise('/login');

		});