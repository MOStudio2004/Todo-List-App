//Elements

const inputTask = document.getElementById("task-input");

const addBtn = document.getElementById("add-task-btn");

const ul = document.getElementById("task-list");

const removeBtn = document.getElementById("delete-complete-btn");

const taskNum = document.getElementById("task-count");

const completeTasks = document.getElementById("completed-count");

const allBtn = document.getElementById("All");

const activeBtn = document.getElementById("Active");

const completeBtn = document.getElementById("Completed");

const themeBtn = document.getElementById("theme-btn");


// Add Tasks And Styles 


function updateCounters(){
const tasks = document.querySelectorAll(".task-item");
taskNum.textContent = tasks.length;
const checkBoxes = document.querySelectorAll(".task-checkbox");
let complete = 0;
for (const check of checkBoxes){
    if(check.checked === true){
        complete++
    }
}
completeTasks.textContent = complete;
}

 function addTask(task, completed) {
if (task.trim().length === 0 ){
    return
}
    const li = document.createElement("li");
    li.classList.add("task-item")
    const span = document.createElement("span");
    span.textContent = task;
    span.classList.add("task-text")
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = completed;
    checkBox.classList.add("task-checkbox");
    li.append(checkBox);
    li.append(span);
    ul.append(li);
    updateCounters();
    inputTask.value = "";
    const dele = document.createElement("button");
    dele.classList.add("delete-button");
    const i = document.createElement("i");
    dele.append(i);
    i.classList.add("fa-solid", "fa-trash")
    li.append(dele);
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    const icon = document.createElement("i");
    editBtn.append(icon);
    icon.classList.add("fa-solid", "fa-pencil")
    li.append(editBtn);
    editBtn.addEventListener("click" , () => {
        if (icon.classList.contains("fa-pencil")){
    const currentSpan = li.querySelector(".task-text");
    icon.classList.replace("fa-pencil", "fa-save");
     const editInput = document.createElement("input");
     editInput.classList.add("edit-input");
     editInput.type = "text";
     editInput.value = currentSpan.textContent;
     currentSpan.replaceWith(editInput);
     editInput.addEventListener("keydown" , (e) => {
      if(e.key === "Enter"){
       saveTask();
      }
     })
      }else{
        saveTask ()
      }
    })
    dele.addEventListener("click" , () => {
        ul.removeChild(li);
        updateCounters();
        saveTasks();
    })
    checkBox.addEventListener("change" , () => {
           if (checkBox.checked){
        ul.appendChild(li)
        }
     updateCounters();
     saveTasks();
    })

    function saveTask (){
        const editInput = li.querySelector(".edit-input");
        const spanEdited = document.createElement("span");
        spanEdited.classList.add("task-text");
        spanEdited.textContent = editInput.value;
        editInput.replaceWith(spanEdited);
        saveTasks();
        icon.classList.replace("fa-save", "fa-pencil");
    }
}

function saveTasks(){
    const tasks = document.querySelectorAll(".task-item");
    const tasksArray = [];
    for (const task of tasks){
        const text = task.querySelector(".task-text");
        const checkBox = task.querySelector(".task-checkbox")
        const taskData = {
    text: text.textContent,
    completed: checkBox.checked
};
tasksArray.push(taskData);
    }
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

addBtn.addEventListener("click" , () => {
    addTask(inputTask.value , false);
    saveTasks();
})

inputTask.addEventListener("keydown" , (e) => {
    if (e.key === "Enter"){
    addTask(inputTask.value , false)
    saveTasks();
    }

})

    removeBtn.addEventListener("click" , () => {
        const tasks = document.querySelectorAll(".task-item");
        for(const count of tasks){
             const Box = count.querySelector(".task-checkbox");
             if (Box.checked) {
            ul.removeChild(count);
            
}
        }
        updateCounters();
        saveTasks();
    })

function setActiveButton(button) {
    const filters = document.querySelectorAll(".filter-btn");
    for(const filter of filters){
        filter.classList.remove("btn-active");
    }
    button.classList.add("btn-active");
}

allBtn.addEventListener("click" ,() => {
    setActiveButton(allBtn);
    const tasks = document.querySelectorAll(".task-item");
    for (const task of tasks) {
task.style.display = "flex";
}
})


activeBtn.addEventListener("click" ,() => {
    setActiveButton(activeBtn);
    const tasks = document.querySelectorAll(".task-item");
    for (const task of tasks) {
        const checkBox = task.querySelector(".task-checkbox");
      if(!checkBox.checked){
         task.style.display = "flex";
      }else{
      task.style.display = "none";
      }
      
}
})


completeBtn.addEventListener("click" ,() => {
    setActiveButton(completeBtn);
    const tasks = document.querySelectorAll(".task-item");
    for (const task of tasks) {
        const checkBox = task.querySelector(".task-checkbox");
      if(checkBox.checked){
          task.style.display = "flex";
      }else{
      task.style.display = "none";
      }
}
})



// Save To local Storage
const savedTasks = localStorage.getItem("tasks");

if(savedTasks){
    const tasks = JSON.parse(savedTasks);

    for(const task of tasks){
        addTask(task.text, task.completed);
    }
}

// Theme Mode

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "light"){
    document.body.classList.add("light-mode");
    themeBtn.textContent = "🌙 Dark";
}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        localStorage.setItem("theme","light");
        themeBtn.textContent = "🌙 Dark";

    }else{

        localStorage.setItem("theme","dark");
        themeBtn.textContent = "☀️ Light";

    }

});