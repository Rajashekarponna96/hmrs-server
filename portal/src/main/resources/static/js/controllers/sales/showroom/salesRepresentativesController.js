angular.module('srmt').controller(
				"salesRepresentativesController",
				function($scope, $state,$stateParams,employeeService,$localStorage,salesRepresentataiveService,personalService,toaster) {

					$scope.gotoSalesresentativeList = function() {
						$state.go('home.salerepresentative.salerepresentativeslist');
					}

					$scope.gotoAddSalesRepresentative = function() {
						$state.go('home.salerepresentative.addSalerepresentative');
					}
					$scope.employee=$stateParams.salesRepresentative;
					console.log($scope.employee);
					$scope.gotoUpadeSalesRepresentative= function(salesRepresentative){
						$state.go('home.salerepresentative.updateSalerepresentative',{
							salesRepresentative:salesRepresentative
						});
					}
					
					$scope.gotoViewSalesRepresentative= function(salesRepresentative) {
						$state.go('home.salerepresentative.viewSalerepresentative',{
							salesRepresentative:salesRepresentative
						});
					}
					$scope.getAllActiveEmployees=function(){
						employeeService.getAllActiveEmployees().then(function(response){
							$scope.employeeList=response.data;
							
							
						})
					}
			
					
					
					
					$scope.getSuperior=function(employeeId){
						employeeService.getSuperior(employeeId).then(function(response){
							$scope.superior=response.data;
							$scope.superiorName=$scope.superior.fullName;
						})
					}
					
	 				$scope.getAllSalesManagers=function(){
						employeeService.getAllSalesManagers().then(function(response){
							$scope.salesManagers=response.data;
						})
					}
	 				
	 				$scope.getAllSalesRepresentatives=function(){
						employeeService.getAllSalesRepresentatives().then(function(response){
							$scope.salesRepresentativeList=response.data;
						})
					}
					
					$scope.updatePerson = function(person) {
						personalService.updatePerson(person.id, person).then(
								function(response) {
									toaster
									.success({
									
										body : 'Saved Successfully',
										showCloseButton : true,
										timeout : 4000
									});
									$scope.gotoSalesresentativeList();
									personalService.setEmployeee(response.data);
									console.log(personalService.getEmployee());

								}, function(error) {
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});
								})

					}
					
					$scope.size = 10;
					$scope.page = 0;
					/**
					 * pagination logic
					 * 
					 * need to count total page in count menthos need to call
					 * count() in data list method.
					 * 
					 * need to call data list methis in $scope.$watchGroup([
					 * 'page', 'size' ]
					 * 
					 * need to take care about sno neeed to check recods for
					 * page need to check totla records
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
						$scope.searchSalesRepresntative();
					});

					$scope.getCount = function(url) {
						salesRepresentataiveService.getCount(url).then(function(response) {
							$scope.count = response.data;
							$scope.totalPages = Math.ceil($scope.count / $scope.size);
						});
					};

					/**
					 * pagination logic
					 */
					
					
					$scope.searchSalesRepresntative=function(){
						var url="?"
						if($scope.employee!=undefined){
							url=url+"salesRepCode="+$scope.employee.salesRepCode+"&";
						}
						if($scope.mobile!=undefined){
							url=url+"mobile="+$scope.mobile;
						}
						var countUrl=url;
						countUrl=countUrl.substr(countUrl,countUrl.length-1);
						url=url+"&page="+$scope.page+"&size="+$scope.size;
						salesRepresentataiveService.searchSalesRepresntative(url).then(function(response){
							$scope.salesRepresentativeList=response.data;
							$scope.getCount(countUrl);
						})
					}

					
				})