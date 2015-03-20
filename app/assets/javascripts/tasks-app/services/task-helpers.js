function isFiltered(task, showCompletedTasks, showPastTasks, selectedTags) {
  if ((showCompletedTasks || (!showCompletedTasks && !isTaskCompleted(task)))
    && (showPastTasks || !isPastTask(task))
    && (noTagsSelected(selectedTags) || taskHasSelectedTag(task, selectedTags))) {
    return false;
  }
  return true;
}

function noTagsSelected(selectedTags) {
  return selectedTags.length === 0;
}

function taskHasSelectedTag(task, selectedTags) {
  for (i = 0; i < task.tags.length; ++i) {
    var tag = task.tags[i];
    if (selectedTags.indexOf(tag) != -1) {
      return true;
    }
  }

  return false;
}

function isTaskCompleted(task) {
  return task.completedDate !== undefined && task.completedDate !== null && task.completedDate !== '';
}

function isPastTask(task) {
  return dateOnlyFromString(task.dueDate).isBefore(dateOnlyNow());
}


function taskString(task) {
  return 'Task id: [' + task.id + '] name: [' + task.name + '] description: ['
    + task.description + '] dueDate: [' + task.dueDate + '] tags: [' + task.tags + ']';
}

function dateOnlyFromString(dateOnlyString) {
  return moment(dateOnlyString, 'YYYY-MM-DD');
}

function dateOnlyNowAsString() {
  return dateOnlyNow().format('YYYY-MM-DD');
}

function dateOnlyNow() {
  return moment(moment().format('YYYY-MM-DD'));
}
