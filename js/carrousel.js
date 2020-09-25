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


function add_to_DOM(response) {
    for (i = 0; i < 3; i++) { //Crear dinámicamente los GIFOS del trending

        const carousel = document.querySelector("#carousel");
        let DIV = document.createElement("div");
        DIV.setAttribute("class", "gif");
        DIV.classList.add("large", "trending");
        carousel.appendChild(DIV);
        DIV.innerHTML = `<img class="gif-img" src=${response[i].images.fixed_height_downsampled.url} id="${response[i].id}-img">
        <div class="gif-card large">
                <div class="icon-btn">
                  <img src="./img/icon-fav-hover.svg" class="icon heart" id=${response[i].id}>
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
        let heart = document.getElementById(`${response[i].id}`);
            let id = `${response[i].id}`;
            let download = document.getElementById(`${response[i].id}-dload`);
            let maximize = document.getElementById(`${response[i].id}-max`);
            let image = (document.getElementById(`${response[i].id}-img`)).src;
            let title = (document.getElementById(`${response[i].id}-title`).innerHTML);
            let username = (document.getElementById(`${response[i].id}-user`).innerHTML);

            //crear event listener para almacenar en Favoritos

            heart.addEventListener('click', () => {
                heart.setAttribute("src", "./img/icon-fav-active.svg");
                let gifo = new Gifo(id, image, title, username, true);
                console.log(gifo);
                if (JSON.parse(localStorage.getItem("favs"))) {
                    favourite_GIFOS = JSON.parse(localStorage.getItem("favs"));
                    favourite_GIFOS.push(gifo);
                    localStorage.setItem("favs", JSON.stringify(favourite_GIFOS));
                } else {
                    favourite_GIFOS = [];
                    favourite_GIFOS.push(gifo);
                    localStorage.setItem("favs", JSON.stringify(favourite_GIFOS));

                }
            });
            //crear event listener para Descargar
            download.addEventListener('click', async () => {
                //create new a element
                let a = document.createElement('a');
                // get image as blob
                let response = await fetch(image);
                let file = await response.blob();
                // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
                a.download = `${title}`;
                a.href = window.URL.createObjectURL(file);
                //store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
                a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
                //click on element to start download
                a.click();
            });
        //crear event listener para Maximizar y crear el contenido de la tarjeta max

            maximize.addEventListener('click',() => { 
                
                gifoMax_cards[0].style.display="grid";
                //cambiar color corazón
                max_heart[0].getAttribute("src") === "./img/icon-fav-hover.svg" ? max_heart[0].setAttribute("src", "./img/icon-fav-active.svg") : max_heart[0].setAttribute("src", "./img/icon-fav-hover.svg");
                max_heart[0].setAttribute("id", `${heart.id}`);      
                gifo_container.innerHTML=`<img src=${image} class="gif-content" id="max-img">`;
                gifoMax_title.innerText=`${title}`;
                gifoMax_user.innerText=`${username}`;      
            });
            // mostrar el contenido de la tarjeta max en mobile, al hacer clic en el gif 
            if (window.innerWidth < 1024){
                DIV.addEventListener('click', () =>{
                gifoMax_cards[0].style.display="grid";   
                max_heart[0].setAttribute("id", `${heart.id}`);      
                gifo_container.innerHTML=`<img src=${image} class="gif-content" id="max-img">`;
                gifoMax_title.innerText=`${title}`;
                gifoMax_user.innerText=`${username}`;  
                });
            }
    } //fin del ciclo for
    //mostrar las tarjetas en hover solo a partir de devices 1024px
    if (window.innerWidth >= 1024) {
        show_hide_gifCards();
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
    back_arrow.classList.replace("hidden", "visible");
    let trending_gif = document.getElementsByClassName("trending");

    for (i = 0; i < 3; i++) {
        if (counter >= 44) {
            forward_arow.classList.replace("visible", "hidden");
        }

        trending_gif[i].innerHTML = `<img class="gif-img" src=${trending_results[counter].images.fixed_height_downsampled.url}>
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
                <h6 class="user white-text">${trending_results[counter].username}</h6>
                <h5 class="gif-title white-text">${trending_results[counter].title}</h5>
              </div>
            </div>`;
        counter = counter + 1;
    }
    //mostrar las tarjetas en hover solo a partir devices 1024px
    if (window.innerWidth >= 1024) {
        show_hide_gifCards();
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
            trending_gif[i].innerHTML = `<img class="gif-img" src=${trending_results[counter].images.fixed_height_downsampled.url}>
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
                <h6 class="user white-text">${trending_results[counter].username}</h6>
                <h5 class="gif-title white-text">${trending_results[counter].title}</h5>
              </div>
            </div>`;
            counter = counter + 1;

            
        }// fin de for
        if (window.innerWidth >= 1024) {
            show_hide_gifCards();
        }
    }


}

back_arrow.addEventListener("click", goBack);








