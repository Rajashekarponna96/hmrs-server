angular.module('srmt').service("agentService",function($http,TPT_CONFIG){
	
	this.getAgents = function(id) {
		return $http.get(TPT_CONFIG.URL.GET_ALL_AGENT(id))
	}

	this.addAgent = function(stationId, agent) {
		return $http.post(TPT_CONFIG.URL.ADD_AGENT(stationId),
				agent)
	}

	this.updateAgent = function(stationId, agentId, agent) {
		console.log("agent" + angular.toJson(agent));
		return $http.put(TPT_CONFIG.URL.UPDATE_AGENT(stationId,
				agentId), agent)
	}
	
	this.searchAgent=function(dataUrl){
		return $http.get(TPT_CONFIG.URL.SEARCH_AGENTS (dataUrl))
	}
	this.getCount=function(dataUrl){
		return $http.get(TPT_CONFIG.URL.SEARCH_AGENTS_COUNT(dataUrl))
	}
})