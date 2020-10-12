//event listener para ocultar la tarjeta de gif expandida (gifMax);
let gifoMax_cards = document.getElementsByClassName("gifo-max");
let gifo_container = document.getElementById("gifo-container");
let gifoMax_title = document.getElementById("gif-max-title");
let gifoMax_user = document.getElementById("gif-max-user");
let max_heart = document.getElementsByClassName("max-heart");
let max_download = document.getElementById("max-download");
let gifoMax_img = document.getElementById("max-img");
let close_icon = document.getElementById("hide-gifo");
let page_location = String(window.location.pathname);
let isFavsPage = page_location.includes("favoritos.html");

//ocultar Gifo-Max
function hide(array) {
  for (i = 0; i < array.length; i++) {
    return array[i].style.display = "none";
  };
}

// guardar en Favoritos desde Gifo Max
function heartActions (){
  let gif_id = max_heart[0].getAttribute("id");     
  let isFavourite = max_heart[0].src.includes("active");
  
  if (isFavourite) {
    max_heart[0].src = "./img/icon-fav-hover.svg";
    deleteFav(gif_id);      
  }     
  else {
    max_heart[0].src = "./img/icon-fav-active.svg";
    addFav(gif_id);
  }
}

close_icon.addEventListener('click', () => {  
  hide(gifoMax_cards);
  max_heart[0].src="./img/icon-fav-hover.svg";
  if (isFavsPage){
    window.location.reload();
  }
});
max_heart[0].addEventListener('click', heartActions);

//descargar desde Gifo Max
max_download.addEventListener('click', async () => {
  let image = (document.getElementById("max-img")).src;
  let title = (document.getElementById("gif-max-title")).innerHTML;  
  let a = document.createElement('a'); 
  let response = await fetch(image);
  let file = await response.blob();  
  a.download = `${title}`;
  a.href = window.URL.createObjectURL(file);  
  a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');  
  a.click();
});