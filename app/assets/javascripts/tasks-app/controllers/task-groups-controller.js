angular.module('tasksApp').controller('TaskGroupsController', function($scope, $location, $routeParams, SelectedTagsService, TagGroupsService) {

  $scope.init = function() {
    $scope.tagGroups = TagGroupsService.all();
    $scope.selectedTags = SelectedTagsService.all();
  }

  $scope.toggleTag = function(tag) {
    SelectedTagsService.toggleTag(tag);
    $scope.updateUrl();
  }

  $scope.updateUrl = function() {
    if ($scope.selectedTags.length == 0) {
      $location.url('/tasks/');
    } else {
      $location.url('/tasks/?tags=' + $scope.selectedTags);
    }
  }

  $scope.isTagActive = function(tag) {
    return SelectedTagsService.isTagSelected(tag);
  }
});
