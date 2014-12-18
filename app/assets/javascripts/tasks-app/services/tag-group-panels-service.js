angular.module('tasksApp').service('TagGroupPanelsService', function() {

  this.collapsedTagGroups = {}

  this.toggleTagGroupPanel = function(groupKey) {
    this.collapsedTagGroups[groupKey] = !this.isTagGroupPanelCollapsed(groupKey)
  }

  this.isTagGroupPanelCollapsed = function(groupKey) {
    return !(angular.isUndefined(this.collapsedTagGroups[groupKey]) || this.collapsedTagGroups[groupKey] == false);
  }
});
