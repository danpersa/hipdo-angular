// tasksApp = angular.module('taksApp', [
//   # additional dependencies here, such as restangular
//   'templates'
// ])
//
// # for compatibility with Rails CSRF protection
// tasksApp.config([
//   '$httpProvider', ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) ->
//     $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
//     ###*
//     Routes and States
//     ###
//     $stateProvider.state "home",
//       url: "/"
//       templateUrl: "home.html"
//       controller: "HomeCtrl"
//
//
//     # default fall back route
//     $urlRouterProvider.otherwise "/"
//
//     # enable HTML5 Mode for SEO
//     $locationProvider.html5Mode true
//     return
// ])
//
// tasksApp.run(->
//   console.log 'angular app running'
// )
//
// # Makes AngularJS work with turbolinks.
// $(document).on 'page:load', ->
//   $('[ng-app]').each ->
//     module = $(this).attr('ng-app')
//     angular.bootstrap(this, [module])

(function() {

  var tasksApp = angular.module('tasksApp', [
    'templates',
    'ngResource',
    'ngRoute'
  ]);

  tasksApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

      $routeProvider.when('/', {
          redirectTo: '/home'
      });

      $routeProvider.when('/home', {
          templateUrl: 'home.html',
          controller: 'HomeController'
      });
    }
  ]);

  tasksApp.controller('HomeController', function($scope) {
    $scope.header = 'The best tasks app';
    $scope.messages = ['M1', 'M2', 'M3'];
  });
})();
