const taskInput = document.getElementById("new-task-input");
const addButton = document.querySelector("#new-task-form .new-task__submit");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");


const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  listItem.className = "todo__item";

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "todo__checkbox";

  const label = document.createElement("label");
  label.innerText = taskString;
  label.className = "todo__label";

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "todo__input-edit";

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "btn todo__btn todo__btn--edit";

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn todo__btn todo__btn--delete";

  const deleteButtonImg = document.createElement("img"); //delete button image
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = "todo__icon";
  deleteButton.appendChild(deleteButtonImg);


  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}


const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";
}


const editTask = function () {
  const listItem=this.parentNode;

  const editInput = listItem.querySelector(".todo__input-edit");
  const label = listItem.querySelector(".todo__label");

  const editBtn = listItem.querySelector(".todo__btn--edit, .todo__btn--save");
  const containsClass = listItem.classList.contains("todo__item--editing");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
    editBtn.classList.remove("todo__btn--save");
    editBtn.classList.add("todo__btn--edit");

  } else {
    editInput.value=label.innerText;
    editBtn.innerText="Save";
    editBtn.classList.remove("todo__btn--edit");
    editBtn.classList.add("todo__btn--save");
  }

  listItem.classList.toggle("todo__item--editing");
};


const  deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}


const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}


addButton.onclick=addTask;
addButton.addEventListener("click",addTask);


const bindTaskEvents = function (taskListItem,checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector(".todo__checkbox");
  const editButton = taskListItem.querySelector(".todo__btn--edit, .todo__btn--save");
  const deleteButton = taskListItem.querySelector(".todo__btn--delete");

  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}


for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}


for (let  i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}