//todo 완료 / 미완료 변경 기능은 따로 challenge 구현하면서 만들어 놓았음. 
const TODOSTATE_PENDING = 1;
const TODOSTATE_FINISHED = 0;
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

function deleteToDo_dialog(event){
  const btn = event.target;
  const li = btn.parentNode;
  if(li.className === "li-fin"){
    finishedList.removeChild(li);
    const cleanToDos = finisheds.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    finisheds = cleanToDos;
  }else if(li.className === "li-todo"){
    pendingList.removeChild(li);
    const cleanToDos = pendings.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    pendings = cleanToDos;
  }    
  saveToDos();
}

function deleteToDo(event) {
  const dialog = document.createElement('dialog');
  dialog.id = "deleteDialog";
  dialog.innerHTML = "<form method='dialog'> <p><label>정말로 삭제하시겠습니까?</label></p>  <menu> <button value='cancel'>취소</button> <button id='confirmBtn' value='confirm'>삭제</button> </menu> </form>";
  bodytd.appendChild(dialog);
  dialog.showModal();
  dialog.addEventListener('close', function onClose() {
    if(deleteDialog.returnValue === "confirm"){
       deleteToDo_dialog(event);
    }
    bodytd.removeChild(dialog);
    });
}

function editToDo_dialog(event, newValue, dateValue){
  const btn = event.target;
  const li = btn.parentNode;
  let lists;
  li.querySelector("span").innerText = `${newValue}\n@${dateValue}`;
  if(li.className === "li-fin"){
    lists = finisheds;
  }else if(li.className === "li-todo"){
    lists = pendings;
  } 
  for(let i = 0; i<lists.length; i++){
    if(lists[i].id === parseInt(li.id)){
      lists[i].text = newValue;
      break;
    }
  } 
  saveToDos();
}

function editToDo(event) {
  const dialog = document.createElement('dialog');
  const fullText = event.target.parentNode.querySelector("span").innerText;
  const oldValue = fullText.split("@")[0];
  dialog.id = "editDialog";
  dialog.innerHTML = `<form method='dialog'> <p><label>수정하십시오.</label></p> <input type='text' value='${oldValue}'/> <menu> <button value='cancel'>취소</button> <button id='confirmBtn' value='confirm'>수정</button> </menu> </form>`;
  bodytd.appendChild(dialog);
  dialog.showModal();
  dialog.addEventListener('close', function onClose() {
    if(editDialog.returnValue === "confirm"){
      const newValue = dialog.querySelector("input").value;
      editToDo_dialog(event, newValue, fullText.split("@")[1]);
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
  paintToDo(fullText.split("@")[0], fullText.split("@")[1]);
}

function paintFinish(text, date) {
  const toDoId = finisheds.length + 1;
  const toDoText = `${text}\n@${date}`;

  finishedList.appendChild(makeListItem(toDoId, toDoText, TODOSTATE_FINISHED, "li-fin"));

  const toDoObj = {
    text: text,
    id: toDoId,
    dateInfo: date
  };
  finisheds.push(toDoObj);
  saveToDos();
}

function paintToDo(text, date) {
  const toDoId = pendings.length + 1;
  const toDoText = `${text}\n@${date}`;

  pendingList.appendChild(makeListItem(toDoId, toDoText, TODOSTATE_PENDING, "li-todo"));

  const toDoObj = {
    text: text,
    id: toDoId,
    dateInfo: date
  };
  pendings.push(toDoObj);
  saveToDos();
}

function makeListItem(toDoId, toDoText, toDoState, toDoClass){
  const toDoItem = document.createElement("li");
  const delBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const toDoSpan = document.createElement("span");

  editBtn.innerText = "📝"
  delBtn.innerText = "❌";
  toDoSpan.innerText = toDoText;
  
  editBtn.addEventListener("click", editToDo);
  delBtn.addEventListener("click", deleteToDo);
  
  toDoItem.appendChild(toDoSpan);
  toDoItem.appendChild(editBtn);
  toDoItem.appendChild(delBtn);
  toDoItem.id = toDoId;
  toDoItem.className = toDoClass;
  toDoItem.style.borderBottom = "1px solid #EBEFF4";

  if(toDoState === TODOSTATE_PENDING){
    const finishBtn = document.createElement("button");
    finishBtn.innerText = "👍🏻"; 
    finishBtn.addEventListener("click", finishToDo);
    toDoItem.appendChild(finishBtn);
  }else{
    const returnBtn = document.createElement("button");
    returnBtn.innerText = "👎🏻"; 
    returnBtn.addEventListener("click", returnToDo);
    toDoItem.appendChild(returnBtn);
  }

  return toDoItem;
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