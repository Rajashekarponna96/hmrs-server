angular.module('srmt').service("paymentService",function($http,CRM_CONFIG){
	this.payPayment=function(hallRoom){
		return $http.post(CRM_CONFIG.URL.PAY_PAYMENT(),hallRoom);
	};
	
	this.getPayments = function(page,size){
		return $http.get(CRM_CONFIG.URL.GET_PAYMENTS(page,size));
	};
	
	this.getCount = function(dataUrl){
		return $http.get(CRM_CONFIG.URL.SEARCH_PAYMENT_COUNT(dataUrl));
	};
	this.searchPayment = function(dataUrl){
		return $http.get(CRM_CONFIG.URL.SEARCH_PAYMENT(dataUrl));
	};
	
	this.searchByRecieptIdAndDate = function(dataUrl){
		return $http.get(CRM_CONFIG.URL.SEARCH_BY_RECEIPT_ID_AND_DATE(dataUrl));
	};
	
	this.getMatchedCertificatesCount = function(countUrl){
		return $http.get(CRM_CONFIG.URL.GET_COUNT_BY_RECEIPT_ID_AND_DATE(countUrl));
	};
	
	this.printCertificate = function(billId){
		return $http.get(CRM_CONFIG.URL.PRINT_MARRIAGE_CERTIFICATE(billId));
	}
	
})