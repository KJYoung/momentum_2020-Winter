const bodybg = document.querySelector("body");

const IMG_NUMBER = 6;

function handleImgLoad(){

}

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/bg${imgNumber}.jpg`;
    image.classList.add('bgImage');
    image.addEventListener("loadend", handleImgLoad);
    image.style.opacity=0.7;
    bodybg.appendChild(image);
}

function genRan(){
    let number = Math.random()*IMG_NUMBER;
    number = Math.floor(number) + 1;
    return number;
}

function init(){
    const randomNumber = genRan();
    paintImage(randomNumber);
}

init();