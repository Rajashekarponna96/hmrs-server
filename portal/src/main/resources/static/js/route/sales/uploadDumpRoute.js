var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.tdv.uploadInvoiceDump', {
		url : '/uploadInvoice',
		templateUrl : "./views/sales/dump/uploadInvoiceDump.html",
		controller : "uploadInvoiceDumpController"
	})
});