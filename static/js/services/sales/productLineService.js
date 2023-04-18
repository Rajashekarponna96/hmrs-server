angular.module('srmt').service("productLineService",function($http,SALES_CONFIG){
	
	this.getProductLines=function(page,size){
		return $http.get(SALES_CONFIG.URL.GET_PRODUCT_LINES(page,size));
	};
	
	this.addProductLine = function(productLine){
		return $http.post(SALES_CONFIG.URL.ADD_PRODUCT_LINE(),productLine);
	};
	
	this.updateProductLine = function(id,productLine){
		return $http.put(SALES_CONFIG.URL.UPDATE_PRODUCT_LINE(id),productLine);
	};
	
	this.getSpecificationCategoriesByProductLineId = function(productLineId){
		return $http.get(SALES_CONFIG.URL.GET_SPECIFICATION_CATEGORIES(productLineId));
	};
	
	this.getCount=function(){
		return $http.get(SALES_CONFIG.URL.GET_PRODUCT_LINE_COUNT())
	}
	
	this.getAllProductLines=function(){
		return $http.get(SALES_CONFIG.URL.GET_ALL_PRODUCTLINES());
	}
})