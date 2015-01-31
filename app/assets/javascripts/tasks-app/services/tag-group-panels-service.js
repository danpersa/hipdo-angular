angular.module('tasksApp').service('TagGroupPanelsService', function(localStorageService) {

  var collapsedTagGroupsFromStorage = localStorageService.get('collapsedTagGroups');

  this.collapsedTagGroups = collapsedTagGroupsFromStorage || {};

  this.toggleTagGroupPanel = function(groupKey) {
    this.collapsedTagGroups[groupKey] = !this.isTagGroupPanelCollapsed(groupKey);
    this.saveToLocalStorage();
  }

  this.isTagGroupPanelCollapsed = function(groupKey) {
    return !(angular.isUndefined(this.collapsedTagGroups[groupKey]) || this.collapsedTagGroups[groupKey] == false);
  }

  this.saveToLocalStorage = function() {
    localStorageService.set('collapsedTagGroups', this.collapsedTagGroups);
  }
});
