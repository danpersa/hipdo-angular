function isFiltered(task, showCompletedTasks, showPastTasks, selectedTags) {
  if ((showCompletedTasks || !isTaskCompleted(task))
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
  return task.completed;
}

function isPastTask(task) {
  return task.dueDate < new Date();
}


function taskString(task) {
  return 'Task id: [' + task.id + '] name: [' + task.name + '] description: ['
    + task.description + '] dueDate: [' + task.dueDate + '] tags: [' + task.tags + ']';
}