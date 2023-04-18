angular.module('srmt').service("organizationService",function(HRM_CONFIG,$http){
	console.log("organizationService called");
	
	
	this.addOrganiZation=function(companyInfo){
		return $http.post(HRM_CONFIG.URL.ADD_ORGANIZATION_DETAILS(),companyInfo)
	}
	
	this.findOrganizationFirst=function(){
		return $http.get(HRM_CONFIG.URL.FIND_ORGANIZATION_BY_FIRST())
	}
	this.updateOrganization=function(companyInfo){
		return $http.put(HRM_CONFIG.URL.UPDATE_ORGANIZATION(companyInfo.id),companyInfo)
	}
})