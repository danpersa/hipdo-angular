angular.module("tasksApp").service("FiltersTitleService", function(FiltersService) {

  this.showCompletedTasksButtonTitle = function() {
    if (FiltersService.showingCompletedTasks()) {
      return "Hide Completed Tasks";
    }
    return "Show Completed Tasks";
  }

  this.showPastTasksButtonTitle = function() {
    if (FiltersService.showingPastTasks()) {
      return "Hide Past Tasks";
    }
    return "Show Past Tasks";
  }
});
