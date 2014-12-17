angular.module('tasksApp').controller('TaskGroupsController', function($scope, LocationService, SelectedTagsService, TagGroupsService) {

  $scope.init = function() {
    $scope.tagGroups = TagGroupsService.all();
    $scope.selectedTags = SelectedTagsService.all();
  }

  $scope.toggleTag = function(tag) {
    SelectedTagsService.toggleTag(tag);
    LocationService.updateUrl();
  }

  $scope.isTagActive = function(tag) {
    return SelectedTagsService.isTagSelected(tag);
  }
});
