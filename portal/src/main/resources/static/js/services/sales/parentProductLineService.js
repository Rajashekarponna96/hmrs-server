angular.module('srmt').service("parentProductLineService",
		function($http, SALES_CONFIG) {

			this.getAllParentProductlines = function() {
				return $http.get(SALES_CONFIG.URL.GET_PARENT_PRODUCT_LINES());
			};
			
			this.getAllParentProductLinesBySegmentId = function(segmentId){
				return $http.get(SALES_CONFIG.URL.GET_PARENT_PRODUCT_LINES_BY_SEGMENT_ID(segmentId));
			};

			this.addParentProductLine = function(parentProdcutLine) {
				return $http.post(SALES_CONFIG.URL.ADD_PARENT_PRODUCT_LINE(), parentProdcutLine);
			};

			this.updateParentProductLine = function(id, parentProdcutLine) {
				return $http.put(SALES_CONFIG.URL.UPDATE_PARENT_PRODUCT_LINE(id), parentProdcutLine);
			};
			this.getParentProductLinesByLineOfBussiness = function(lobId) {
				return $http.get(SALES_CONFIG.URL.GET_PARENT_PRODUCT_LINE_BY_LINE_OF_BUSSINESS(lobId));
			};


		})