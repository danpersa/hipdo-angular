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

  $scope.sortBy = function(sortBy, direction) {
    TasksSortingService.setSorting(sortBy, direction);
    LocationService.updateUrl();
  }
});
