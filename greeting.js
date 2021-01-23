const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser", VIS_ON = "showing";

function askName(){
    form.classList.add(VIS_ON);
    form.addEventListener("submit", handleSubmit);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    localStorage.setItem(USER_LS, currentValue);
}

function paintGreeting(userName){
    form.classList.remove(VIS_ON);
    greeting.innerText = `Hello, ${userName}`;
    greeting.classList.add(VIS_ON);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askName();
    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();