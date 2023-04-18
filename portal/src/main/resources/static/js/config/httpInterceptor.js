var srmt = angular.module('srmt');
srmt.config(function($httpProvider) {
	$httpProvider.interceptors.push(function($q, $injector, $localStorage) {

		return {
			request : function(request) {
				console.log('request');
				request.headers.authorization = $localStorage.usrCredentials;
				// $('#loader').show();
				return request;
			},
			// This is the responseError interceptor
			responseError : function(rejection) {
				
				if (rejection.status === 401) {
					console.log("Invalid credentials...");
					$injector.get('$state').transitionTo('login');
				}
				// $('#loader').hide();
				/*
				 * If not a 401, do nothing with this error. This is necessary
				 * to make a `responseError` interceptor a no-op.
				 */
				return $q.reject(rejection);
			},

			response : function(response) {
				// $('#loader').hide();
				return response;
			},
		};
	});
});
