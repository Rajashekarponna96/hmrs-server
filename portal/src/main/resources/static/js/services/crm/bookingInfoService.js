angular.module('srmt').service("bookingInfoService",function($http,CRM_CONFIG){
	/*this.BookFunctionhall=function(bookingInfo){
		return $http.post(CRM_CONFIG.URL.BOOK_FUNCTION_HALL(),bookingInfo);
	};*/
	this.BookFunctionhall=function(enquiryId,bookingInfo){
		return $http.post(CRM_CONFIG.URL.BOOK_FUNCTION_HALL(enquiryId),bookingInfo);
	};
	
	this.getAllBookings = function(page,size){
		return $http.get(CRM_CONFIG.URL.GET_ALL_BOOKINGS(page,size));
	};
	this.updateBooking= function(id,bookingInfo){
		return $http.put(CRM_CONFIG.URL.UPDATE_BOOKING(id),bookingInfo);
	};
	
	
	this.getCount = function(dataUrl){
		return $http.get(CRM_CONFIG.URL.SEARCH_BOOKING_INFO_COUNT(dataUrl));
	};
	
	this.searchBookinhInfo=function(dataUrl){
		return $http.get(CRM_CONFIG.URL.SEARCH_BOOKING_INFO(dataUrl));
	}
	this.getEntireBookings=function(){
		return $http.get(CRM_CONFIG.URL.GET_ENTIRE_BOOKINGS());
	}
	
	this.getActiveRateCard=function(bookingId){
		return $http.get(CRM_CONFIG.URL.GET_ACTIVE_RATECARD(bookingId))
	};
	
	this.getBookingObjectByEnquiryId = function(enquiryId){
		return $http.get(CRM_CONFIG.URL.GET_BOOKING_BY_ENQUIRY_ID(enquiryId));
	}
	
	this.getBookingsWithOutInvoice=function(){
		return $http.get(CRM_CONFIG.URL.GET_BOOKINGS_WITH_OUT_INVOICES());
	}
	
	this.searchBookingsWithMarriageDateAndCustomerNumberForMarriageCertificate=function(dataUrl){
		return $http.get(CRM_CONFIG.URL.SEARCH_BOOKINGS_BY_MARRIAGEDATE_AND_CUSTOMER_MOBILE_FOR_MARRIAGE_CERTIFICATE(dataUrl))
	}
	this.marriageCertificateCount=function(countUrl){
		return $http.get(CRM_CONFIG.URL.SEARCH_BOOKINGS_BY_MARRIAGEDATE_AND_CUSTOMER_MOBILE_FOR_MARRIAGE_CERTIFICATE_COUNT(countUrl))
	}
	
})