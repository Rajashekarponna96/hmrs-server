angular.module('srmt').service("contactService",function($http,HRM_CONFIG){
	this.addContact=function(id,contact){
		return $http.post(HRM_CONFIG.URL.ADD_CONTACT(id),contact)
	}
	
	this.updateContact=function(id,contact){
		return $http.post(HRM_CONFIG.URL.UPDATE_CONTACT(id),contact)
	}
})