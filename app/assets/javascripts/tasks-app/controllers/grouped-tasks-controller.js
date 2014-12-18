angular.module('tasksApp').controller('GroupedTasksController',
function($scope, $routeParams, GroupedTasksService, SelectedTagsService, TagGroupsService, TasksService) {

  $scope.init = function () {
    SelectedTagsService.init();
    var groupKey = $routeParams.groupKey;
    $scope.groupedTasks = GroupedTasksService.byGroupKey(groupKey);
    $scope.tags = TagGroupsService.get(groupKey).tags;
    $scope.taskNames = {};
    var group = TagGroupsService.get(groupKey);
    $scope.groupName = group.name;
  }

  $scope.createTask = function(tag) {
    var newTask = TasksService.create({
      name: $scope.taskNames[tag],
      tags: [tag]
    });

    if (angular.isDefined($scope.groupedTasks[tag])) {
      $scope.groupedTasks[tag].unshift(newTask);
    } else {
      $scope.groupedTasks[tag] = [ newTask ];
    }
    $scope.taskNames[tag] = "";
  }

  $scope.toggleTaskCompleted = function(task) {
    task.completed = !task.completed;
    TasksService.update(task);
  }
});
