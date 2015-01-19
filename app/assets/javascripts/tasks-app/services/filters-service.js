angular.module('tasksApp').service('FiltersService', function() {

  // past tasks are the one with due date in the past
  this.isShowPastTasks = false;
  // completed tasks are the one marked with completed
  this.isShowCompletedTasks = false;

  this.toggleShowPastTasks = function() {
    this.isShowPastTasks = !this.isShowPastTasks;
  }

  this.toggleShowCompletedTasks = function() {
    this.isShowCompletedTasks = !this.isShowCompletedTasks;
  }

  this.showingPastTasks = function() {
    return this.isShowPastTasks;
  }

  this.showingCompletedTasks = function() {
    return this.isShowCompletedTasks;
  }
});
