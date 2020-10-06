//carrusel tendencias
let gifs_carousel = document.getElementById("carousel");
//llamar API Giphy trending
const base_URL = "https://api.giphy.com/v1/gifs"
const giphy_TRENDS_endopoint = "/trending?"
const APIKEY = "&api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef";
let searchLimit = "&limit=48";
const trending_url = `${base_URL + giphy_TRENDS_endopoint + APIKEY + searchLimit}`;
const back_arrow = document.getElementById("back-arrow");
const forward_arow = document.getElementById("forward-arrow");
let counter = 0;
let trending_results = [];
let carrousel_container = document.getElementsByClassName("container");


function add_to_DOM(response) {
  let i;
  let id;
  let src;
  let title;
  let username;
  
  for (i = 0; i < 3; i++) { //Crear dinámicamente los GIFOS del trending
    id = response[i].id;
    src = response[i].images.fixed_height_downsampled.url;
    title = response[i].title;
    username = response[i].username;
    const carousel = document.querySelector("#carousel");
    let DIV = document.createElement("div");
    DIV.setAttribute("class", "gif");
    DIV.classList.add("large", "trending");

    carousel.appendChild(DIV);
    DIV.innerHTML = `<img class="gif-img trend-img" src=${response[i].images.fixed_height_downsampled.url} id="${response[i].id}-img">
        <div class="gif-card large trend-card">
                <div class="icon-btn">
                  <img src="./img/icon-fav-hover.svg" class="icon heart trend-heart" id=${response[i].id}>
                </div>
                <div class="icon-btn">
                  <img src="./img/icon-download.svg" class="icon" id="${response[i].id}-dload">
                </div>
                <div class="icon-btn">
                  <img src="./img/icon-max.svg" class="icon" id="${response[i].id}-max">
                </div>
                <div class="user-details">
                  <h6 class="user white-text" id="${response[i].id}-user">${response[i].username}</h6>
                  <h5 class="gif-title white-text" id="${response[i].id}-title">${response[i].title}</h5>
                </div>
              </div>`;

    console.log(id);
    analizeFavs(id);
    iconsEvents(id);
    counter = counter + 1;
  }  //fin del ciclo for     

  if (window.innerWidth >= 1024) {
    show_hide_gifCards();
  } else {
    let gif_imgs = document.getElementsByClassName("trend-img");
    let gif_cards = document.getElementsByClassName("trend-card");
    let trends_hearts = document.getElementsByClassName("trend-heart");
    let i;

    for (i = 0; i < gif_imgs.length; i++) {
      let gif_card = gif_cards[i];
      let gif_img = gif_imgs[i];
      let id = trends_hearts[i].id;      
      let image = gif_img.src;
      let title = document.getElementById(`${id}-title`).innerHTML;
      let user = document.getElementById(`${id}-user`).innerHTML;

      gif_img.addEventListener('click', () => {
        gif_card.style.display = "hidden";
        gifoMax_cards[0].style.display = "grid";
        max_heart[0].setAttribute("id", `${id}`);        
        analizeFavs(id);
        gifo_container.innerHTML = `<img src=${image} class="gif-content" id="max-img">`;
        gifoMax_title.innerText = `${title}`;
        gifoMax_user.innerText = `${user}`;
      });
    }
  }
}


async function get_Trending_GIF() {
  let response = await fetch(trending_url);
  let JSON_response = await response.json();
  let GIF_data = JSON_response.data;

  return GIF_data;
}
get_Trending_GIF()
  .then(response => {
    trending_results = response;
    add_to_DOM(trending_results);
  })
  .catch(error => console.log(error));


//mostrar 3 nuevos (avanzar)

function goFoward() {
  console.log(counter);
  back_arrow.classList.replace("hidden", "visible");
  let trending_gif = document.getElementsByClassName("trending");
  let i;
  let id;
  for (i = 0; i < 3; i++) {

    if (counter >= 44) {
      forward_arow.classList.replace("visible", "hidden");
    }

    trending_gif[i].innerHTML = `<img class="gif-img trend-img" id="${trending_results[counter].id}-img" src=${trending_results[counter].images.fixed_height_downsampled.url}>
      <div class="gif-card large trend-card">
              <div class="icon-btn">
                <img src="./img/icon-fav-hover.svg" id=${trending_results[counter].id} class="icon heart trend-heart">
              </div>
              <div class="icon-btn">
                <img src="./img/icon-download.svg" id="${trending_results[counter].id}-dload" class="icon">
              </div>
              <div class="icon-btn">
                <img src="./img/icon-max.svg" id="${trending_results[counter].id}-max" class="icon">
              </div>
              <div class="user-details">
                <h6 class="user white-text" id="${trending_results[counter].id}-user">${trending_results[counter].username}</h6>
                <h5 class="gif-title white-text" id="${trending_results[counter].id}-title">${trending_results[counter].title}</h5>
              </div>
            </div>`;

    id = trending_results[counter].id;
    console.log(id);
    analizeFavs(id);
    iconsEvents(id);

    counter = counter + 1;
  }
  //mostrar las tarjetas en hover solo a partir devices 1024px
  if (window.innerWidth >= 1024) {
    show_hide_gifCards();
  } else {
    let gif_imgs = document.getElementsByClassName("trend-img");
    let gif_cards = document.getElementsByClassName("trend-card");
    let trends_hearts = document.getElementsByClassName("trend-heart");
    

    for (i =0 ; i < gif_imgs.length; i++) {
      let gif_card = gif_cards[i];
      let gif_img = gif_imgs[i];
      let id = trends_hearts[i].id;
      let image = gif_img.src;
      let title = document.getElementById(`${id}-title`).innerHTML;
      let user = document.getElementById(`${id}-user`).innerHTML;

      gif_img.addEventListener('click', () => {
        gif_card.style.display = "hidden";
        gifoMax_cards[0].style.display = "grid";
        max_heart[0].setAttribute("id", `${id}`);
        analizeFavs(id);
        max_heart.src = analizeFavs(id);
        gifo_container.innerHTML = `<img src=${image} class="gif-content" id="max-img">`;
        gifoMax_title.innerText = `${title}`;
        gifoMax_user.innerText = `${user}`;
      });
    }
  }
}

forward_arow.addEventListener("click", goFoward);

//mostrar 3 anteriores (retroceder)

function goBack() {


  let trending_gif = document.getElementsByClassName("trending");
  if (counter > 0) {
    counter = counter - 6;
    let i;
    for (i = 0; i < 3; i++) {
      if (counter == 0) {
        back_arrow.classList.replace("visible", "hidden");
      }
      trending_gif[i].innerHTML = `<img class="gif-img trend-img" id="${trending_results[counter].id}-img" src=${trending_results[counter].images.fixed_height_downsampled.url}>
            <div class="gif-card large trend-card">
              <div class="icon-btn">
                <img src="./img/icon-fav-hover.svg" id=${trending_results[counter].id} class="icon heart trend-heart">
              </div>
              <div class="icon-btn">
                <img src="./img/icon-download.svg" id="${trending_results[counter].id}-dload" class="icon">
              </div>
              <div class="icon-btn">
                <img src="./img/icon-max.svg" id="${trending_results[counter].id}-max" class="icon">
              </div>
              <div class="user-details">
                <h6 class="user white-text" id="${trending_results[counter].id}-user">${trending_results[counter].username}</h6>
                <h5 class="gif-title white-text" id="${trending_results[counter].id}-title">${trending_results[counter].title}</h5>
              </div>
            </div>`;

      id = trending_results[counter].id;
      console.log(id);
      analizeFavs(id);
      iconsEvents(id);
      counter = counter + 1;
    }// fin de for
    //mostrar las tarjetas en hover solo a partir devices 1024px > para dispositivos menores mostrar gifoMax cuando se hace click sobre la tarjeta
    if (window.innerWidth >= 1024) {
      show_hide_gifCards();
    } else {
      let gif_imgs = document.getElementsByClassName("trend-img");
      let gif_cards = document.getElementsByClassName("trend-card");
      let trends_hearts = document.getElementsByClassName("trend-heart");
      
  
      for (i = 0 ; i < gif_imgs.length; i++) {
        let gif_card = gif_cards[i];
        let gif_img = gif_imgs[i];
        let id = trends_hearts[i].id;        
        let image = gif_img.src;
        let title = document.getElementById(`${id}-title`).innerHTML;
        let user = document.getElementById(`${id}-user`).innerHTML;
  
        gif_img.addEventListener('click', () => {
          gif_card.style.display = "hidden";
          gifoMax_cards[0].style.display = "grid";
          max_heart[0].setAttribute("id", `${id}`);
          analizeFavs(id);          
          gifo_container.innerHTML = `<img src=${image} class="gif-content" id="max-img">`;
          gifoMax_title.innerText = `${title}`;
          gifoMax_user.innerText = `${user}`;
        });
      }
    }
  }


}

back_arrow.addEventListener("click", goBack);








