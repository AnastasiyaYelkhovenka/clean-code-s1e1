//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task-input");
const addButton = document.querySelector("#new-task-form .new-task__submit");
const form = document.getElementById("new-task-form");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");


const createNewTaskElement = function (taskString) {

  const listItem = document.createElement("li");

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
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

const editTask = function () {
    const listItem=this.parentNode;

    const editInput = listItem.querySelector(".todo__input-edit");
    const label = listItem.querySelector(".todo__label");

    const editBtn = listItem.querySelector(".todo__btn--edit, .todo__btn--save");
    const containsClass = listItem.classList.contains("todo__item--editing");
    //If class of the parent is .editmode
    if (containsClass) {

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("todo__item--editing");
};


//Delete task.
const  deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
const taskCompleted = function () {
    //Append the task list item to the #completed-tasks
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function () {
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



// const ajaxRequest = function () {
    // console.log("AJAX Request");
// }

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
// addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents = function (taskListItem,checkBoxEventHandler) {
//select ListItems children
    const checkBox = taskListItem.querySelector(".todo__checkbox");
    const editButton = taskListItem.querySelector(".todo__btn--edit, .todo__btn--save");
    const deleteButton = taskListItem.querySelector(".todo__btn--delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (const i = 0; i < incompleteTaskHolder.children.length; i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (const i = 0; i < completedTasksHolder.children.length; i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.