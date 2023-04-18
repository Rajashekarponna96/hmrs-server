angular.module('srmt').service(
		"districtService",
		function($http, HRM_CONFIG) {

			this.getDistricts = function(id) {
				return $http.get(HRM_CONFIG.URL.GET_ALL_DISTRICT(id))
			}

			this.addDistrict = function(stateId, district) {
				return $http.post(HRM_CONFIG.URL.ADD_DISTRICT(stateId),
						district)
			}

			this.updateDistrict = function(stateId, districtId, district) {
				console.log("district" + angular.toJson(district));
				return $http.put(HRM_CONFIG.URL.UPDATE_DISTRICT(stateId,
						districtId), district)
			}
			
			this.searchDistrict=function(dataUrl){
				return $http.get(HRM_CONFIG.URL.SEARCH_DISTRICTS(dataUrl))
			}
			this.getCount=function(dataUrl){
				return $http.get(HRM_CONFIG.URL.SEARCH_DISTRICTS_COUNT(dataUrl))
			}

		})