angular.module('srmt').controller(
		"countryController",
		function($scope, $state, countryService, $stateParams, $localStorage,
				toaster) {

			$scope.gotoCountriesList = function() {
				$state.go('home.countryList');
			}

			$scope.PerPage = 10;
			$scope.size = 10;
			$scope.page = 0;
			/**
			 * pagination logic
			 * 
			 * need to count total page in count menthos need to call count() in
			 * data list method.
			 * 
			 * need to call data list methis in $scope.$watchGroup([ 'page',
			 * 'size' ]
			 * 
			 * need to take care about sno neeed to check recods for page need
			 * to check totla records
			 */

			$scope.prevPage = function() {
				if ($scope.page > 0) {
					$scope.page--;
				}
			};

			$scope.prevPageDisabled = function() {
				return $scope.page === 0 ? "disabled" : "";
			};

			$scope.nextPage = function() {
				if ($scope.page < $scope.totalPages - 1) {
					$scope.page++;
				}
			};

			$scope.nextPageDisabled = function() {
				return $scope.page === $scope.totalPages - 1 ? "disabled" : "";
			};

			$scope.firstPage = function() {
				$scope.page = 0;
			};
			$scope.lastPage = function() {
				$scope.page = $scope.totalPages - 1;

			};
			$scope.recordsPerPage = function() {
				$scope.page = 0;
				$scope.size = $scope.PerPage;
			}

			$scope.$watchGroup([ 'page', 'size' ], function(newVal, oldVal) {
				$scope.getCountries();
			});

			$scope.getCount = function() {
				countryService.getCount().then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic
			 */

			$scope.gotoAddCountriesList = function() {
				alert('hhello');
				$state.go('home.addCountry');
			}
			$scope.coutryDetail = $stateParams.country;
			$scope.gotoUpadeCountriesList = function(country) {
				$state.go('home.updateCountry', {
					country : country
				});
			}

			$scope.gotoViewCountry = function(country) {
				$state.go('home.viewCountry', {
					country : country
				})
			}

			$scope.getCountries = function() {
				alert("hhello");
				/*$http.get('http://localhost:8080/RESTfulExample/json/product/get').
		    	 //$http.get('https://35.165.58.240:9443/rrs/api/v1/devices').
		        then(function(response) {
		        	alert("id "+response.data.qty+"name  "+response.data.name);
		           // $scope.greeting = response.data;
		        });*/

				countryService.getCountryList($scope.page, $scope.size).then(
						/*function(){
							alert(response.name);
						}*/
						function(response) {
							$scope.countryList = response.data;
							$scope.getCount();
						})
			}
			$scope.addCountry = function(country) {
				

				countryService.addCountry(country).then(function(response) {
					toaster.success({
						body : 'Added Successfully',
						showCloseButton : true,
						timeout : 4000
					});

					$scope.gotoCountriesList();
				},

				function(error) {
					toaster.pop({
						type : 'error',
						body : error.data.message,
						showCloseButton : true,
						timeout : 4000
					});
				})
			}

			$scope.updateCountry = function(country) {

				countryService.updateCountry(country.id, country).then(
						function(response) {

							toaster.success({
								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoCountriesList();
						},

						function(error) {

							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 8000
							});

						})
			};

			
		})