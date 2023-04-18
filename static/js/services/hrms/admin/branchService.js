angular.module('srmt').service("branchService", function(HRM_CONFIG, $http) {
	this.addBranch = function(id, branchMaster) {
		return $http.post(HRM_CONFIG.URL.ADD_BRANCH(id), branchMaster);
	};
	this.getRegionalOfficeList = function() {
		return $http.get(HRM_CONFIG.URL.GET_REGIONALOFFICE_LIST());
	};
	this.getBranches = function(page, size) {
		return $http.get(HRM_CONFIG.URL.GET_BRANCHES(page, size));
	};
	this.searchRegistrationOfficeByBranchIdAndOfficeIdCount = function(url) {
		return $http.get(HRM_CONFIG.URL.SEARCH_BY_BRANCH_ORGANIZATION_COUNT(url));
	};
	this.searchRegistrationOfficeByBranchIdAndOfficeId = function(url) {
		return $http.get(HRM_CONFIG.URL.SEARCH_BY_BRANCH_ORGANIZATION(url));
	};
	this.deleteBranch=function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_BRANCH(id));
	}
	this.updateBranch=function(id,branchId,branchMaster){
		return $http.put(HRM_CONFIG.URL.UPDATE_BRANCH(id,branchId),branchMaster);
	}
})