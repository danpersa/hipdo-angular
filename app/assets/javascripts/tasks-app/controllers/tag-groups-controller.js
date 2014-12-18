angular.module('tasksApp').controller('TagGroupsController',
  function($scope, LocationService, SelectedTagsService, TagGroupsService, TagGroupPanelsService) {

  $scope.init = function() {
    $scope.tagGroups = TagGroupsService.all();
    $scope.selectedTags = SelectedTagsService.all();
    $scope.tagNames = {};
  }

  $scope.toggleTag = function(tag) {
    SelectedTagsService.toggleTag(tag);
    LocationService.updateUrl();
  }

  $scope.isTagActive = function(tag) {
    return SelectedTagsService.isTagSelected(tag);
  }

  $scope.navigateToGroupedTasks = function(groupKey) {
    LocationService.groupedTasks(groupKey);
  }

  $scope.createTagGroup = function() {
    var newTagGroup = TagGroupsService.create({
      name: $scope.tagGroupName
    });
    $scope.tagGroupName = "";
  }

  $scope.addTagToGroup = function(groupKey) {
    TagGroupsService.addTagToGroup(groupKey, $scope.tagNames[groupKey]);
    $scope.tagNames[groupKey] = "";
  }

  $scope.toggleTagGroupPanel = function(groupKey) {
    TagGroupPanelsService.toggleTagGroupPanel(groupKey);
  }

  $scope.isTagGroupPanelCollapsed = function(groupKey) {
    return TagGroupPanelsService.isTagGroupPanelCollapsed(groupKey);
  }
});
