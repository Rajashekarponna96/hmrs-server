angular.module('srmt').service("rentalChargeService",function($http,CRM_CONFIG){
	this.addRentalCharge=function(rentalCharge){
		return $http.post(CRM_CONFIG.URL.ADD_RENTAL_CHARGE(),rentalCharge);
	};
	
	this.getRentalChargeList= function(page,size){
		return $http.get(CRM_CONFIG.URL.GET_RENTAL_CHARGE_LIST(page,size));
	};
	
	this.updateRentalCharge = function(rentalCharge){
		return $http.put(CRM_CONFIG.URL.UPDATE_RENTAL_CHARGE(rentalCharge.id),rentalCharge);
	};
	
	this.getCount = function(){
		return $http.get(CRM_CONFIG.URL.GET_RENTAL_CHARGE_COUNT());
	};
})