const BASE_COLOR = "rgb(52, 73, 94)";
const OVER_COLOR = "#7f8c8d";

const CLICKED_CLASS = "clicked";

const title = document.querySelector("#title");

function handleClick_Class() {
    title.classList.toggle(CLICKED_CLASS);
}

title.addEventListener("click", handleClick_Class);