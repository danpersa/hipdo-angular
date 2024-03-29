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
    'ngRoute',
    'xeditable',
    'ui.sortable',
    'LocalStorageModule'
  ]);

  tasksApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

      $routeProvider.when('/', {
          redirectTo: '/tasks'
      });

      $routeProvider.when('/home', {
          templateUrl: 'home.html',
          controller: 'HomeController'
      });

      $routeProvider.when('/tasks', {
          templateUrl: 'tasks.html',
          controller: 'TasksController'
      });

      $routeProvider.when('/grouped-tasks/:groupKey', {
        templateUrl: 'grouped-tasks.html',
        controller: 'GroupedTasksController'
      })
    }
  ]);

  tasksApp.config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])


  tasksApp.controller('HomeController', function($scope) {
    $scope.header = 'The best tasks app';
    $scope.messages = ['M1', 'M2', 'M3'];
  });


  tasksApp.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  });


})();
