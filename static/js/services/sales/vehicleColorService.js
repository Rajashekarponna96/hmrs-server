angular.module('srmt').service(
		"vehicleColorService",
		function($http, SALES_CONFIG) {

			this.getVehicleColors = function() {
				return $http.get(SALES_CONFIG.URL.GET_ALL_VEHICLE_COLORS());
			};

			this.addVehicleColor = function(vehicleColor) {
				return $http.post(SALES_CONFIG.URL.ADD_VEHICLE_COLOR(),
						vehicleColor);
			};

		})