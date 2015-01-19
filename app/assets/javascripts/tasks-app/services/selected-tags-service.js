angular.module('tasksApp').service('SelectedTagsService', function($location, $routeParams) {
  this.selectedTags = [];

  this.init = function() {
    if (angular.isDefined($routeParams.tags) && $routeParams.tags !== null && $routeParams.tags !== '' ) {
      this.selectedTags = $routeParams.tags.split(',');
    } else {
      this.selectedTags = [];
    }
    console.log('Selected Tags: [' + this.selectedTags + ']');
  }

  this.toggleTag = function(tag) {
    console.log('Add tag: ' + tag);
    if (!this.isTagSelected(tag)) {
      this.addTag(tag);
    } else {
      this.removeTag(tag);
    }
  }

  this.all = function() {
    return this.selectedTags;
  }

  this.addTag = function(tag) {
    this.selectedTags.push(tag);
  }

  this.isTagSelected = function(tag) {
    return this.selectedTags.indexOf(tag) != -1;
  }

  this.removeTag = function(tag) {
    var index = this.selectedTags.indexOf(tag);
    this.selectedTags.splice(index, 1);
  }

  this.isAnyTagSelected = function() {
    return this.selectedTags.length != 0;
  }
});
