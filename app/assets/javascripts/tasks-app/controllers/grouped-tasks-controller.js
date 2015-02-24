angular.module('tasksApp').controller('GroupedTasksController',
  function($scope, $routeParams, GroupedTasksService, SelectedTagsService,
           TagGroupsService, TasksService, FiltersService, FiltersTitleService,
           TasksTitleService) {

  $scope.init = function () {
    SelectedTagsService.init();
    var selectedTags = SelectedTagsService.all();
    var showCompletedTasks = FiltersService.showingCompletedTasks();
    var showPastTasks = FiltersService.showingPastTasks();
    var groupKey = $routeParams.groupKey;
    $scope.groupedTasks = GroupedTasksService.byGroupKey(groupKey, showCompletedTasks, showPastTasks, selectedTags);
    var group = TagGroupsService.get(groupKey);
    $scope.tags = group.tags;
    $scope.taskNames = {};
    $scope.groupName = group.name;
    $scope.showCompletedTasksButtonTitle = FiltersTitleService.showCompletedTasksButtonTitle();
    $scope.showPastTasksButtonTitle = FiltersTitleService.showPastTasksButtonTitle();
    $scope.createTaskPlaceholderTitle = TasksTitleService.createTaskPlaceholderTitle();
    initOffcanvas();
  }

  $scope.createTask = function(tag) {
    var newTask = TasksService.create({
      name: $scope.taskNames[tag],
      tags:  SelectedTagsService.all().concat([tag])
    });

    if (angular.isDefined($scope.groupedTasks[tag])) {
      $scope.groupedTasks[tag].unshift(newTask);
    } else {
      $scope.groupedTasks[tag] = [ newTask ];
    }
    $scope.taskNames[tag] = "";
  }

  $scope.updateDueDate = function(task, index) {
    task.dueDate = Date.parse(task.dueDate);
    TasksService.update(task);
    this.init();
  }

  $scope.deleteTask = function(task, index) {
    console.log("Delete task index: " + index);
    TasksService.delete(task);
    this.init();
  }

  $scope.updateTaskDescription = function(task, newTaskDescription) {
    console.log('Update Task Description: [' + newTaskDescription + '] old task name: ' + task.description);
    task.description = newTaskDescription;
    TasksService.update(task);
  }

  $scope.removeTagFromTask = function(task, index, tag, groupTag) {
    TasksService.removeTagFromTask(task, tag);
    this.init();
  }

  $scope.toggleTaskCompleted = function(task, index) {
    task.completed = !task.completed;
    TasksService.update(task);
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

  $scope.getTagClass = function() {
      return 'label label-success';
  }
});
