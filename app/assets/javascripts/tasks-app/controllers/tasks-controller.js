angular.module('tasksApp').controller('TasksController',
  function($scope, TasksService, SelectedTagsService, LocationService,
    TasksTitleService, FiltersService, FiltersTitleService, TasksSortingService,
    TagGroupsService) {
  $scope.init = function() {
    SelectedTagsService.init();
    TasksSortingService.init();
    var selectedTags = SelectedTagsService.all();
    var showCompletedTasks = FiltersService.showingCompletedTasks();
    var showPastTasks = FiltersService.showingPastTasks();
    var tsks = TasksService.filter(showCompletedTasks, showPastTasks, selectedTags);
    $scope.tasks = TasksSortingService.sort(tsks);
    $scope.tasksPanelTitle = TasksTitleService.tasksPanelTitle();
    $scope.createTaskPlaceholderTitle = TasksTitleService.createTaskPlaceholderTitle();
    $scope.showCompletedTasksButtonTitle = FiltersTitleService.showCompletedTasksButtonTitle();
    $scope.showPastTasksButtonTitle = FiltersTitleService.showPastTasksButtonTitle();
    $scope.sortedBy = TasksSortingService.getSortBy();
    $scope.sortingDirection = TasksSortingService.getDirection();
    initOffcanvas();
  }

  $scope.createTask = function() {
    if ($scope.taskName === undefined || $scope.taskName === "") {
      return;
    }

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

  $scope.updateDueDate = function(task, index) {
    task.dueDate = Date.parse(task.dueDate);
    TasksService.update(task);
    if (!FiltersService.showingPastTasks() && TasksService.isPastTask(task)) {
      $scope.tasks.splice(index, 1);
    }
  }

  $scope.updateTaskDescription = function(task, newTaskDescription) {
    console.log('Update Task Description: [' + newTaskDescription + '] old task name: ' + task.description);
    task.description = newTaskDescription;
    TasksService.update(task);
  }

  $scope.toggleTaskCompleted = function(task, index) {
    task.completed = !task.completed;
    TasksService.update(task);
    if (!FiltersService.showingCompletedTasks()) {
      $scope.tasks.splice(index, 1);
    }
  }

  $scope.sortBy = function(sortBy, direction) {
    TasksSortingService.setSorting(sortBy, direction);
    LocationService.updateUrl();
  }
});
