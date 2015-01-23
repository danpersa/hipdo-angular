var ASC = 'asc';
var DESC = 'desc';

var Sorting = function(sortingStrategy) {
  this.sortingStrategy = sortingStrategy;
}

Sorting.prototype = {
  setStrategy: function(sortingStrategy) {
    this.sortingStrategy = sortingStrategy;
  },
  /* tasks: the list of tasks to be sorted
     dir: the sorting direction
  */
  sort: function(tasks, dir) {
    return this.sortingStrategy.sort(tasks, dir);
  }
};

var SortingByTagGroup = function(tagGroup) {

  this.sort = function(tasks, dir) {
    console.log('Sorting By Tag Group ' + dir);
    function createComparisonMap(tagGroup) {
      var comparisonEmptyMap = Immutable.Map();

      var comparisonMap = comparisonEmptyMap.withMutations(function(map) {
        for (i = 0; i < tagGroup.tags.length; ++i) {
          var tag = tagGroup.tags[i];
          map.set(tag, i);
        }
      });

      return comparisonMap;
    }

    var comparisonMap = createComparisonMap(tagGroup);
    console.log('comparison map: [' + comparisonMap.toMap().toString() + ']');
    var keySet = Immutable.OrderedSet(comparisonMap.keys());
    console.log('key set: [' + keySet.toArray().toString()) + ']';

    function getFirstCommonTag(keySet, tagArray) {
      var intersection = keySet.intersect(tagArray);
      var tag = intersection.first();
      console.log('First common tag: [' + tag + ']');
      return tag;
    }

    function compare(task1, task2) {
      var task1Tag = getFirstCommonTag(keySet, task1.tags);
      var task2Tag = getFirstCommonTag(keySet, task2.tags);
      console.log('Compare [' + task1Tag + '] with [' + task2Tag + ']');
      console.log('Compare [' + comparisonMap.get(task1Tag) + '] with [' +  comparisonMap.get(task2Tag) + ']');
      var result = comparisonMap.get(task1Tag) > comparisonMap.get(task2Tag);
      return dir === DESC ? !result : result;
    }

    return tasks.sort(compare);
  }
};

var SortingByDueDate = function() {

  this.sort = function(tasks, dir) {
    console.log('Sorting By Due Date ' + dir);

    function compare(task1, task2) {
      var result = task1.dueDate > task2.dueDate;
      return dir === DESC ? !result : result;
    };

    return tasks.sort(compare);
  }
}

var SortingDefault = function() {

  this.sort = function(tasks, dir) {
    console.log('Sorting Default ' + dir);
    return dir === DESC ? tasks.reverse() : tasks;
  }
}