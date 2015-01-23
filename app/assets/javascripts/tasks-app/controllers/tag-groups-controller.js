angular.module('tasksApp').controller('TagGroupsController',
  function($scope, $routeParams, LocationService, SelectedTagsService,
    TagGroupsService, TagGroupPanelsService, TasksSortingService) {

  $scope.init = function() {
    var groupKey = $routeParams.groupKey;
    if (groupKey !== undefined && groupKey !== null && groupKey !== '') {
      $scope.tagGroups = TagGroupsService.filterByKey(groupKey);
    } else {
      $scope.tagGroups = TagGroupsService.all();
    }
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

  $scope.removeTagFromGroup = function(tag, groupKey) {
    TagGroupsService.removeTagFromGroup(tag, groupKey)
    this.init();
  }

  $scope.sortByTagGroup = function(groupKey) {
    var dir = TasksSortingService.getDirection();
    if (isGroupTagSortingActive(groupKey) && dir === ASC) {
      TasksSortingService.setSorting(groupKey, DESC);
    } else {
      TasksSortingService.setSorting(groupKey, ASC);
    }
    LocationService.updateUrl();
  }

  $scope.isGroupTagSortingActive = function(groupKey) {
    return isGroupTagSortingActive(groupKey);
  }

  function isGroupTagSortingActive(groupKey) {
    var sortBy = TasksSortingService.getSortBy();
    return sortBy === groupKey;
  }

  $scope.ascendingSortingEnabled = function(groupKey) {
   var sortBy = TasksSortingService.getSortBy();
   var dir = TasksSortingService.getDirection();
   return (sortBy !== groupKey) || ((sortBy === groupKey) && dir !== 'desc');
  }

  $scope.dragControlListeners = {
    accept: function (sourceItemHandleScope, destSortableScope) {
      // allow moving the tag in the same tag group
      if (sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id) {
        return true;
      }

      var movedTag = sourceItemHandleScope.itemScope.modelValue;
      var destinationArray = destSortableScope.modelValue;
      // don't allow if destination has the same tag
      if (destinationArray.indexOf(movedTag) === -1) {
        return true;
      }
      return false;
    }, //override to determine drag is allowed or not. default is true.
    itemMoved: function (event) {//Do what you want
    },
    orderChanged: function(event) {//Do what you want
    }
   //,   containment: '#board'//optional param.
  };
});
