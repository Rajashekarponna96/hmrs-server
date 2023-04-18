angular.module('srmt').config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('home.crm.invoicelist',{
		url : "/invoicelist",
		templateUrl :"./views/crm/invoice/invoicelist.html",
		controller :'invoiceControler'
	})
	.state('home.crm.addInvoice',{
		url : "/addInvoice",
		templateUrl :"./views/crm/invoice/addInvoice.html",
		controller :'invoiceControler'
	})
	.state('home.crm.updateInvoice',{
		url : "/updateInvoice",
		templateUrl :"./views/crm/invoice/updateInvoice.html",
		controller :'invoiceControler',
		params:{
			invoice:null
		}
	})
	.state('home.crm.viewInvoice',{
		url : "/viewInvoice",
		templateUrl :"./views/crm/invoice/viewInvoice.html",
		controller :'invoiceControler',
		params:{
			invoice:null
		}
	})
})