var tptConfig = function() {
	var protocol = "http";
	var host = "localhost";
	var port = "11005";
	var url = protocol + "://" + host + ":" + port;

	return {
		URL : {
			
			GET_CONTROL_LIST : function(page, size) {
				return url + "/control/pagination?page=" + page + "&size="
						+ size;
			},
			GET_ALL_CONTROLS : function() {
				return url + "/control/all";
			},
			ADD_CONTROL : function() {
				return url + "/control/";
			},
			UPDATE_CONTROL : function(id) {
				return url + "/control/" + id;
			},
			/*DELETE_CONTROL:function(id){
				return url+"/control/"+id+"/delete"
			},*/

			GET_CONTROLS_COUNT : function() {
				return url + "/control/count";
			},
			GET_CONTROLS : function() {
				return url + "/control/all";
			},
			GET_STATIONS_BY_CONTROL_ID : function(id) {
				return url + "/control/" + id + "/stations";
			},
			GET_ALL_STATIONS : function(id) {
				return url + "/control/" + id + "/stations"
			},
			ADD_STATION : function(id) {
				return url + "/control/" + id + "/station";
			},
			UPDATE_STATION : function(controlId, stationId) {
				return url + "/control/" + controlId + "/station/" + stationId;
			},
			SEARCH_STATIONS : function(dataUrl) {
				return url + "/station/search/" + dataUrl;
			},
			SEARCH_STATION_COUNT : function(CountUrl) {
				return url + "/station/search/count/" + CountUrl;
			},
			GET_AENTS_BY_STATION_ID : function(id) {
				return url + "/station/" + id + "/agents";
			},
			GET_ALL_AGENT : function(id) {
				return url + "/station/" + id + "/agents";
			},
			ADD_AGENT : function(stationId) {
				return url + "/station/" + stationId + "/agent";
			},
			UPDATE_AGENT : function(stationId, agentId) {
				return url + "/station/" + stationId + "/agent/" + agentId;
			},
			SEARCH_AGENTS : function(dataUrl) {
				return url + "/agent/search/" + dataUrl;
			},
			SEARCH_AGENTS_COUNT : function(CountUrl) {
				return url + "/agent/search/count/" + CountUrl;
			}
			

		}
	}

};

app.constant('TPT_CONFIG', tptConfig());
