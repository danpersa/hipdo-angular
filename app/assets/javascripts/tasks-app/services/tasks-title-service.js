angular.module('tasksApp').service('TasksTitleService', function(SelectedTagsService) {

  this.tasksPanelTitle = function() {
    var title =  "Your tasks";
    if (SelectedTagsService.isAnyTagSelected()) {
      title += " with the " + commaSeparatedSelectedTags() + " tags";
    }
    return title;
  }

  this.createTaskPlaceholderTitle = function() {
    var title = "Create task";
    if (SelectedTagsService.isAnyTagSelected()) {
      title += " with the " + commaSeparatedSelectedTags() + " tags";
    }
    return title;
  }

  function commaSeparatedSelectedTags() {
    var selectedTags = SelectedTagsService.all();
    return selectedTags.join(", ");
  }
});
