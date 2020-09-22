const tags_URL = "http://api.giphy.com/v1/"
const giphy_SUGGESTIONS_endopoint = "gifs/search/tags"
let userQuery = document.querySelector("#userQuery");
let form = document.getElementById("search-form");
const view_more_btn = document.getElementById("view-more");
const empty_search = document.getElementById("empty-search");
let query = document.getElementById("userQuery");
let search_inputs = document.getElementsByClassName("suggestions");
let terms = document.getElementsByClassName("giphy-terms");
const lupa = document.getElementById("lupa");
let title = document.getElementById("search-kw");
let autocompleteArray;
let resultados;
let remaindersArray;



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

    async function search_suggestions() {
      let link = `${tags_URL + giphy_SUGGESTIONS_endopoint}?&api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef&q=${userQuery.value}`;
      let response = await fetch(link);
      let JSON_response = await response.json();
      let data = JSON_response.data;
      return data;
    }
    search_suggestions()
      .then(response => {        
        autocompleteArray = response;        
        show_suggestions(autocompleteArray)})
      .catch(error => console.log(error));
  }
});


function show_suggestions(response) { 
  
  for (i = 0; i < search_inputs.length; i++) {

    search_inputs[i].style.display = "flex";
    let text_input=terms[i];
    let value = response[i].name; 
    text_input.value = value;

  }

}

for (i=0; i<search_inputs.length;i++){
let kw = terms[i];

search_inputs[i].addEventListener("click", () => { //un event listener por cada término que puede ser clickeado y dispara la búsqueda en GIPHY            
  
  query.value=kw.value;
  
  let url = `http://api.giphy.com/v1/gifs/search?api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef&q=${query.value}`;
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
  let url = `http://api.giphy.com/v1/gifs/search?api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef&q=${query.value}`;
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
  console.log(url);
  let response = await fetch(url);
  let JSON_array = await response.json();
  let gifs_data = JSON_array.data;


  return gifs_data;
}




//mostrar los 12 primeros resultados en el home

function displayResults(array, posicion, longitud) {

  const results_container = document.querySelector("#results-container");
  results_container.classList.remove("d-none");
  view_more_btn.classList.replace("d-none", "d-block");

  let i = posicion;

  for (i; i < longitud; i++) {

    let DIV = document.createElement("div");
    DIV.setAttribute("class", "gif");
    DIV.classList.add("small");
    results_container.appendChild(DIV);
    DIV.innerHTML = `<img class="gif-img" src=${array[i].images.fixed_height_downsampled.url}>
        <div class="gif-card small">
        <div class="icon-btn">
                  <img src="./img/icon-fav-hover.svg" class="icon heart">
                </div>
                <div class="icon-btn">
                  <img src="./img/icon-download.svg" class="icon">
                </div>
                <div class="icon-btn">
                  <img src="./img/icon-max.svg" class="icon">
                </div>
        <div class="user-details">
          <h6 class="user white-text">${array[i].username}</h6>
          <h5 class="gif-title white-text">${array[i].title}</h5>
        </div>
      </div>`;
  }
  array.splice(0, 12);
  remaindersArray = array;


  if (array.length == 2) {
    view_more_btn.classList.replace("d-block", "d-none");
  }


  show_hide_gifCards();
  saveFav();//acá podría llamar a la función favoritos/corregir porque está creando un event listener por c/ciclo

}

//mostrar más resultados
view_more_btn.addEventListener('click', () => {
  displayResults(remaindersArray, 0, 12);
})












