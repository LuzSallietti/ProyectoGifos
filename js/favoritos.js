
//Mostrar los gifos favoritos en página Favoritos

const favs_container = document.querySelector("#favs-container");
const view_more_btn = document.getElementById("view-more");
const empty_favs=document.getElementById("empty-favs")
let remainders_Favs;
let favourites_storage = JSON.parse(localStorage.getItem("favs"));

document.onload = (JSON.parse(localStorage.getItem("favs"))) ? displayFavs(favourites_storage,0 ,12) : empty_favs.classList.replace("d-none", "d-block"); //si el key no existe en localStorage, mostrar diseño de Favoritos sin contenido


function displayFavs(array, posicion, longitud){
    

/*let array = JSON.parse(localStorage.getItem("favs")); // tomar el array de localStorage*/

favs_container.classList.remove("d-none");  
view_more_btn.classList.replace("d-none", "d-block");

//ocultar botón cuando hay menos de 12 resultados por mostrar
if ((array.length) <= 12) {
  view_more_btn.classList.replace("d-block", "d-none");
  console.log("La longitud del array es " + array.length)
}
let i=posicion; 

if (array.length<12){
  longitud = array.length;
}

for (i = 0; i < longitud; i++){
  
  console.log(array);  
    let DIV = document.createElement("div");
    DIV.setAttribute("class", "gif");
    DIV.classList.add("small");
    favs_container.appendChild(DIV);
    DIV.innerHTML = `<img src=${array[i].src} id="${array[i].id}-img">
        <div class="gif-card small">
        <div class="icon-btn">
        <img src="./img/icon-fav-active.svg" class="icon" id="${array[i].id}">
      </div>
      <div class="icon-btn">
        <img src="./img/icon-download.svg" class="icon" id="${array[i].id}-dload">
      </div>
      <div class="icon-btn">
        <img src="./img/icon-max.svg" class="icon" id="${array[i].id}-max">
      </div>
        <div class="user-details">
          <h6 class="user white-text" id="${array[i].id}-user">${array[i].user}</h6>
          <h5 class="gif-title white-text" id="${array[i].id}-title">${array[i].title}</h5>
        </div>
      </div>`;

    let heart = document.getElementById(`${array[i].id}`); //sirve para algo usar el heart? desfavoritear?
    let download = document.getElementById(`${array[i].id}-dload`);
    let maximize = document.getElementById(`${array[i].id}-max`);
    let image = (document.getElementById(`${array[i].id}-img`)).src;
    let title = (document.getElementById(`${array[i].id}-title`).innerHTML);
    let username = (document.getElementById(`${array[i].id}-user`).innerHTML);

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

  }
  if (window.innerWidth >= 1024) {
    show_hide_gifCards();
  }

  array.splice(0, 12);
  remainders_Favs = array;

}
//mostrar más resultados
view_more_btn.addEventListener('click', () => {
  displayFavs(remainders_Favs, 0, 12);

}) 







