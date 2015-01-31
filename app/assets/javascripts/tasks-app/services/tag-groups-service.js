angular.module('tasksApp').service('TagGroupsService', function(localStorageService) {

  var tagGroupsFromStorage = localStorageService.get('tagGroups');

  this.tagGroups = tagGroupsFromStorage || [
    {
      name: 'Week Days',
      key: 'week-days',
      tags: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    },
    {
      name: 'Priority',
      key: 'priority',
      tags: ['high-priority', 'medium-priority', 'low-priority']
    },
    {
      name: 'Work',
      key: 'work',
      tags: ['angular', 'project-management']
    },
    {
      name: 'Shopping',
      key: 'shopping',
      tags: ['groceries', 'gadgets', 'presents']
    }
  ];

  this.all = function() {
    return this.tagGroups;
  }

  this.filterByKey = function(removedKey) {
    var filtered = [];
    angular.forEach(this.tagGroups, function(tagGroup) {
      if (tagGroup.key !== removedKey) {
        this.push(tagGroup);
      }
    }, filtered);
    return filtered;
  }

  this.removeTagFromGroup = function(tag, groupKey) {
    var tagGroup = this.get(groupKey);
    for (i = 0; i < tagGroup.tags.length; ++i) {
      var t = tagGroup.tags[i];
      if (t === tag) {
        tagGroup.tags.splice(i, 1);
      }
    }
    this.saveToLocalStorage();
  }

  this.create = function(tagGroup) {
    console.log('Create tag group: ' + tagGroup);
    tagGroup.key = toUrlKey(tagGroup.name);
    tagGroup.tags = [];
    this.tagGroups.push(tagGroup);
    this.saveToLocalStorage();
    return tagGroup;
  }

  this.addTagToGroup = function(groupKey, tag) {
    var tagGroup = this.get(groupKey);
    var tagKey = toUrlKey(tag);
    if (tagGroup.tags.indexOf(tagKey) === -1) {
      tagGroup.tags.push(tagKey);
    }
    this.saveToLocalStorage();
  }

  this.get = function(groupKey) {
    var index;
    for (index = 0; index < this.tagGroups.length; ++index) {
      if (this.tagGroups[index].key == groupKey) {
        return this.tagGroups[index];
      }
    }
    return null;
  }

  this.keys = function() {
    var list = Immutable.List();
    var tagGroups = this.tagGroups;
    var result = list.withMutations(function(list) {
      angular.forEach(tagGroups, function(tagGroup) {
        console.log('push key: ' + tagGroup.key);
        this.push(tagGroup.key);
      }, list);
    });
    return result;
  }

  this.saveToLocalStorage = function() {
    localStorageService.set('tagGroups', this.tagGroups);
  }
});
