angular.module('srmt').service("featureCategoryService",function($http,HRM_CONFIG){
	this.addFeatureCategory=function(featureCategory){
		return $http.post(HRM_CONFIG.URL.ADD_FEATURE_CATEGORY(),featureCategory)
	}
	this.updateFeatureCategory=function(id,featureCategory){
		return $http.put(HRM_CONFIG.URL.UPDATE_FEATURE_CATEGORY(id),featureCategory);
	};
	this.getFeatureCategories=function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_FEATURE_CATEGORIES(page,size))
	}
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_FEATURE_CATEGORY_COUNT());
	};
	this.getAllFeatureCategories=function(){
		return $http.get(HRM_CONFIG.URL.GET_ALL_FETURE_CATEGORIES());
	};
	
	
})