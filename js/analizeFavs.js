//comprobar si el id ya existe como favorito en localStorage para mostrarlo con el corazon violeta

function analizeFavs(id){
  let heart;

if (JSON.parse(localStorage.getItem("favs"))){
          favourite_GIFOS = JSON.parse(localStorage.getItem("favs"));
          
          for (i = 0; i<favourite_GIFOS.length; i++){
            if (favourite_GIFOS[i].id == id && favourite_GIFOS[i].fav == true){
                
                heart = document.getElementById(id);
                heart.src=`./img/icon-fav-active.svg`;    //existe en localStorage como fav          
            } else if (favourite_GIFOS[i].id == id && favourite_GIFOS[i].fav == false) {
                heart = document.getElementById(id);
                 heart.src=`./img/icon-fav-hover.svg`; //existe en localStorage desfavoriteado
            } 
          }
        }

        
else {
    console.log ("No hay nada guardado en local Storage");
    heart = document.getElementById(id);
    heart.src=`./img/icon-fav-hover.svg`
}
}



function deleteFav(id){

  favourite_GIFOS = JSON.parse(localStorage.getItem("favs"));
        
        for (i = 0; i<favourite_GIFOS.length; i++){
          if (favourite_GIFOS[i].id == id){              
              
              favourite_GIFOS[i].fav = false;
              localStorage.setItem("favs", JSON.stringify(favourite_GIFOS));

          } 
        }

}

function addFav(id){
  let isStorage;
  if (JSON.parse(localStorage.getItem("favs"))){
    favourite_GIFOS = JSON.parse(localStorage.getItem("favs"));
    console.log(favourite_GIFOS.length);

    for (i = 0; i<favourite_GIFOS.length; i++){
      if ((favourite_GIFOS[i].id) == id && (favourite_GIFOS[i].fav) == false){              
          
          favourite_GIFOS[i].fav = true;
          console.log("Me encontré, me cambié y salgo del ciclo");
          console.log(favourite_GIFOS[i]);
          isStorage=true;
          break;
          
      }      
      else { 
        isStorage = false;
        console.log("Hay contenidos pero no es el gif que querés guardar. La bandera es "+ isStorage)
        console.log(favourite_GIFOS[i]);                
      } 
    }
    if (isStorage == false){
      let image = (document.getElementById(`${id}-img`)).src;
      let title = (document.getElementById(`${id}-title`).innerHTML);
      let username = (document.getElementById(`${id}-user`).innerHTML);
      let gifo = new Gifo(id, image, title, username, true); //almacena un Gifo favorito nuevo en localStorage
      console.log(gifo);
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