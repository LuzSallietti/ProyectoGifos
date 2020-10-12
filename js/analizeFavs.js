//comprobar si el id ya existe como favorito en localStorage para mostrarlo con el corazon violeta
function analizeFavs(id) {
  let i;
  let heart = document.getElementById(id);
  let favourites = JSON.parse(localStorage.getItem("favs"));
  let favourite;

  if (favourites) {
    for (i = 0; i < favourites.length; i++) {
      favourite = favourites[i];
      if (favourite.id === id) {
        if (favourite.fav === true) {
          heart.src = "./img/icon-fav-active.svg";    //existe en localStorage como fav          
        }
        else {
          heart.src = "./img/icon-fav-hover.svg"; //existe en localStorage desfavoriteado          
        }
      }
    }
  }
  else {
    //no hay nada guardado en localStorage como favs
    heart.src = `./img/icon-fav-hover.svg`
  }
}

function deleteFav(id) {

  favourite_GIFOS = JSON.parse(localStorage.getItem("favs"));
  let i;
  for (i = 0; i < favourite_GIFOS.length; i++) {
    if (favourite_GIFOS[i].id == id) {
      favourite_GIFOS[i].fav = false;
      localStorage.setItem("favs", JSON.stringify(favourite_GIFOS));

    }
  }
}

function addFav(id) {
  let isStorage;
  let i;
  if (JSON.parse(localStorage.getItem("favs"))) {
    favourite_GIFOS = JSON.parse(localStorage.getItem("favs"));    
    
    for (i = 0; i < favourite_GIFOS.length; i++) {
      if ((favourite_GIFOS[i].id) == id && (favourite_GIFOS[i].fav) == false) {
        favourite_GIFOS[i].fav = true; // ya estaba almacenado, vuelve a ser favorito        
        isStorage = true;
        break;
      } else if ((favourite_GIFOS[i].id) == id && (favourite_GIFOS[i].fav) == true){        
        isStorage = true; // ya existe como favorito
        break;
      }
      else {
        isStorage = false; //hay contenidos en localStorage, pero ninguno coincide con el gif que el usuario quiere guardar        
      }
    }
    if (isStorage == false) {
      let image = (document.getElementById(`${id}-img`)).src;
      let title = (document.getElementById(`${id}-title`).innerHTML);
      let username = (document.getElementById(`${id}-user`).innerHTML);
      let gifo = new Gifo(id, image, title, username, true); //almacena un Gifo favorito nuevo en localStorage      
      favourite_GIFOS.push(gifo);
    }

  } else {
    let image = (document.getElementById(`${id}-img`)).src;
    let title = (document.getElementById(`${id}-title`).innerHTML);
    let username = (document.getElementById(`${id}-user`).innerHTML);
    let gifo = new Gifo(id, image, title, username, true); //almacena por primera vez un Gifo en localStorage
    console.log(gifo);
    favourite_GIFOS = [];
    favourite_GIFOS.push(gifo);
  }
  localStorage.setItem("favs", JSON.stringify(favourite_GIFOS));
}