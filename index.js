const BASE_COLOR = "rgb(52, 73, 94)";
const OVER_COLOR = "#7f8c8d";

const CLICKED_CLASS = "clicked";

const title = document.querySelector("#title");

function handleClick_Class() {
    //const currentClassList = title.classList;
    //console.log(currentClassList);
    // if(!currentClassList.contains(CLICKED_CLASS)){
    //     title.classList.add(CLICKED_CLASS);
    // } else{
    //     title.classList.remove(CLICKED_CLASS);
    // }
    title.classList.toggle(CLICKED_CLASS);
}

//title.addEventListener("click", handleClick);
//window.addEventListener("offline", eventListener);
//title.addEventListener("mouseenter", handleClick);
title.addEventListener("click", handleClick_Class);