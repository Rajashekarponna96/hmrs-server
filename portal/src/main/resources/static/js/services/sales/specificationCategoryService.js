angular.module('srmt').service("specificationCategoryService",function($http,SALES_CONFIG){
	
	this.getAllSpecificationCategories=function(){
		return $http.get(SALES_CONFIG.URL.GET_ALL_SPECIFICATION_CATEGORIES());
	};
	
	this.addSpecificationCategory = function(specificationCategory){
		return $http.post(SALES_CONFIG.URL.ADD_SPECIFICATION_CATEGORY(),specificationCategory);
	};
	
	this.updateSpecificationCategory = function(id,specificationCategory){
		return $http.put(SALES_CONFIG.URL.UPDATE_SPECIFICATION_CATEGORY(id),specificationCategory);
	};
	
	
})