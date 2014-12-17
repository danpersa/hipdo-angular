angular.module('tasksApp').service('LocationService', function($location, SelectedTagsService) {

  this.updateUrl = function() {
    var selectedTags = SelectedTagsService.all();
    if (selectedTags.length == 0) {
      $location.url('/tasks/');
    } else {
      $location.url('/tasks/?tags=' + selectedTags);
    }
  }
});
