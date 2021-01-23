const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function filterFxn(toDo){
    
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    //array의 모든 아이템을 통해 함수를 실행하고 true가 반환값인 아이템만을 가진 array를 반환.

    toDos = cleanToDos;
    saveToDos();
}

function paintToDo(text){
    const toDoItem = document.createElement("li");
    const delBtn = document.createElement("button");
    const toDoText = document.createElement("span");
    const toDoId = toDos.length + 1; 
    
    delBtn.innerText = "❌";
    toDoText.innerText = text;

    delBtn.addEventListener("click", deleteToDo);
    toDoItem.appendChild(delBtn);
    toDoItem.appendChild(toDoText);
    toDoItem.id = toDoId;
    toDoList.appendChild(toDoItem);
    
    const toDoObj = {
        text: text,
        id: toDoId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleTDSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleTDSubmit);
}

init();

