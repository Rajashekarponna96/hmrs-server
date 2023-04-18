angular.module('srmt').service("locationDepartmentService",function($http,HRM_CONFIG){
	this.addLocationDepartment = function(id,loacationDept){
		return $http.post(HRM_CONFIG.URL.ADD_DEPARTMENT_BY_LOCATION_WISE(id),loacationDept);
	};
	
	this.getLocationDepartments = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_LOCATION_DEPT(page,size));
	};
	this.updateLocationDepartments = function(id,deptId,dept){
		return $http.put(HRM_CONFIG.URL.UPDATE_LOCATION_DEPT(id,deptId),dept);
	};
	
	this.deleteLocationDepartment = function(deptId){
		return $http.delete(HRM_CONFIG.URL.DELETE_LOCATION_DEPT(deptId));
	};
	
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_LOCATION_DEPT_COUNT());
	};
	
	this.getAllLocationDepartments = function(id){
		return $http.get(HRM_CONFIG.URL.GET_ALL_LOCATION_DEPTS(id));
	}
	
});
