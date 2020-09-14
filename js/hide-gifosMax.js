//event listener TEMPORAL! para ocultar la tarjeta de gif expandida (gifMax);
let gifoMax_cards = document.getElementsByClassName("gifo-max");

let close_icon = document.getElementById("close");
close_icon.addEventListener('click', ()=> hide(gifoMax_cards));

function hide(array){
   for (i = 0; i < array.length; i++) {
     return array[i].style.display = "none";
   };
}