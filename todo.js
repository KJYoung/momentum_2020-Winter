//todo 완료 / 미완료 변경 기능은 따로 challenge 구현하면서 만들어 놓았음. 

const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");

const pendingList = document.querySelector(".js-toDoPending");
const finishedList = document.querySelector(".js-toDoFinished");

const bodytd = document.querySelector("body");

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

function deleteToDo1_dialog(event){
  const btn = event.target;
    const li = btn.parentNode;
  
    pendingList.removeChild(li);
  
    const cleanToDos = pendings.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    pendings = cleanToDos;
    saveToDos();
}

function deleteToDo2_dialog(event) {
  const btn = event.target;
  const li = btn.parentNode;

  finishedList.removeChild(li);

  const cleanToDos = finisheds.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finisheds = cleanToDos;
  saveToDos();
}

function deleteToDo1(event) {
  let confirmValue = true;
  const dialog = document.createElement('dialog');
  dialog.id = "favDialog";
  dialog.innerHTML = "<form method='dialog'> <p><label>정말로 삭제하시겠습니까?</label></p>  <menu>        <button value='cancel'>취소</button> <button id='confirmBtn' value='confirm'>삭제</button> </menu> </form>";
  bodytd.appendChild(dialog);
  dialog.showModal();
  dialog.addEventListener('close', function onClose() {
    if(favDialog.returnValue === "confirm"){
       deleteToDo1_dialog(event);
    }
    bodytd.removeChild(dialog);
    });
}
function deleteToDo2(event) {
  let confirmValue = true;
  const dialog = document.createElement('dialog');
  dialog.id = "favDialog";
  dialog.innerHTML = "<form method='dialog'> <p><label>정말로 삭제하시겠습니까?</label></p>  <menu>        <button value='cancel'>취소</button> <button id='confirmBtn' value='confirm'>삭제</button> </menu> </form>";
  bodytd.appendChild(dialog);
  dialog.showModal();
  dialog.addEventListener('close', function onClose() {
    if(favDialog.returnValue === "confirm"){
       deleteToDo2_dialog(event);
    }
    bodytd.removeChild(dialog);
    });
}



function finishToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  pendingList.removeChild(li);

  const cleanToDos = pendings.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pendings = cleanToDos;

  const fullText = li.querySelector("span").innerText;
  console.log(`${fullText.split("@")[0]}, ${fullText.split("@")[1]}`);
  paintFinish(fullText.split("@")[0], fullText.split("@")[1]);
}

function returnToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  finishedList.removeChild(li);

  const cleanToDos = finisheds.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finisheds = cleanToDos;

  const fullText = li.querySelector("span").innerText;
  console.log(`${fullText.split("@")[0]}, ${fullText.split("@")[1]}`);
  paintToDo(fullText.split("@")[0], fullText.split("@")[1]);
}

function paintFinish(text, date) {
  const toDoItem = document.createElement("li");
  const delBtn = document.createElement("button");
  const returnBtn = document.createElement("button");
  const toDoText = document.createElement("span");

  let toDoId = finisheds.length + 1;

  delBtn.innerText = "❌";
  returnBtn.innerText = "👎🏻";
  toDoText.innerText = `${text}\n@${date}`;

  delBtn.addEventListener("click", deleteToDo2);
  returnBtn.addEventListener("click", returnToDo);

  toDoItem.appendChild(toDoText);
  toDoItem.appendChild(delBtn);
  toDoItem.appendChild(returnBtn);
  toDoItem.id = toDoId;
  toDoItem.style.borderBottom = "1px solid #EBEFF4";

  finishedList.appendChild(toDoItem);

  const toDoObj = {
    text: text,
    id: toDoId,
    dateInfo: date
  };
  finisheds.push(toDoObj);
  saveToDos();
}

function paintToDo(text, date) {
  const toDoItem = document.createElement("li");
  const delBtn = document.createElement("button");
  const finishBtn = document.createElement("button");
  const toDoText = document.createElement("span");
  

  let toDoId = pendings.length + 1;

  delBtn.innerText = "❌";
  finishBtn.innerText = "👍🏻";

  toDoText.innerText = `${text}\n@${date}`;

  delBtn.addEventListener("click", deleteToDo1);
  finishBtn.addEventListener("click", finishToDo);

  toDoItem.appendChild(toDoText);
  toDoItem.appendChild(delBtn);
  toDoItem.appendChild(finishBtn);
  toDoItem.id = toDoId;
  pendingList.appendChild(toDoItem);
  toDoItem.style.borderBottom = "1px solid #EBEFF4";

  const toDoObj = {
    text: text,
    id: toDoId,
    dateInfo: date
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
      paintToDo(toDo.text, toDo.dateInfo);
    });
  }
  if (loadedFinished !== null) {
    const parsedToDos = JSON.parse(loadedFinished);
    parsedToDos.forEach(function (toDo) {
      paintFinish(toDo.text, toDo.dateInfo);
    });
  }
}

function handleTDSubmit(event) {
  const toDoDate = new Date();

  event.preventDefault();
  const currentValue = toDoInput.value;
  if(currentValue === ""){
    //No Input!
  }else{
    paintToDo(currentValue, `${toDoDate.getFullYear()}/${toDoDate.getMonth()+1}/${toDoDate.getDate()}`);
  }
  toDoInput.value = "";
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleTDSubmit);
}

init();