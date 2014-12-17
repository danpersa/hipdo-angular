angular.module('tasksApp').controller('TasksController', function($scope, TasksService, SelectedTagsService, LocationService) {
  $scope.init = function() {
    SelectedTagsService.init();
    var selectedTags = SelectedTagsService.all();
    $scope.tasks = TasksService.byTags(selectedTags);
  }

  $scope.createTask = function() {
    var newTask = TasksService.create({
      name: $scope.taskName,
      description: $scope.taskDescription
    });

    $scope.tasks.unshift(newTask);
    $scope.taskName = "";
    $scope.taskDescription = "";
  }

  $scope.deleteTask = function(task, index) {
    console.log("Delete task index: " + index);
    TasksService.delete(task);
    $scope.tasks.splice(index, 1);
  }

  $scope.updateTaskName = function(task, newTaskName) {
    console.log('Update Task Name: [' + newTaskName + '] old task name: ' + task.name);
    task.name = newTaskName;
    TasksService.update(task);
  }

  $scope.updateDueDate = function(task) {
    TasksService.update(task);
  }

  $scope.updateTaskDescription = function(task, newTaskDescription) {
    console.log('Update Task Description: [' + newTaskDescription + '] old task name: ' + task.description);
    task.description = newTaskDescription;
    TasksService.update(task);
  }

  $scope.navigateToGroupedTasks = function(groupKey) {
    LocationService.groupedTasks(groupKey);
  }
});
