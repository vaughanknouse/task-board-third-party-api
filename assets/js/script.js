// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks'));
let nextId = JSON.parse(localStorage.getItem('nextId'));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // Get the current timestamp
  const timestamp = new Date().getTime();
  // Generate a random number between 0 and 999
  const randomNum = Math.floor(Math.random() * 1000);
  //Combine timestamp and random number to create a unique ID
  const uniqueID = timestamp + '-' + randomNum;
  return uniqueID;
    }

// Todo: create a function to create a task card
function createTaskCard(task) {
  // Create task card elements
  const taskCard = $('<div>')
      .addClass('card task-card draggable my-3')
      .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  // Add event listener to delete button
  cardDeleteBtn.on('click', handleDeleteTask);

  // Set card background color based on due date; only apply styles if due date exists and status is not 'done'
  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
  
  // If the task is due today, make the card background color yellow; if it is overdue, make the background color red
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white'); // Yellow card for nearing deadline
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white'); // Red cards for overdue
      cardDeleteBtn.addClass('border-light');
    }
  }
  // Append card elements to task card
  cardBody.append(cardDueDate, cardDescription, cardDeleteBtn);
  taskCard.append(cardBody, cardHeader);

  // Return the task card to display later
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

  if (!taskList) {
    taskList = [];
  }

  // Empty existing task cards out of the lanes
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  // Loop through tasks and create cards for each status
  for (let task of taskList) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }

  // Use jQuery UI to make task cards draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    helper: function (e) {
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        maxWidth: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault(); // Prevent form submission
  const task = {
    id: generateTaskId(),
    title: $('#taskTitle').val(),
    description: $('#taskDesription').val(),
    dueDate: $('#taskDueDate').val(),
    status: 'to-do' // Tasks set default to 'to-do' so first goes to 'to-do' lane
  }

  // Add new tasks to task list and save updated task list in localStorage
  taskList.push(task);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList;

  // Clear form inputs
  $('#taskTitle').val('');
  $('#taskDescription').val('');
  $('#taskDueDate').val('');

}
// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Render initial task list
    renderTaskList();

    // Add event listeners


});
