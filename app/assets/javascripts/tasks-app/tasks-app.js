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
    'xeditable'
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

      $routeProvider.when('/tasks', {
          templateUrl: 'tasks.html',
          controller: 'TasksController'
      });
    }
  ]);

  tasksApp.controller('HomeController', function($scope) {
    $scope.header = 'The best tasks app';
    $scope.messages = ['M1', 'M2', 'M3'];
  });



  tasksApp.service('TasksService', function() {
    this.tasks = [
      {
        id: 1,
        name: 'Preprare for your birthday',
        description: 'Buy presents for christmas',
        dueDate: new Date(2015, 1, 3, 0, 0, 0, 0),
        tags: ['monday', 'shopping']

      },
      {
        id: 2,
        name: 'Solve the car insurance papers',
        description: '',
        dueDate: new Date(2014, 12, 23, 0, 0, 0, 0),
        tags: ['tuesday', 'shopping', 'car']

      },
      {
        id: 3,
        name: 'Buy presents for Christmas',
        description: 'Buy presents for christmas',
        dueDate: new Date(2014, 12, 22, 0, 0, 0, 0),
        tags: ['tuesday', 'shopping']
      }
    ];

    this.currentId = 5;

    this.all = function() {
      return this.tasks;
    }

    this.filterByTag = function(selectedTags) {
      if (selectedTags.length === 0) {
        return this.tasks;
      }
      var filteredTasks = [];
      angular.forEach(this.tasks, function(task) {
        var b = false;
        angular.forEach(task.tags, function(tag) {
          if (selectedTags.indexOf(tag) != -1) {
            b = true;
          }
        });
        if (b) {
          this.push(task);
        }
      }, filteredTasks);
      return filteredTasks;
    }

    this.create = function(task) {
      console.log('Create ' + taskString(task));
      task.id = this.currentId;
      this.currentId = this.currentId + 1;
      return task;
    }

    this.delete = function(task) {
      console.log('Delete ' + taskString(task));
    }

    this.update = function(task) {
      console.log('Update ' + taskString(task));
    }
  });


  tasksApp.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  });

  function taskString(task) {
    return 'Task id: [' + task.id + '] name: [' + task.name + '] description: [' + task.description + '] dueDate: [' + task.dueDate + ']';
  }

})();
