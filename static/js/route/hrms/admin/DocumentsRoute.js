var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {
		
			$stateProvider

			/** Documents * */
			.state(
					'home.documentCategoryList',
					{
						url : '/documentCategoryList',
						templateUrl : './views/hrms/admin/document/documentCategoryList.html',
						controller : 'documentController'
					})
			.state(
					'home.editDocumentCategory',
					{
						url : '/editDocumentCategory',
						templateUrl : './views/hrms/admin/document/editDocumentCategory.html',
						controller : 'documentController',
						params : {
							documentCategory : null
						}
					})
			.state(
					'home.addDocumentCategory',
					{
						url : '/addDocumentCategory',
						templateUrl : './views/hrms/admin/document/addDocumentCategory.html',
						controller : 'documentController',
						params : {
							documentCategory : null
						}
					})
			.state(
					'home.viewDocumentCategory',
					{
						url : '/viewDocumentCategory',
						templateUrl : './views/hrms/admin/document/viewDocumentCategory.html',
						controller : 'documentController',
						params : {
							documentCategory : null
						}
					})

		});