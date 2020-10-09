const tags_URL = "https://api.giphy.com/v1/";
const giphy_SUGGESTIONS_endopoint = "tags/related/";
const giphy_AUTOCOMPLETE_endpoint = "gifs/search/tags";
let userQuery = document.querySelector("#userQuery");
let form = document.getElementById("search-form");
const view_more_btn = document.getElementById("view-more");
const empty_search = document.getElementById("empty-search");
let query = document.getElementById("userQuery");
let search_inputs = document.getElementsByClassName("suggestions");
let terms = document.getElementsByClassName("giphy-terms");
const lupa = document.getElementById("lupa");
const trends_headings = document.getElementById("trends-headings");
let title = document.getElementById("search-kw");
let autocomplete_field = document.getElementById('autocomplete');
let autocomplete_words;
let autocompleteArray;
let searchBox = document.getElementById("search_");
let deleted_input;
let resultados;
let remaindersArray;
const section_container = document.getElementById("searchedGifos");
let close_search = document.getElementById("search-icon");


window.onload = evaluateTheme(); // determinar color/clase que llevará el ícono de cruz que se crea dinámicamente al clickear el form

function evaluateTheme() {
  let iconColor;
  if (localStorage.getItem("dark_mode") == "true") {
    iconColor = "dark-mode_GIFOS-text";
    return iconColor;
  } else {
    iconColor = "GIFOS-text";
    return iconColor;
  };
}


//mostrar sugerencias al hacer click en el search form

form.addEventListener('input', () => {
  userQuery.style.borderBottom = "1px solid #9CAFC3"; //mostrar subrayado gris
  lupa.classList.remove("d-none");
  lupa.classList.add("d-block");
  let search_icon = document.getElementById("search-icon"); //cambiar icono lupa por icono cruz
  search_icon.innerHTML = `<g>
	<path id="path-1" fill="#FFFFFF" d="M0.293,0.293c0.391-0.391,1.023-0.391,1.414,0l0,0L7,5.585l5.293-5.292
		c0.36-0.36,0.928-0.388,1.32-0.083l0.094,0.083c0.391,0.391,0.391,1.023,0,1.414l0,0L8.415,7l5.292,5.293
		c0.36,0.36,0.389,0.928,0.084,1.32l-0.084,0.094c-0.391,0.391-1.023,0.391-1.414,0l0,0L7,8.415l-5.293,5.292
		c-0.36,0.36-0.928,0.389-1.32,0.083l-0.094-0.083c-0.391-0.391-0.391-1.023,0-1.414l0,0L5.585,7L0.293,1.707
		c-0.36-0.36-0.388-0.928-0.083-1.32L0.293,0.293z"/>
</g>
<title>close</title>
<desc>Created with Sketch.</desc>
<g id="GIFOS">
	<g id="_x30_0-UI-Kit" transform="translate(-669.000000, -2993.000000)">
		<g id="close" class=${evaluateTheme()} transform="translate(669.000000, 2993.000000)">
			<g>
				<path id="path-1_1_" d="M0.293,0.293c0.391-0.391,1.023-0.391,1.414,0l0,0L7,5.585l5.293-5.292
					c0.36-0.36,0.928-0.388,1.32-0.083l0.094,0.083c0.391,0.391,0.391,1.023,0,1.414l0,0L8.415,7l5.292,5.293
					c0.36,0.36,0.389,0.928,0.084,1.32l-0.084,0.094c-0.391,0.391-1.023,0.391-1.414,0l0,0L7,8.415l-5.293,5.292
					c-0.36,0.36-0.928,0.389-1.32,0.083l-0.094-0.083c-0.391-0.391-0.391-1.023,0-1.414l0,0L5.585,7L0.293,1.707
					c-0.36-0.36-0.388-0.928-0.083-1.32L0.293,0.293z"/>
			</g>
		</g>
	</g>
</g>`;

  if ((userQuery.value).length > 1) {
    //llamar al endpoint sugerencias
    async function search_suggestions() {
      let link = `${tags_URL + giphy_SUGGESTIONS_endopoint + userQuery.value}?&api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef`;
      //let link = `${tags_URL + giphy_SUGGESTIONS_endopoint}?&api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef&q=${userQuery.value}`;
      let response = await fetch(link);
      let JSON_response = await response.json();
      let data = JSON_response.data;
      return data;
    }
    search_suggestions()
      .then(response => {
        autocompleteArray = response;
        show_suggestions(autocompleteArray)
      })
      .catch(error => console.log(error));
  }
});
userQuery.addEventListener('input', () => {//keyup
  if (userQuery.value.length > 0) {
    // llamar al endpoint autocomplete
    async function autocomplete_request() {
      let link = `${tags_URL + giphy_AUTOCOMPLETE_endpoint}?api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef&q=${userQuery.value}`;
      let response = await fetch(link);
      let JSON_response = await response.json();
      let data = JSON_response.data;
      return data;
    }
    autocomplete_request()
      .then(response => {        
        show_autocomplete(response);        
      })
      .catch(error => console.log(error));    
  } else {
    autocomplete.innerHTML = '';
    userQuery.placeholder = '';
  }
})

function show_autocomplete(array){
  let input = userQuery.value;
  autocomplete.innerText=`${input}`;  

    for (let i = 0; i < array.length; i++) {
      if (array[i].name.match(input)) {
        autocomplete.innerText += array[i].name.slice(input.length, array[i].name.length);
        break;
      }
    }
}
/*userQuery.addEventListener('input', (e) => {//keydown
	if(userQuery.value.length <= 1 && e.keyCode == 8){
		autocomplete.innerHTML = '';
  }
})*/


function show_suggestions(response) {

  for (i = 0; i < search_inputs.length; i++) {
    search_inputs[i].style.display = "flex";
    let text_input = terms[i];
    let value = response[i].name;
    text_input.value = value;
  }
}
// ocultar las sugerencias cuando se dispara la búsqueda
function hide_suggestions() {
  lupa.style.visibility = "hidden";
  userQuery.style.borderBottom="none";
  for (i = 0; i < search_inputs.length; i++) {
    search_inputs[i].style.display = "none";   
  }

}
// crea un event listener que dispara la búsqueda al hacer click en al elegir una palabra desde autocompletar
autocomplete.addEventListener("click", () => {
  query.value = autocomplete.innerText;
  console.log("click");
  autocomplete.innerText = "";
  deleted_input = searchBox.removeChild(autocomplete_field);
  hide_suggestions();
  close_search = document.getElementById("close");
  title.innerText = `${query.value}`;
  title.style.display = "block";
  let url = `https://api.giphy.com/v1/gifs/search?api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef&q=${query.value}`;
    showGIFS(url)
      .then(response => {
        console.log(response);

        if (response.length != 0) {
          empty_search.classList.add("d-none");
          resultados = response;
          displayResults(resultados, 0, 12);
        } else {
          empty_search.classList.remove("d-none");
          console.log("No hay resultados para ese término");
        }
      })
      .catch(error => console.log(error));  
});


//crea un event listener por cada término de sugerencias, que puede ser clickeado y dispara la búsqueda en GIPHY

for (i = 0; i < search_inputs.length; i++) {
  let kw = terms[i];

  search_inputs[i].addEventListener("click", () => {
    query.value = kw.value;
    title.innerText = `${query.value}`; //mostrar el criterio de búsqueda en el h1 de resultados(contenedor de gifs)
    title.style.display = "block";
    deleted_input = searchBox.removeChild(autocomplete_field);
    hide_suggestions();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef&q=${query.value}`;
    showGIFS(url)
      .then(response => {
        console.log(response);
        if (response.length != 0) {
          empty_search.classList.add("d-none");
          resultados = response;
          displayResults(resultados, 0, 12);
        } else {
          empty_search.classList.remove("d-none");
          console.log("No hay resultados para ese término");
        }
      })
      .catch(error => console.log(error));
  })
}

//disparar búsqueda con icono lupa

lupa.addEventListener('click', () => {
  title.innerText = `${query.value}`; //mostrar el criterio de búsqueda en el h1 de resultados(contenedor de gifs)
  title.style.display = "block";
  deleted_input = searchBox.removeChild(autocomplete_field);
  hide_suggestions();
  let url = `https://api.giphy.com/v1/gifs/search?api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef&q=${query.value}`;
  showGIFS(url)
    .then(response => {
      console.log(response);
      if (response.length != 0) {
        empty_search.classList.add("d-none");
        resultados = response;
        displayResults(resultados, 0, 12);
      } else {
        empty_search.classList.remove("d-none");
        console.log("No hay resultados para ese término");
      }
    })
    .catch(error => console.log(error));
})

//disparar búsqueda con enter
query.addEventListener("keyup", (e) => {
  if (e.key === 13 || e.key === "Enter") {
    console.log("Enter");
    title.innerText = `${query.value}`; //mostrar el criterio de búsqueda en el h1 de resultados(contenedor de gifs)
    title.style.display = "block";
    deleted_input = searchBox.removeChild(autocomplete_field);
    hide_suggestions();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef&q=${query.value}`;
    showGIFS(url)
      .then(response => {
        console.log(response);

        if (response.length != 0) {
          empty_search.classList.add("d-none");
          resultados = response;
          displayResults(resultados, 0, 12);
        } else {
          empty_search.classList.remove("d-none");
          console.log("No hay resultados para ese término");
        }
      })
      .catch(error => console.log(error));
  }
})

//realizar la búsqueda y devolver resultados de GIPHY
async function showGIFS(url) {
  let response = await fetch(url);
  let JSON_array = await response.json();
  let gifs_data = JSON_array.data;
  return gifs_data;
}

//mostrar los 12 primeros resultados en el home
function displayResults(array, posicion, longitud) {
  const results_container = document.querySelector("#results-container");
  results_container.classList.remove("d-none");
  trends_headings.classList.add("d-none");
  section_container.style.paddingBottom = "5rem";
  view_more_btn.classList.replace("d-none", "d-block");
  if ((array.length) <= 14) {
    view_more_btn.classList.replace("d-block", "d-none");
    console.log("La longitud del array es " + array.length)
  }


  let i = posicion;
  if (array.length < 12) {
    longitud = array.length;
  }

  for (i; i < longitud; i++) {

    let DIV = document.createElement("div");
    DIV.setAttribute("class", "gif");
    DIV.classList.add("small");
    results_container.appendChild(DIV);
    DIV.innerHTML = `<img class="gif-img search-img" src=${array[i].images.fixed_height_downsampled.url} id="${array[i].id}-img">
        <div class="gif-card small search-card">
        <div class="icon-btn">
                  <img src="./img/icon-fav-hover.svg" class="icon heart search-heart" id=${array[i].id}>
                </div>
                <div class="icon-btn">
                  <img src="./img/icon-download.svg" class="icon" id="${array[i].id}-dload">
                </div>
                <div class="icon-btn">
                  <img src="./img/icon-max.svg" class="icon" id="${array[i].id}-max">
                </div>
        <div class="user-details">
          <h6 class="user white-text" id="${array[i].id}-user">${array[i].username}</h6>
          <h5 class="gif-title white-text" id="${array[i].id}-title">${array[i].title}</h5>
        </div>
      </div>`;

    analizeFavs(array[i].id);

    let heart = document.getElementById(`${array[i].id}`);
    let gif_id = heart.getAttribute("id");
    let id = `${array[i].id}`;
    let download = document.getElementById(`${array[i].id}-dload`);
    let maximize = document.getElementById(`${array[i].id}-max`);
    let image = (document.getElementById(`${array[i].id}-img`)).src;
    let title = (document.getElementById(`${array[i].id}-title`).innerHTML);
    let username = (document.getElementById(`${array[i].id}-user`).innerHTML);

    //crear event listener para almacenar en Favoritos

    heart.addEventListener('click', () => {

      if (heart.getAttribute("src") == "./img/icon-fav-active.svg") {
        heart.setAttribute("src", "./img/icon-fav-hover.svg");
        console.log("Me desfavoriteo");
        //quiere decir que existe en localSrorage como favorito, hay que desfavoritearlo y psar el corazon a blanco

        console.log(gif_id);
        deleteFav(gif_id);

      }
      else {
        heart.setAttribute("src", "./img/icon-fav-active.svg");
        console.log("Me tengo que favoritear");
        addFav(gif_id);
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

    maximize.addEventListener('click', () => {

      gifoMax_cards[0].style.display = "grid";
      max_heart[0].setAttribute("id", `${id}`);
      max_heart[0].src = `${heart.src}`;
      gifo_container.innerHTML = `<img src=${image} class="gif-content" id="max-img">`;
      gifoMax_title.innerText = `${title}`;
      gifoMax_user.innerText = `${username}`;
    });

  } //FIN DEL CICLO FOR


  array.splice(0, 12);
  remaindersArray = array;

  //mostrar las tarjetas en hover solo a partir devices 1024px > para dispositivos menores mostrar gifoMax cuando se hace click sobre la tarjeta
  if (window.innerWidth >= 1024) {
    show_hide_gifCards();
  } else {
    let gif_imgs = document.getElementsByClassName("search-img");
    let gif_cards = document.getElementsByClassName("search-card");
    let hearts = document.getElementsByClassName("search-heart");

    let i;

    for (i = 0; i < gif_imgs.length; i++) {
      let gif_card = gif_cards[i];
      let gif_img = gif_imgs[i];
      let id = hearts[i].id;
      console.log(id);
      let image = gif_img.src;
      let gifo_title = document.getElementById(`${id}-title`);
      let gifo_user = document.getElementById(`${id}-user`);

      gif_img.addEventListener('click', () => {
        gif_card.style.display = "hidden";
        gifoMax_cards[0].style.display = "grid";
        max_heart[0].setAttribute("id", `${id}`);
        analizeFavs(id);
        gifo_container.innerHTML = `<img src=${image} class="gif-content" id="max-img">`;
        gifoMax_title.innerText = `${gifo_title.innerHTML}`;
        gifoMax_user.innerText = `${gifo_user.innerHTML}`;
      });
    }
  }
}

//mostrar más resultados
view_more_btn.addEventListener('click', () => {
  displayResults(remaindersArray, 0, 12);

})

//refrescar búsqueda
close_search.addEventListener("click", () => document.location.reload());













