
//Mostrar los gifos favoritos en página Favoritos

const favs_container = document.querySelector("#favs-container");
const view_more_btn = document.getElementById("view-more");
const empty_favs=document.getElementById("empty-favs")

document.onload = displayFavs();

function displayFavs(){
    if(JSON.parse(localStorage.getItem("favs"))) {
let favourites_storage = JSON.parse(localStorage.getItem("favs")); //tomar el array de localStorage



favs_container.classList.remove("d-none");  
view_more_btn.classList.replace("d-none", "d-block");  


for (i=0; i<favourites_storage.length; i++){
    
    let DIV = document.createElement("div");
    DIV.setAttribute("class", "gif");
    DIV.classList.add("small");
    favs_container.appendChild(DIV);
    DIV.innerHTML = `<img src=${favourites_storage[i].src}>
        <div class="gif-card small">
        <div class="icon-btn">
        <img src="./img/icon-fav-active.svg" class="icon">
      </div>
      <div class="icon-btn">
        <img src="./img/icon-download.svg" class="icon">
      </div>
      <div class="icon-btn">
        <img src="./img/icon-max.svg" class="icon">
      </div>
        <div class="user-details">
          <h6 class="user white-text">${favourites_storage[i].user}</h6>
          <h5 class="gif-title white-text">${favourites_storage[i].title}</h5>
        </div>
      </div>`;

  }
  show_hide_gifCards();

} else {
    empty_favs.classList.replace("d-none", "d-block");
}

}





