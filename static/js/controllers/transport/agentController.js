angular.module('srmt').controller(
		"agentController",
		function($scope, $state, $stateParams, controlService,agentService,stationService,
				$localStorage, toaster) {

			$scope.gotoAgentsList = function() {
				$state.go('home.agent.agentList');
			}

			$scope.gotoAddAgentsList= function() {
				$state.go('home.agent.addAgent');
			}
			
			$scope.gotoConfirm=function(agent,station,control){
				agent.station=station;
				agent.control=control;
				$state.go('home.agent.confirmAgent',{
					agent : agent
					
				});
			}
			
			$scope.agentDetail = $stateParams.agent;
			console.log($scope.agentDetail);
			
			
			$scope.gotoUpadeAgentsList = function(agent) {
				$state.go('home.agent.updateAgent', {
					agent : agent
				});
			}

			$scope.gotoViewAgent = function(agent) {
				$state.go('home.agent.viewAgent', {
					agent : agent
				});
			}
			
			$scope.getAgents = function() {

				agentService.getAgentList($scope.page, $scope.size).then(
							function(response) {
								$scope.agentList = response.data;
								$scope.getCount();
							})
				}

			$scope.getControls = function() {
				controlService.getControls().then(function(response) {
					$scope.controlList = response.data;
				})
			}

			$scope.getStations = function(controlId) {
				stationService.getStations(controlId).then(function(response) {
					$scope.stationslist = response.data;
				})
			}

			$scope.addAgent = function(agent) {

			agentService.addAgent(agent.station.id,agent ).then(
						function(response) {
							toaster.success({

								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoAgentsList();
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

			$scope.updateAgent = function(agent) {

				console.log(agent);

				console.log("$scope.agentDetail" + $scope.agentDetail);
				agentService.updateAgent($scope.agentDetail.station.id,
						$scope.agentDetail.id, $scope.agentDetail).then(
						function(response) {
							toaster.success({

								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoAgentsList();
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
			$scope.recordsPerPage = function(PerPage) {
				$scope.page = 0;
				$scope.size = PerPage;
			}

			$scope.$watchGroup([ 'page', 'size' ], function(newVal, oldVal) {
				$scope.searchAgent();
			});

			$scope.getCount = function(CountUrl) {
				agentService.getCount(CountUrl).then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic
			 */

			$scope.searchAgent = function() {
				var url = "?"
					if ($scope.station != undefined) {
						url = url + "stationId=" + $scope.station.id + "&"
					}
					var countUrl = url;
					countUrl = countUrl.substr(0, countUrl.length - 1);
					url = url + "page=" + $scope.page + "&size=" + $scope.size;
					agentService.searchAgent(url).then(function(response) {
						$scope.agentList = response.data;
						$scope.getCount(countUrl);

					})

				}
			$scope.called = function() {
				$scope.station = undefined;
				$scope.searchAgent();
			}

		})