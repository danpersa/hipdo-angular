angular.module('tasksApp').directive('rendertasks', function() {
  return {
    scope: {
      tasks: '='
    },
    controller: 'RenderTasksController',
    templateUrl: 'render-tasks.html'
  };
});
