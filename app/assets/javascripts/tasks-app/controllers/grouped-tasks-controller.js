angular.module('tasksApp').controller('GroupedTasksController',
function($scope, $routeParams, GroupedTasksService, SelectedTagsService, TagGroupsService, TasksService) {

  $scope.init = function () {
    SelectedTagsService.init();
    var groupKey = $routeParams.groupKey;
    $scope.groupedTasks = GroupedTasksService.byGroupKey(groupKey);
    $scope.tags = TagGroupsService.get(groupKey).tags;
    $scope.taskNames = {};
  }

  $scope.createTask = function(tag) {
    var newTask = TasksService.create({
      name: $scope.taskNames[tag],
      tags: [tag]
    });

    $scope.groupedTasks[tag].unshift(newTask);
    $scope.taskNames[tag] = "";
  }
});
