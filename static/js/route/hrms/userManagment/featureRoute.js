angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {
					$stateProvider

							.state(
									'home.usermgmt.featuresList',
									{

										url : '/featuresList',
										templateUrl : './views/hrms/usermanagement/features/featuresList.html',
										controller : 'featureController'

									})
							.state(
									'home.usermgmt.addFeatureCategory',
									{

										url : '/addFeatureCategory',
										templateUrl : './views/hrms/usermanagement/features/addFeatureCategory.html',
										controller : 'featureCategoryController'

									})
							.state(
									'home.usermgmt.updateFeatureCategory',
									{

										url : '/updateFeatureCategory',
										templateUrl : './views/hrms/usermanagement/features/updateFeatureCategory.html',
										controller : 'featureCategoryController',
										params:{
											featureCategory:null
										}

									})
							.state(
									'home.usermgmt.featureCategoryList',
									{

										url : '/featureCategoryList',
										templateUrl : './views/hrms/usermanagement/features/featureCategoryList.html',
										controller : 'featureCategoryController'

									})

				})