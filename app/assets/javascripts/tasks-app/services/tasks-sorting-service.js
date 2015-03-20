angular.module('tasksApp').service('TasksSortingService',
  function($location, $routeParams, TagGroupsService) {
  this.sortBy = 'default';
  this.direction = ASC;

  this.init = function() {
    if (angular.isDefined($routeParams.sortBy) && $routeParams.sortBy !== null && $routeParams.sortBy !== '' ) {
      this.sortBy = $routeParams.sortBy;
    }
    if (angular.isDefined($routeParams['dir']) && $routeParams['dir'] !== null && $routeParams['dir'] !== '' ) {
      this.direction = $routeParams['dir'];
    }
    console.log('Sort by: [' + this.sortBy + '] dir: [' + this.direction + ']');
  }

  this.sort = function(tasks) {
    var tagGroupKeys = TagGroupsService.keys();

    if (this.sortBy === 'dueDate') {
      var sorting = new Sorting(new SortingByDueDate());
      return sorting.sort(tasks, this.direction);
    }

    console.log('Tag Group Keys: [' + tagGroupKeys + ']');

    if (tagGroupKeys.contains(this.sortBy)) {
      var tagGroup = TagGroupsService.get(this.sortBy);
      var sorting = new Sorting(new SortingByTagGroup(tagGroup));
      return sorting.sort(tasks, this.direction);
    }

    var sorting = new Sorting(new SortingDefault());
    return sorting.sort(tasks, this.direction);
  }

  this.setSorting = function(sortBy, direction) {
    this.sortBy = sortBy;
    this.direction = direction;
  }

  this.getSortBy = function() {
    return this.sortBy;
  }

  this.getDirection = function() {
    return this.direction;
  }
});
