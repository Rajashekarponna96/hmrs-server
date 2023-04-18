angular.module('srmt').controller(
		"segmentController",
		function($scope, $state, segmentService, $stateParams,
				vehicleTypeService, $localStorage, toaster) {


			$scope.getAllSegments = function() {
				segmentService.getAllSegments().then(
						function(response) {
							$scope.segmentsList = response.data;
						});
			};

			$scope.addSegment = function(segment) {
				segmentService.addSegment(segment)
						.then(function(response) {
							toaster.success({
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.segment={};
							$scope.getAllSegments();
						},

						function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			};
			
			$scope.updateSegment = function(segment) {
				segmentService.updateSegment(segment.id, segment)
						.then(function(response) {
							toaster.success({
								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.segment={};
							$scope.index=false;
						},

						function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			};
			$scope.index=false;
			
			$scope.editSegment=function(segment){
				$scope.index=true;
				$scope.segment=segment;
			
			}
			$scope.data = [
			               {
			            	    "id": 1,
			            	    "title": "node1",
			            	    "nodes": [
			            	      {
			            	        "id": 11,
			            	        "title": "node1.1",
			            	        "nodes": [
			            	          {
			            	            "id": 111,
			            	            "title": "node1.1.1",
			            	            "nodes": []
			            	          }
			            	        ]
			            	      },
			            	      {
			            	        "id": 12,
			            	        "title": "node1.2",
			            	        "nodes": []
			            	      }
			            	    ]
			            	  },
			            	  {
			            	    "id": 2,
			            	    "title": "node2",
			            	    "nodes": [
			            	      {
			            	        "id": 21,
			            	        "title": "node2.1",
			            	        "nodes": []
			            	      },
			            	      {
			            	        "id": 22,
			            	        "title": "node2.2",
			            	        "nodes": []
			            	      }
			            	    ]
			            	  },
			            	  {
			            	    "id": 3,
			            	    "title": "node3",
			            	    "nodes": [
			            	      {
			            	        "id": 31,
			            	        "title": "node3.1",
			            	        "nodes": []
			            	      }
			            	    ]
			            	  }
			            	];
		})