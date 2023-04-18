var crmConfig = function() {
	var protocol = "http";
	var host = "localhost";
	var port = "11006";
	var url = protocol + "://" + host + ":" + port;

	return {
		URL : {
			ADD_CLIENT : function(){
				return url + "/tdv/Customer/";
			},
			
			GET_SALES_CUSTOMER_LIST : function(page, size){
				return url + "/tdv/Customer/?page=" + page + "&size=" + size;
			},
			
			GET_CUSTOMERS_COUNT : function(){
				return url + "/tdv/Customer/all/count";
			},
			GET_SALES_CUSTOMER_LIST_BY_SALES_REP_ID : function(salesRepId, page, size){
				return url + "/customer/"+salesRepId+"/?page=" + page + "&size=" + size;
			}
		}
	}

};

srmtApp.constant('CRM_CONFIG', crmConfig());