let form = document.querySelector("#form");
let msg = document.querySelector("#msg");
let textInput = document.querySelector("#textInput");
let textarea = document.querySelector("#textarea");
let tasks = document.querySelector("#tasks");
let add = document.querySelector("#add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  // this is for form valiation
  if (textInput.value === "") {
    msg.innerHTML = "Task cannot be blank";
  } else {
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [];

let acceptData = () => {
  data.push({
    title: textInput.value,
    description: textarea.value,
  });
  localStorage.setItem("data", JSON.stringify(data)); // set data for local storage as well
  createTasks();
  textInput.value = "";
  textarea.value = "";
};

// for creating new task
let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y} class="mt-4">
  <span class="title">${x.title}</span>
  <p class="desc">${x.description}</p>
  <span>
    <button onClick="editTask(this)" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#form">Edit</button>
    <button onClick="deleteTask(this);createTasks()" class="btn btn-danger">Delete</button>
  </span>
</div>
    `);
  });
};

// this is for delete task from doto
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data)); // for deleting localstorage as well
  console.log(data);
};

// this is for an edit todo
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  textarea.value = selectedTask.children[1].innerHTML;

  deleteTask(e);
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTasks();
})();

// this is for an filter the doto list
function myFunction() {
  var input, filter, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();

  parentDiv = document.getElementById("tasks");
  div = parentDiv.getElementsByTagName("div");
  for (i = 0; i < div.length; i++) {
    span = div[i].getElementsByTagName("span")[0];
    txtValue = span.textContent || span.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      div[i].style.display = "";
    } else {
      div[i].style.display = "none";
    }
  }
}
