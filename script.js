const todo = document.getElementById("todo");
const addTaskBtn = document.getElementById("addtask-btn");
const taskContainer = document.getElementById("tasks-container");

const taskData = JSON.parse(localStorage.getItem("task"))||[]; //array for storing todo tasks
let currentData = {}

//check for user input
const checkTaskInput = () => {
    if(todo.value===""){
        alert("Please input a task!")
    }
    else{
        addTask();
    }
}

//add a task to taskData array
const addTask = () => {
    const taskItem = {
        id: `${Date.now()}`,
        title: todo.value
    };

    const taskItemIndex = taskData.findIndex((item)=>item.id===currentData.id)
    if(taskItemIndex===-1){
        taskData.unshift(taskItem);
    }
    else{
        taskData[taskItemIndex] = taskItem
    }
    //save to localstorage
    localStorage.setItem("task", JSON.stringify(taskData));
    updateTaskContainer();
    reset();
}

const updateTaskContainer = () => {
    taskContainer.innerHTML = "";

    //add dynamic element
    taskData.forEach(({id, title}) => {
        taskContainer.innerHTML += 
        `<div class="todo-item" id="${id}">
            <label>${title}</label>
            <button class="btn" type="button" onclick="doneTask(this)">Mark as Done</button>
            </div>
        </div>`
    });
}   

//check if there are items in the localstorage
if(taskData.length){
    updateTaskContainer()
}

const resetInput = () => {
    todo.value = "";
}

const doneTask = (buttonEl) => {
    const taskDataIndex = taskData.findIndex((item)=>item.id===buttonEl.parentElement.id)

    currentData = taskData[taskDataIndex];
    buttonEl.parentElement.remove();
    taskData.splice(taskDataIndex, 1);
    localStorage.setItem("task", taskData)
}

addTaskBtn.addEventListener("click", checkTaskInput)