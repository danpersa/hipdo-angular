angular.module('tasksApp').service('LocationService',
  function($location, SelectedTagsService, TasksSortingService) {

  this.updateUrl = function() {
    var selectedTags = SelectedTagsService.all();
    var sortBy = TasksSortingService.getSortBy();
    var direction = TasksSortingService.getDirection();
    var url = '?';

    if (selectedTags.length !== 0) {
      url += 'tags=' + selectedTags
    }

    if (sortBy !== null && sortBy !== '' && sortBy !== 'default') {
      url += '&sortBy=' + sortBy;
    }

    if (direction === DESC) {
      url += '&dir=' + direction;
    }

    $location.url(url);
  }

  this.tasks = function() {
    $location.url('/tasks/');
  }

  this.groupedTasks = function(groupKey) {
    $location.url('/grouped-tasks/' + groupKey);
  }
});
