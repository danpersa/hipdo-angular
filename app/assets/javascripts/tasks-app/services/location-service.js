angular.module('tasksApp').service('LocationService', function($location, SelectedTagsService) {

  this.updateUrl = function() {
    var selectedTags = SelectedTagsService.all();
    if (selectedTags.length == 0) {
      $location.url('/tasks/');
    } else {
      $location.url('/tasks/?tags=' + selectedTags);
    }
  }

  this.tasks = function() {
    $location.url('/tasks/');
  }

  this.groupedTasks = function(groupKey) {
    $location.url('/grouped-tasks/' + groupKey);
  }
});
