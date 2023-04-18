var hrmConfig = function() {
	var protocol = "http";
	var host = "localhost";
	var port = "11002";
	var url = protocol + "://" + host + ":" + port;

	return {
		URL : {
			DO_LOGIN : function() {
				return url + "/user/login";
			},
			DO_LOGIN_FOR_SALES_REP : function() {
				return url + "/user/login/salesRep";
			},
			GET_LOCATIONS_VEHICLE_MODELS_BY_EMP_ID:function(employeeId){
				return url +"/employee/"+employeeId+"/locationsAndModels"
			},
			FIND_EMPLOYEE_BY_ID:function(id){
				return url+"/employee/"+id;
			},
			GET_ALL_COUNTRIES : function() {
				return url + "/country/all";
			},

			GET_STATES_BY_COUNTRY_ID : function(countryId) {
				return url + "/country/" + countryId + "/states";
			},

			GET_ALL_DISTRICTS_BY_STATE_ID : function(districtId) {
				return url + "/state/" + districtId + "/districts";
			},
			
		}
	}

};

srmtApp.constant('HRM_CONFIG', hrmConfig());