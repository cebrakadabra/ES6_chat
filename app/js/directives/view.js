// OLD ES5 Directive Module
angular.module('chatapp.directives', [])

  // sidebar directive / partial for chat
  .directive('sidebarDirective', function() {
    return {
      templateUrl: 'partials/sidebar.html'
    };
  })

  // on Enter directive for keydown and keypress event on Enter
  .directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
