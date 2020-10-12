//Mostrar los gifos favoritos en página Favoritos
const favs_section = document.getElementById("favouriteGifos");
const favs_container = document.querySelector("#favs-container");
const view_more_btn = document.getElementById("view-more");
const empty_favs = document.getElementById("empty-favs")
let remainders_Favs;
let favourites_storage = []; //Evaluar si hay gifos almacenados como favoritos (con valor true) para mostrar solo esos

if (JSON.parse(localStorage.getItem("favs"))) {
  let favs = JSON.parse(localStorage.getItem("favs"));
  let i;
  for (i = 0; i < favs.length; i++) {
    if (favs[i].fav == true) {
      favourites_storage.push(favs[i]);      
    }
  }
}

function displayFavs(array, posicion, longitud) {

  favs_container.classList.remove("d-none");
  view_more_btn.classList.replace("d-none", "d-block");
  favs_section.style.paddingBottom = "5rem";

  //ocultar botón cuando hay menos de 12 resultados por mostrar
  if ((array.length) <= 12) {
    view_more_btn.classList.replace("d-block", "d-none");
  }
  let i = posicion;

  if (array.length < 12) {
    longitud = array.length;
  }

  for (i = 0; i < longitud; i++) {
    let DIV = document.createElement("div");
    DIV.setAttribute("class", "gif");
    DIV.classList.add("small");
    favs_container.appendChild(DIV);
    DIV.innerHTML = `<img src=${array[i].src} id="${array[i].id}-fav-img">
        <div class="gif-card small">
        <div class="icon-btn">
        <img src="./img/icon-fav-active.svg" class="icon" id="fav-${array[i].id}" data-identifier="${array[i].id}">
      </div>
      <div class="icon-btn">
        <img src="./img/icon-download.svg" class="icon" id="${array[i].id}-fav-dload">
      </div>
      <div class="icon-btn">
        <img src="./img/icon-max.svg" class="icon" id="${array[i].id}-fav-max">
      </div>
        <div class="user-details">
          <h6 class="user white-text" id="${array[i].id}-fav-user">${array[i].user}</h6>
          <h5 class="gif-title white-text" id="${array[i].id}-fav-title">${array[i].title}</h5>
        </div>
      </div>`;

    let heart = document.getElementById(`fav-${array[i].id}`);
    let gif_id = heart.dataset.identifier;    
    let download = document.getElementById(`${array[i].id}-fav-dload`);
    let maximize = document.getElementById(`${array[i].id}-fav-max`);
    let image = (document.getElementById(`${array[i].id}-fav-img`)).src;
    let title = (document.getElementById(`${array[i].id}-fav-title`).innerHTML);
    let username = (document.getElementById(`${array[i].id}-fav-user`).innerHTML);

    //crear event listener para desfavoritear o volver a favoritear desde pagina Favoritos
    heart.addEventListener('click', () => {
      if (heart.getAttribute("src") == "./img/icon-fav-active.svg") {
        heart.setAttribute("src", "./img/icon-fav-hover.svg");     
        deleteFav(gif_id);
        location.reload();
      }
      else {
        heart.setAttribute("src", "./img/icon-fav-active.svg");      
        favourite_GIFOS = JSON.parse(localStorage.getItem("favs"));
        for (i = 0; i < favourite_GIFOS.length; i++) {
          if (favourite_GIFOS[i].id == gif_id && favourite_GIFOS[i].fav == false) {
            favourite_GIFOS[i].fav = true;
            localStorage.setItem("favs", JSON.stringify(favourite_GIFOS));
          }
        }
      }
    });

    //crear event listener para Descargar
    download.addEventListener('click', async () => {     
      let a = document.createElement('a');      
      let response = await fetch(image);
      let file = await response.blob();      
      a.download = `${title}`;
      a.href = window.URL.createObjectURL(file);     
      a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');      
      a.click();
    });

    //crear event listener para Maximizar y crear el contenido de la tarjeta Gifo-max
    maximize.addEventListener('click', () => {
      gifoMax_cards[0].style.display = "grid";
      max_heart[0].setAttribute("id", `${gif_id}`);
      max_heart[0].setAttribute("src", `${heart.src}`);
      gifo_container.innerHTML = `<img src=${image} class="gif-content" id="max-img">`;
      gifoMax_title.innerText = `${title}`;
      gifoMax_user.innerText = `${username}`;
    })
    // mostrar el contenido de la tarjeta max en mobile, al hacer clic en el gif 
    if (window.innerWidth <= 1024) {
      DIV.addEventListener('click', () => {
        console.log("Version mobile, heart src modificado");
        gifoMax_cards[0].style.display = "grid";
        max_heart[0].setAttribute("id", `${gif_id}`);
        max_heart[0].setAttribute("src", `${heart.src}`);
        gifo_container.innerHTML = `<img src=${image} class="gif-content" id="max-img">`;
        gifoMax_title.innerText = `${title}`;
        gifoMax_user.innerText = `${username}`;
      });
    }
  } //fin de ciclo FOR

  if (window.innerWidth > 1024) {
    show_hide_gifCards();
  } else {
    let gif_imgs = document.getElementsByClassName("gif");
    let gif_cards = document.getElementsByClassName("gif-card");
    for (i = 0; i < gif_imgs.length; i++) {
      let gif_card = gif_cards[i];
      gif_imgs[i].addEventListener('click', () => {
        gif_card.style.display = "hidden";
      });
    }
  }
  array.splice(0, 12);
  remainders_Favs = array;
}

document.onload = (JSON.parse(localStorage.getItem("favs"))) ? displayFavs(favourites_storage, 0, 12) : empty_favs.classList.replace("d-none", "d-block"); //si el key no existe en localStorage, mostrar diseño de Favoritos sin contenido
//mostrar más resultados

view_more_btn.addEventListener('click', () => {
  displayFavs(remainders_Favs, 0, 12); //mostrar resultados de 12 en 12
})