angular.module('srmt').service("customerService",function($http,SALES_CONFIG){
	
	this.getCustomers=function(page,size){
		return $http.get(SALES_CONFIG.URL.GET_CUSTOMERS(page,size));
	};
	
	this.addCustomer = function(customer){
		return $http.post(SALES_CONFIG.URL.ADD_CUSTOMER(),customer);
	};
	
	this.updateCustomer = function(id,customerDetail){
		return $http.put(SALES_CONFIG.URL.UPDATE_CUSTOMER(id),customerDetail);
	};
	
	this.getCount=function(){
		return $http.get(SALES_CONFIG.URL.GET_CUSTOMER_COUNT());
	}
	
	this.getPrint=function(customerId){
		return $http.get(SALES_CONFIG.URL.PRINT_CUSTOMER_DETAIL(customerId), {
			responseType : 'arraybuffer'
		})
	}
	
	
})