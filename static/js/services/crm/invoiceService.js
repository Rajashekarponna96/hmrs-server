angular.module('srmt').service('invoiceService',function(CRM_CONFIG,$http){
	
	this.getInvoices=function(page,size){
		return $http.get(CRM_CONFIG.URL.GET_INVOICE(page,size));
	}
	
	this.addInvoice=function(invoice){
		return $http.post(CRM_CONFIG.URL.ADD_INVOICE(),invoice);
	}
	this.UpdateInvoice=function(invoice){
		return $http.post(CRM_CONFIG.URL.UPDATE_INVOICE(),invoice);
	}
	this.getCount=function(){
		return $http.get(CRM_CONFIG.URL.GET_INVOICE_COUNT());
	}
	
	this.generateInvoice=function(invoiceId){
		return $http.get(CRM_CONFIG.URL.GENERATE_INVOICE(invoiceId),{
			responseType : 'arraybuffer'
		})
	}
	
})