angular.module('Falcon-email')
	.directive('editor', function (ace, $parse) {
		return {
			scope: {
				onUpdate: '&',
				onReset: '&',
				inlinePreview: '&',
				currentHtml: '='
			},
			templateUrl: '/static/js/editor/editor.directive.html',
			controllerAs: 'vm',
			link: function (scope, element, attrs, ctrl) {
				ace.require("ace/ext/language_tools");
				var editor = ace.edit(
					element.find('.json_editor')[0]
				);
				editor.session.setMode("ace/mode/json");
				editor.setTheme("ace/theme/twilight");

				scope.updatePreview = function() {
					// Parse the value of the element to an obj,
					// that then we pass to the update function.
					var value = JSON.parse(editor.session.getValue());
					scope.onUpdate({
						'$value': value
					})
				}
				scope.clearEditor = function() {
					editor.session.setValue('');
					//element.find('.ace_content').html('');
					scope.onReset({
						'$value': {}
					});
				}
				scope.inlineEmail = function () {
					var values = JSON.parse(editor.session.getValue());
					var html = scope.currentHtml;

					scope.inlinePreview({
						'$value': {
							values: values,
							html: html,
						}
					});
				}

			}
		}
	});