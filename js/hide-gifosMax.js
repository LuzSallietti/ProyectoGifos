//event listener TEMPORAL? para ocultar la tarjeta de gif expandida (gifMax);
let gifoMax_cards = document.getElementsByClassName("gifo-max");

let gifo_container = document.getElementById("gifo-container");
let gifoMax_title = document.getElementById("gif-max-title");
let gifoMax_user = document.getElementById("gif-max-user");
let max_heart = document.getElementsByClassName("max-heart");
let max_download = document.getElementById("max-download");
let gifoMax_img = document.getElementById("max-img");

let close_icon = document.getElementById("close");
close_icon.addEventListener('click', () => hide(gifoMax_cards));

function hide(array) {
  for (i = 0; i < array.length; i++) {
    return array[i].style.display = "none";
  };
}