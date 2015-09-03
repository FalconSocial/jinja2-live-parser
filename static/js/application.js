angular.module('Falcon-email', [])
	.controller('app', function ($scope, previewRenderSrvc){

		$scope.html = {}

		$scope.updateRender = function (value) {
			previewRenderSrvc.preview(value).then(function (data) {
 				$scope.render = data.html;
 			});
		}

		$scope.inlineEmail = function (value) {
			previewRenderSrvc.inline(value)
				.then(function (data) {
					$scope.render = data.html
				})
		}
		
		//Initialize the template with no data.
		$scope.updateRender({})
	});