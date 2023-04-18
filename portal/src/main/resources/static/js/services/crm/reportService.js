angular.module('srmt').service("reportService", function($http, CRM_CONFIG) {
	this.rentalChargeList = function() {
		return $http.get(CRM_CONFIG.URL.GET_RENTAL_CHARGES(), {
			responseType : 'arraybuffer'
		});
	};
	this.generatePaymentReceipt = function(id) {
		return $http.get(CRM_CONFIG.URL.GET_PEYMENT_RECEIPT(id), {
			responseType : 'arraybuffer'
		});
	};
	this.bookingFormPrint = function(id) {
		return $http.get(CRM_CONFIG.URL.GET_BOOKING_FORM(id), {
			responseType : 'arraybuffer'
		});
	};
	this.marriageCerificatePrint = function(id) {
		return $http.get(CRM_CONFIG.URL.GET_MARRIAGE_CERTIFICATE(id), {
			responseType : 'arraybuffer'
		});
	};

})