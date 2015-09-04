angular.module('Falcon-email').factory('previewRenderSrvc', function ($http) {

	var html = ''
	
	return {
		preview: function (data) {
			return $http({
				url: window.location,
				method: 'POST',
				data: {
					data: data
				},
				headers: {'Content-Type': 'application/json'},
			})
			.then(function (response) {
				return { html: response.data };
        	});
		},

		inline: function(data) {
			return $http({
				url: '/inline',
				method: 'POST',
				data: {
					html: data.html,
					data: data.values
				},
				headers: {'Content-Type': 'application/json'},
			})
			.then(function (response) {
				return { html: response.data }
			})
		}
	}	
});
