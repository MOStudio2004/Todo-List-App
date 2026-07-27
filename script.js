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

const listBtn = document.getElementById("list-btn");

const notesBtn = document.getElementById("notes-btn");

const para = document.querySelector(".subtitle");

const title = document.querySelector(".title")

const toDoList = document.querySelector(".to-do-list");

const notesScreen = document.getElementById("notes-screen");

const noteEdit = document.getElementById("note-editor");

const addNoteBtn = document.getElementById("add-note-btn");

const saveBtn = document.getElementById("save-btn");

const editor = document.getElementById("editor");

const notesContainer = document.getElementById("notes-container");

const boldBtn = document.getElementById("bold-btn");

const italicBtn = document.getElementById("italic-btn");

const underlineBtn = document.getElementById("underline-btn");

const colorChange = document.getElementById("color-input");

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
    const checkSound = new Audio("./check.mp3");
    if (checkBox.checked){
        checkSound.currentTime = 0;
        checkSound.play();
    }
    if (checkBox.checked){
        ul.appendChild(li);
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

//Notes Section

let currentNoteId = null;

// show note screen and edit notes and remove notes
function activeButton (navigate){
    const navLinks = document.querySelectorAll(".links");
    for(const link of navLinks){
        link.classList.remove("links-active");
    }
    navigate.classList.add("links-active");
}


notesBtn.addEventListener("click" , () => {
   para.classList.add("hidden");
   title.textContent = "Notes";
   toDoList.classList.add("hidden");
   notesScreen.classList.remove("hidden");
   activeButton(notesBtn);
})

function showScreen(screen) {

    toDoList.classList.add("hidden");
    notesScreen.classList.add("hidden");
    noteEdit.classList.add("hidden");

    screen.classList.remove("hidden");
}

function renderNotes() {

    notesContainer.innerHTML = "";

    for (const note of notes) {

        const noteCard = document.createElement("div");

        noteCard.classList.add("note-card");

        noteCard.innerHTML = note.content;

        notesContainer.append(noteCard);

    const deleteNote = document.createElement("button");
    deleteNote.classList.add("delete-button");
    const i = document.createElement("i");
    deleteNote.append(i);
    i.classList.add("fa-solid", "fa-trash")
    noteCard.append(deleteNote);

    deleteNote.addEventListener("click" , (e) => {
         e.stopPropagation();
      notes = notes.filter(currentNote => {

        return currentNote.id !== note.id;

    });
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
    })

    noteCard.addEventListener("click" , () => {
        currentNoteId = note.id;
         editor.innerHTML = note.content;
          showScreen(noteEdit);
    })
    }
}

// navigate from to do list to notes

listBtn.addEventListener("click", () => {
    title.textContent = "TO DO LIST";
    para.classList.remove("hidden");

    showScreen(toDoList);
    activeButton(listBtn);
});


// add note
addNoteBtn.addEventListener("click", () => {

    currentNoteId = null;

    editor.innerHTML = "";

    showScreen(noteEdit);

    editor.focus();


});
let notes = JSON.parse(localStorage.getItem("notes")) || [];

renderNotes();


// save note
saveBtn.addEventListener("click", () => {

    if (editor.innerHTML.trim() === "") {
    return;
}else if (currentNoteId === null) {

        const note = {
            id: Date.now(),
            content: editor.innerHTML,
            createdAt: new Date().toLocaleDateString()
        };

        notes.push(note);

    } else {

        const note = notes.find(note => note.id === currentNoteId);

        note.content = editor.innerHTML;

    }

    localStorage.setItem("notes", JSON.stringify(notes));

    renderNotes();

    showScreen(notesScreen);

    editor.innerHTML = "";

    currentNoteId = null;

});


// TOOL BAR


boldBtn.addEventListener("click", () => {

    editor.focus();

    document.execCommand("bold");

});


italicBtn.addEventListener("click", () => {
    editor.focus();
    document.execCommand("italic");
});


underlineBtn.addEventListener("click", () => {

    editor.focus();

    document.execCommand("underline");
});


colorChange.addEventListener("input", () => {

    editor.focus();

    document.execCommand("foreColor", false, colorChange.value);
});


