//todo 완료 / 미완료 변경 기능은 따로 challenge 구현하면서 만들어 놓았음. 

const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");

const pendingList = document.querySelector(".js-toDoPending");
const finishedList = document.querySelector(".js-toDoFinished");

//LocalStorage key name
const PENDING_LS = "toDos";
const FINISHED_LS = "finished";

//objects
let pendings = [];
let finisheds = [];

function saveToDos() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finisheds));
}

function deleteToDo1(event) {
  const btn = event.target;
  const li = btn.parentNode;

  pendingList.removeChild(li);

  const cleanToDos = pendings.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pendings = cleanToDos;
  saveToDos();
}

function deleteToDo2(event) {
  const btn = event.target;
  const li = btn.parentNode;

  finishedList.removeChild(li);

  const cleanToDos = finisheds.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finisheds = cleanToDos;
  saveToDos();
}

function finishToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  pendingList.removeChild(li);

  const cleanToDos = pendings.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pendings = cleanToDos;

  paintFinish(li.querySelector("span").innerText);
}

function returnToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  finishedList.removeChild(li);

  const cleanToDos = finisheds.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finisheds = cleanToDos;

  paintToDo(li.querySelector("span").innerText);
}

function paintFinish(text) {
  const toDoItem = document.createElement("li");
  const delBtn = document.createElement("button");
  const returnBtn = document.createElement("button");
  const toDoText = document.createElement("span");

  let toDoId = finisheds.length + 1;

  delBtn.innerText = "❌";
  returnBtn.innerText = "👎🏻";
  toDoText.innerText = text;

  delBtn.addEventListener("click", deleteToDo2);
  returnBtn.addEventListener("click", returnToDo);

  toDoItem.appendChild(toDoText);
  toDoItem.appendChild(delBtn);
  toDoItem.appendChild(returnBtn);
  toDoItem.id = toDoId;
  finishedList.appendChild(toDoItem);

  const toDoObj = {
    text: text,
    id: toDoId
  };
  finisheds.push(toDoObj);
  saveToDos();
}

function paintToDo(text) {
  const toDoItem = document.createElement("li");
  const delBtn = document.createElement("button");
  const finishBtn = document.createElement("button");
  const toDoText = document.createElement("span");

  let toDoId = pendings.length + 1;

  delBtn.innerText = "❌";
  finishBtn.innerText = "✔";

  toDoText.innerText = text;

  delBtn.addEventListener("click", deleteToDo1);
  finishBtn.addEventListener("click", finishToDo);

  toDoItem.appendChild(toDoText);
  toDoItem.appendChild(delBtn);
  toDoItem.appendChild(finishBtn);
  toDoItem.id = toDoId;
  pendingList.appendChild(toDoItem);

  const toDoObj = {
    text: text,
    id: toDoId
  };
  pendings.push(toDoObj);
  saveToDos();
}

function loadToDos() {
  const loadedPending = localStorage.getItem(PENDING_LS);
  const loadedFinished = localStorage.getItem(FINISHED_LS);

  if (loadedPending !== null) {
    const parsedToDos = JSON.parse(loadedPending);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  if (loadedFinished !== null) {
    const parsedToDos = JSON.parse(loadedFinished);
    parsedToDos.forEach(function (toDo) {
      paintFinish(toDo.text);
    });
  }
}

function handleTDSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if(currentValue === ""){
    //No Input!
  }else{
    paintToDo(currentValue);
  }
  toDoInput.value = "";
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleTDSubmit);
}

init();