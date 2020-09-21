//llamar API Giphy
const base_URL = "http://api.giphy.com/v1/gifs"
const giphy_SEARCH_endopoint = "/search?"
let searchQuery = "q=luis+miguel"; //se reemplazará con el input del usuario
const APIKEY = "&api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef";
let searchLimit = "&limit=3";

let url = `${base_URL + giphy_SEARCH_endopoint + searchQuery + APIKEY + searchLimit}`;



//trending


const giphy_TRENDS_endopoint = "/trending?"

searchLimit = "&limit=5";

const trending_url= `${base_URL+giphy_TRENDS_endopoint+APIKEY+searchLimit}`;


function add_to_DOM (response){
    for ( i = 0; i< response.length ; i++) { //Crear dinámicamente los GIFOS del trending
        
        const carousel = document.querySelector("#carousel");               
        let DIV = document.createElement("div");
        DIV.setAttribute("class","gif");
        DIV.classList.add("large");
        carousel.appendChild(DIV);
        DIV.innerHTML=`<img class="gif-img" src=${response[i].images.fixed_height_downsampled.url}>
        <div class="gif-card large">
                <div class="icon-btn">
                  <img src="./img/icon-fav-hover.svg" class="icon">
                </div>
                <div class="icon-btn">
                  <img src="./img/icon-download.svg" class="icon">
                </div>
                <div class="icon-btn">
                  <img src="./img/icon-max.svg" class="icon">
                </div>
                <div class="user-details">
                  <h6 class="user white-text">${response[i].username}</h6>
                  <h5 class="gif-title white-text">${response[i].title}</h5>
                </div>
              </div>`;
    }       
    show_hide_gifCards();    
}

async function get_Trending_GIF (){
    let response = await fetch(trending_url);
    let JSON_response = await response.json();
    let GIF_data = JSON_response.data;
    
    return GIF_data;
}
get_Trending_GIF()
.then(response => add_to_DOM(response))
.catch (error => console.log (error));




