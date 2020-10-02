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
    for (i = 0; i < 3; i++) { //Crear dinámicamente los GIFOS del trending

        const carousel = document.querySelector("#carousel");
        let DIV = document.createElement("div");
        DIV.setAttribute("class", "gif");
        DIV.classList.add("large", "trending");
        carousel.appendChild(DIV);
        DIV.innerHTML = `<img class="gif-img" src=${response[i].images.fixed_height_downsampled.url} id="${response[i].id}-img">
        <div class="gif-card large">
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
        
      counter = counter + 1;         
      
      analizeFavs(response[i].id); 
      //iconsEvents(response);    
                               
        
                  
    }  //fin del ciclo for        

        
    if (window.innerWidth >= 1024) {
        show_hide_gifCards();
    } else {
        let gif_imgs = document.getElementsByClassName("gif");
        let gif_cards = document.getElementsByClassName("gif-card");
        
        for (i=0; i<gif_imgs.length; i++){
        let gif_card = gif_cards[i];

        gif_imgs[i].addEventListener('click', ()=> {        
            gif_card.style.display="hidden";          
        });
        }
    }
}

async function get_Trending_GIF() {
    let response = await fetch(trending_url);
    let JSON_response = await response.json();
    let GIF_data = JSON_response.data;
    console.log(GIF_data);

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
    back_arrow.classList.replace("hidden", "visible");
    
    let trending_gif = document.getElementsByClassName("trending");
    

    for (i = 0; i < 3; i++) {

        if (counter >= 44) {
            forward_arow.classList.replace("visible", "hidden");
        }

        trending_gif[i].innerHTML = `<img class="gif-img" id="${trending_results[i].id}-img" src=${trending_results[counter].images.fixed_height_downsampled.url}>
      <div class="gif-card large">
              <div class="icon-btn">
                <img src="./img/icon-fav-hover.svg" id=${trending_results[i].id} class="icon heart">
              </div>
              <div class="icon-btn">
                <img src="./img/icon-download.svg" id="${trending_results[i].id}-dload" class="icon">
              </div>
              <div class="icon-btn">
                <img src="./img/icon-max.svg" id="${trending_results[i].id}-max" class="icon">
              </div>
              <div class="user-details">
                <h6 class="user white-text" id="${trending_results[i].id}-user">${trending_results[counter].username}</h6>
                <h5 class="gif-title white-text" id="${trending_results[i].id}-title">${trending_results[counter].title}</h5>
              </div>
            </div>`;
        counter = counter + 1;
        analizeFavs(trending_results[i].id);          
          
               
        iconsEvents(trending_results);
        
    }
    //mostrar las tarjetas en hover solo a partir devices 1024px
    if (window.innerWidth >= 1024) {
        show_hide_gifCards();
    } else {
        let gif_imgs = document.getElementsByClassName("gif");
        let gif_cards = document.getElementsByClassName("gif-card");
        
        for (i=0; i<gif_imgs.length; i++){
        let gif_card = gif_cards[i];

        gif_imgs[i].addEventListener('click', ()=> {        
            gif_card.style.display="hidden";          
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
        for (i = 0; i < 3; i++) {
            if (counter == 0) {
                back_arrow.classList.replace("visible", "hidden");
            }
            trending_gif[i].innerHTML = `<img class="gif-img" id="${trending_results[i].id}-img" src=${trending_results[counter].images.fixed_height_downsampled.url}>
      <div class="gif-card large">
              <div class="icon-btn">
                <img src="./img/icon-fav-hover.svg" id=${trending_results[i].id} class="icon heart">
              </div>
              <div class="icon-btn">
                <img src="./img/icon-download.svg" id="${trending_results[i].id}-dload" class="icon">
              </div>
              <div class="icon-btn">
                <img src="./img/icon-max.svg" id="${trending_results[i].id}-max" class="icon">
              </div>
              <div class="user-details">
                <h6 class="user white-text" id="${trending_results[i].id}-user">${trending_results[counter].username}</h6>
                <h5 class="gif-title white-text" id="${trending_results[i].id}-title">${trending_results[counter].title}</h5>
              </div>
            </div>`;
            counter = counter + 1;
            analizeFavs(trending_results[i].id);           
            iconsEvents(trending_results);
            

            
        }// fin de for
        //mostrar las tarjetas en hover solo a partir devices 1024px > para dispositivos menores mostrar gifoMax cuando se hace click sobre la tarjeta
        if (window.innerWidth >= 1024) {
            show_hide_gifCards();
        } else {
            let gif_imgs = document.getElementsByClassName("gif");
            let gif_cards = document.getElementsByClassName("gif-card");
            
            for (i=0; i<gif_imgs.length; i++){
            let gif_card = gif_cards[i];

            gif_imgs[i].addEventListener('click', ()=> {        
                gif_card.style.display="hidden";          
            });
            }
        }
    }


}

back_arrow.addEventListener("click", goBack);








