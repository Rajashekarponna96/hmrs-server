angular.module('srmt').service("broadCasteMessagesService",function(HRM_CONFIG,$http){
	
	
	this.addBroadCasteMessage=function(broadCastMessageMaster){
		return $http.post(HRM_CONFIG.URL.ADD_BROADCASTE_MESSAGES(),broadCastMessageMaster)
	}
	this.getBroadCasteMessages=function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_BROADCASTE_MESSAGES(page,size))
	}
	this.updateBroadCasteMessage=function(id,broadCastMessageMaster){
		return $http.put(HRM_CONFIG.URL.UPDATE_BROADCASTE_MESSAGE(id),broadCastMessageMaster)
	}
	this.deleteBroadCasteMessage=function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_BROADCASTE_MESSAGE(id))
	}
	this.BroadCasteMessageCount=function(){
		return $http.get(HRM_CONFIG.URL.GET_BROADCASTE_MESSAGE_COUNT())
	}
	this.searchBroadCasteMessages=function(url){
		return $http.get(HRM_CONFIG.URL.SEARCH_BROADCASTE_MESSAGE_WITH_PAGE_SIZE(url));
	}
	this.searchBroadCasteMessagesCount=function(url){
		return $http.get(HRM_CONFIG.URL.SEARCH_BROADCASTE_MESSAGE_COUNT(url));
	};
	
	this.getCurrentDayMessages = function(){
		return $http.get(HRM_CONFIG.URL.GET_CURRENTDAY_BROADCAST_MESSAGES());
	};
})