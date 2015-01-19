angular.module('tasksApp').controller('TasksController',
  function($scope, TasksService, SelectedTagsService, LocationService,
    TasksTitleService, FiltersService, FiltersTitleService) {
  $scope.init = function() {
    SelectedTagsService.init();
    var selectedTags = SelectedTagsService.all();
    $scope.tasks = TasksService.byTags(selectedTags);
    $scope.tasksPanelTitle = TasksTitleService.tasksPanelTitle();
    $scope.createTaskPlaceholderTitle = TasksTitleService.createTaskPlaceholderTitle();
    $scope.showCompletedTasksButtonTitle = FiltersTitleService.showCompletedTasksButtonTitle();
    $scope.showPastTasksButtonTitle = FiltersTitleService.showPastTasksButtonTitle();
  }

  $scope.createTask = function() {
    var newTask = TasksService.create({
      name: $scope.taskName,
      description: $scope.taskDescription,
      tags: SelectedTagsService.all()
    });

    $scope.taskName = "";
    $scope.taskDescription = "";
    this.init();
  }

  $scope.toggleShowCompletedTasks = function() {
    FiltersService.toggleShowCompletedTasks();
    this.init();
  }

  $scope.toggleShowPastTasks = function() {
    FiltersService.toggleShowPastTasks();
    this.init();
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

  $scope.toggleTaskCompleted = function(task) {
    task.completed = !task.completed;
    TasksService.update(task);
  }
});
