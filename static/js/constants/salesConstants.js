var salesConfig = function() {
	var protocol = "http";
	var host = "localhost";
	var port = "11004";
	var url = protocol + "://" + host + ":" + port;

	return {
		URL : {

			ADD_SHOWROOM : function() {
				return url + "/tdv/ShowRoom/";
			},

			UPDATE_SHOWROOM : function(showroomId) {
				return url + "/tdv/ShowRoom/" + showroomId;
			},

			SEARCH_BY_SHOWROOMCODE_AND_LOCATION : function(dataUrl) {
				return url + "/ShowRoom/search/" + dataUrl;
			},

			GET_SEARCH_BY_SHOWROOMCODE_AND_LOCATION_COUNT : function(countUrl) {
				return url + "/ShowRoom/search/count/" + countUrl;
			},

			ADD_WORKSHOP : function() {
				return url + "/tdv/Workshop/";
			},

			UPDATE_WORKSHOP : function(workshopId) {
				return url + "/tdv/Workshop/" + workshopId;
			},
			SEARCH_WORK_SHOPS : function(dataUrl) {
				return url + "/workshop/search/" + dataUrl;
			},
			SEARCH_WORK_SHOPS_COUNT : function(dataUrl) {
				return url + "/workshop/search/count" + dataUrl;
			},

			ADD_VEHICLE_TYPE : function() {
				return url + "/tdv/VehicleType/";
			},

			GET_ALL_VEHICLETYPES : function() {
				return url + "/tdv/VehicleType/all";
			},

			GET_VEHICLE_CATEGORIES : function() {
				return url + "/tdv/VehicleCategory/all";
			},

			ADD_VEHICLE_CATEGORY : function() {
				return url + "/tdv/VehicleCategory/";
			},

			ADD_VEHICLE : function() {
				return url + "/tdv/VehicleModel/";
			},

			GET_VEHICLE_LIST : function(page, size) {
				return url + "/tdv/Vehicle/?page=" + page + "&size=" + size;
			},

			GET_VEHICLES_COUNT : function() {
				return url + "/tdv/Vehicle/all/count";
			},
			GET_VEHICLE_CATEGORIES_BY_TYPE : function(vehicleTypeId) {
				return url + "/vehicleType/" + vehicleTypeId
						+ "/VehicleCategories";
			},
			UPDATE_VEHICLE_MODEL : function(vehicleModelId) {
				return url + "/tdv/VehicleModel/" + vehicleModelId;
			},

			SEARCH_VEHICLE_MODEL : function(dataUrl) {
				return url + "/VehicleModel/search/" + dataUrl;
			},
			SEARCH_VEHICLE_COUNT : function(dataUrl) {
				return url + "/VehicleModel/search/count" + dataUrl;
			},

			GET_VEHICLE_MODELS : function(page, size) {
				return url + "/tdv/VehicleModel/?page=" + page + "&size="
						+ size;
			},

			UPDATE_VEHICLE_CATEGORY : function(vehicleCategoryId) {
				return url + "/tdv/VehicleCategory/" + vehicleCategoryId;
			},
			GET_VEHICLE_MODELS_FROM_VEHICLE_CATEGORY : function(id) {
				return url + "/vehicleCategory/" + id + "/vehicleModels"
			},
			GET_VEHICLE_MODELS_COUNT : function() {
				return url + "/tdv/VehicleModel/all/count";
			},

			GET_ALL_VEHICLE_COLORS : function() {
				return url + "/tdv/ProductLineColor/all";
			},

			ADD_VEHICLE_COLOR : function() {
				return url + "/tdv/ProductLineColor/";
			},
			GET_SEGMENTS : function() {
				return url + "/tdv/Segment/all"
			},
			ADD_SEGMENT : function() {
				return url + "/tdv/Segment/"
			},
			UPDATE_SEGMENT : function(id) {
				return url + "/tdv/Segment/" + id;
			},
			GET_LINE_OF_BUSSINESS : function() {
				return url + "/tdv/LineOfBusiness/all"
			},
			ADD_LINE_OF_BUSSINESS : function() {
				return url + "/tdv/LineOfBusiness/"
			},
			UPDATE_LINE_OF_BUSSINESS : function(id) {
				return url + "/tdv/LineOfBusiness/" + id;
			},
			GET_PARENT_PRODUCT_LINES : function() {
				return url + "/tdv/ParentProductLine/all";
			},
			ADD_PARENT_PRODUCT_LINE : function() {
				return url + "/tdv/ParentProductLine/";
			},
			GET_PARENT_PRODUCT_LINES_BY_SEGMENT_ID : function(segmentId) {
				return url + "/tdv/Segment/" + segmentId
						+ "/ParentProductLines";
			},
			UPDATE_PARENT_PRODUCT_LINE : function(parentProductLineId) {
				return url + "/tdv/ParentProductLine/" + parentProductLineId;
			},
			GET_ALL_SPECIFICATION_CATEGORIES : function() {
				return url + "/tdv/SpecficationCategory/all"
			},
			ADD_SPECIFICATION_CATEGORY : function() {
				return url + "/tdv/SpecficationCategory/"
			},
			UPDATE_SPECIFICATION_CATEGORY : function(id) {
				return url + "/tdv/SpecficationCategory/" + id;
			},
			GET_PARENT_PRODUCT_LINE_BY_LINE_OF_BUSSINESS : function(lobId) {
				return url + "/tdv/LineOfBusiness/" + lobId + "/ParentProducts";
			},

			GET_PRODUCT_LINES : function(page,size) {
				return url + "/tdv/ProductLine/?page=" + page + "&size=" + size;
			},
			
			GET_PRODUCT_LINE_COUNT : function() {
				return url + "/tdv/ProductLine/all/count";
			},
			ADD_PRODUCT_LINE : function() {
				return url + "/tdv/ProductLine/"
			},
			UPDATE_PRODUCT_LINE : function(id) {
				return url + "/tdv/ProductLine/" + id;
			},

			GET_SPECIFICATION_CATEGORIES : function(productLineId) {
				return url + "/tdv/ProductLine/" + productLineId
						+ "/Categories";
			},
			GET_MODELS : function() {
				return url + "/tdv/Model/all"
			},
			ADD_MODEL : function() {
				return url + "/tdv/Model/"
			},
			UPDATE_MODEL : function(id) {
				return url + "/tdv/Model/" + id;
			},
			GET_MODELS_BY_PARENT_PRODUCT_LINE_ID : function(pplId) {
				return url + "/tdv/ParentProductLine/" + pplId + "/Models";
			},
			GET_CUSTOMERS : function(page, size) {
				return url + "/tdv/Customer/?page=" + page + "&size=" + size;
			},
			ADD_CUSTOMER : function() {
				return url + "/tdv/Customer/"
			},
			UPDATE_CUSTOMER : function(id) {
				return url + "/tdv/Customer/" + id;
			},
			GET_CUSTOMER_COUNT : function() {
				return url + "/tdv/Customer/all/count";
			},

			PRINT_CUSTOMER_DETAIL : function(customerId) {
				return url + "/tdv/report/customer/" + customerId
						+ "/quotation";
			},
			GET_ALL_PRODUCTLINES:function(){
				return url + "/tdv/ProductLine/all"
			},
			UPLOAD_INVOICE : function(){
				return "http://localhost:11002/upload/attendanceUpload";
			}

		}
	}
}

app.constant('SALES_CONFIG', salesConfig());