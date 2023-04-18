var crmConfig = function() {
	var protocol = "http";
	var host = "localhost";
	var port = "11006";
	var url = protocol + "://" + host + ":" + port;

	return {
		URL : {
			ADD_FUNCTION_HALL : function() {
				return url + "/ws/FunctionHall/";
			},

			GET_FUNCTION_HALLS : function(page, size) {
				return url + "/ws/FunctionHall?page=" + page + "&size=" + size;
			},

			GET_ALL_FUNCTION_HALLS : function() {
				return url + "/ws/FunctionHall/all";
			},

			UPDATE_FUNCTION_HALL : function(id) {
				return url + "/ws/FunctionHall/" + id;
			},

			// ///////*********FunctionHallEnquiry URls///
			ADD_FUNCTION_HALL_ENQUIRY : function() {
				return url + "/ws/FunctionHallEnquiry/";
			},
			GET_ALL_FUNCTION_HALL_ENQUIRY : function(page, size) {
				return url + "/ws/FunctionHallEnquiry?page=" + page + "&size="
						+ size;
			},
			UPDATE_FUNCTION_HALL_ENQUIRY : function(id) {
				return url + "/ws/FunctionHallEnquiry/" + id;
			},
			// RENTAL_CHARGE_URLs///

			ADD_RENTAL_CHARGE : function() {
				return url + "/ws/RateCard/";
			},
			GET_RENTAL_CHARGE_LIST : function(page, size) {
				return url + "/ws/RateCard?page=" + page + "&size=" + size;
			},
			UPDATE_RENTAL_CHARGE : function(id) {
				return url + "/ws/RateCard/" + id;
			},
			/*
			 * BOOK_FUNCTION_HALL : function() {
			 * 
			 * return url + "/ws/Booking/"; },
			 */

			BOOK_FUNCTION_HALL : function(parentId) {

				return url + "/ws/FunctionHallEnquiry/" + parentId + "/Booking";

			},

			GET_ALL_BOOKINGS : function(page, size) {
				return url + "/ws/Booking?page=" + page + "&size=" + size;
			},
			UPDATE_BOOKING : function(id) {
				return url + "/ws/Booking/" + id;
			},

			// **********hall Room Urls*********

			ADD_HALL_ROOM : function() {
				return url + "/ws/Room/";
			},
			GET_HALL_ROOM_LIST : function(page, size) {
				return url + "/ws/Room?page=" + page + "&size=" + size;
			},
			UPDATE_HALL_ROOM : function(id) {
				return url + "/ws/Room/" + id;
			},
			GET_ENQUIRY_COUNT : function() {
				return url + "/ws/FunctionHallEnquiry/all/count";
			},

			GET_HALLROOM_COUNT : function() {
				return url + "/ws/Room/all/count";
			},

			// ********payment URLS

			PAY_PAYMENT : function() {
				return url + "/ws/Payment/";
			},
			GET_PAYMENTS : function(page, size) {
				return url + "/ws/Payment?page=" + page + "&size=" + size;
			},
			GET_PAYMENT_COUNT : function() {
				return url + "/ws/Payment/all/count";
			},

			GET_RENTAL_CHARGE_COUNT : function() {
				return url + "/ws/RateCard/all/count";
			},
			// report URL
			GET_RENTAL_CHARGES : function() {
				return url + "/reports/rentalCharges";
			},
			GET_PEYMENT_RECEIPT : function(id) {
				return url + "/reports/receiptGeneration/" + id;
			},
			GET_BOOKING_FORM : function(id) {
				return url + "/reports/bookingform/" + id;
			},
			GET_MARRIAGE_CERTIFICATE : function(id) {
				return url + "/reports/booking/" + id + "/marriageCertificate";
			},
			SEARCH_ENQUIRY : function(dataUrl) {
				return url + "/FunctionHallEnquiry/search/" + dataUrl;
			},
			SEARCH_ENQUIRYCOUNT : function(dataUrl) {
				return url + "/FunctionHallEnquiry/search/count" + dataUrl;
			},
			SEARCH_PAYMENT : function(dataUrl) {
				return url + "/Payment/search/" + dataUrl;
			},
			SEARCH_PAYMENT_COUNT : function(dataUrl) {
				return url + "/Payment/search/count" + dataUrl;
			},
			GET_FUNCTION_HALL_EVENTS_BY_DATE : function(date) {
				return url + "/FunctionHallEnquiry/byDate?date=" + date;
			},

			GET_FUNCTION_HALL_EVENTS_BY_MONTH : function(date) {
				return url + "/FunctionHallEnquiry/byMonth?date=" + date;
			},
			SEARCH_BOOKING_INFO : function(dataUrl) {
				return url + "/booking/search/" + dataUrl;
			},
			SEARCH_BOOKING_INFO_COUNT : function(dataUrl) {
				return url + "/booking/search/count" + dataUrl;
			},
			SEARCH_BY_RECEIPT_ID_AND_DATE : function(dataUrl) {
				return url + "/Payment/searchByRecieptIdAndDate" + dataUrl;
			},
			GET_COUNT_BY_RECEIPT_ID_AND_DATE : function(countUrl) {
				return url + "/Payment/searchByRecieptIdAndDate/count"
						+ countUrl;
			},
			PRINT_MARRIAGE_CERTIFICATE : function(id) {
				return url + "/reports/bookingform/" + id;
			},

			SEARCH_BOOKING_SUMMARY : function(dataUrl) {
				return url + "/booking/bookingsummary/" + dataUrl;
			},

			GET_BOOKING_SUMMARY_COUNT : function(countUrl) {
				return url + "/booking/bookingsummary/count/" + countUrl;
			},
			GET_REPORT_FOR_BOOKING_SUMMARY : function(dataUrl) {
				return url + "/reports/BookingSummary/" + dataUrl;
			},

			GET_INVOICE : function(page, size) {
				return url + "/ws/Invoice/?page=" + page + "&size=" + size;
			},
			ADD_INVOICE : function() {
				return url + "/invoice/";
			},
			UPDATE_INVOICE : function() {
				return url + "/ws/Invoice/" + id;
			},
			GET_ENTIRE_BOOKINGS : function() {
				return url + "/ws/Booking/all"
			},
			GET_INVOICE_COUNT : function() {
				return url + "/ws/Invoice/all/count";
			},

			GENERATE_INVOICE : function(invoiceId) {
				return url + "/reports/invoice/?invoiceId=" + invoiceId;
			},
			GET_ACTIVE_RATECARD : function(bookingId) {
				return url + "/booking/activeRateCard/" + bookingId;
			},
			DELETE_HALL_ROOM : function(id) {
				return url + "/room/" + id;
			},
			GET_BOOKING_BY_ENQUIRY_ID : function(enquiryId) {
				return url + "/booking/" + enquiryId + "/enquiry";
			},
			GET_ALL_ENQUIRIES_SORT_BY_DATE : function(page, size) {
				return url + "/FunctionHallEnquiry/allSortByDate?page=" + page
						+ "&size=" + size;
			},
			GET_BOOKINGS_WITH_OUT_INVOICES : function() {
				return url + "/booking/bookingsWithOutInvoices"
			},
			SEARCH_BOOKINGS_BY_MARRIAGEDATE_AND_CUSTOMER_MOBILE_FOR_MARRIAGE_CERTIFICATE : function(
					dataUrl) {
				return url + "/booking/search/marriageCertificate/" + dataUrl;
			},
			SEARCH_BOOKINGS_BY_MARRIAGEDATE_AND_CUSTOMER_MOBILE_FOR_MARRIAGE_CERTIFICATE_COUNT : function(
					countUrl) {
				return url + "/booking/search/marriageCertificate/count/"
						+ countUrl;
			},
			
		}
	}
}

app.constant('CRM_CONFIG', crmConfig());