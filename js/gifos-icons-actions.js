function iconsEvents(id){
    let heart = document.getElementById(id);    
    let gif_id = heart.getAttribute("id");   
    let download = document.getElementById(`${id}-dload`);
    let maximize = document.getElementById(`${id}-max`);
    let image = (document.getElementById(`${id}-img`)).src;
    let title = (document.getElementById(`${id}-title`).innerHTML);
    let username = (document.getElementById(`${id}-user`).innerHTML);   
    
    //crear event listener para almacenar en Favoritos
    heart.addEventListener('click', () => {
        if (heart.getAttribute("src") == "./img/icon-fav-active.svg"){
            heart.setAttribute("src","./img/icon-fav-hover.svg");                    
            deleteFav(gif_id);
            //existe en localSrorage como favorito, desfavoritea y cambia el ícono
          }
          else {
            heart.setAttribute("src","./img/icon-fav-active.svg");                        
            addFav(gif_id);
            //no existe como favorito, o se tiene que volver a favoritear        
          }
    });
    //crear event listener para Descargar
    download.addEventListener('click', async () => {        
        let a = document.createElement('a');       
        let response = await fetch(image);
        let file = await response.blob();        
        a.download = `${title}`;
        a.href = window.URL.createObjectURL(file);        
        a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');       
        a.click();
    });
    //crear event listener para Maximizar y crear el contenido de la tarjeta Gifo-max
    maximize.addEventListener('click',() => {         
        gifoMax_cards[0].style.display="grid";     
        max_heart[0].setAttribute("id", `${heart.id}`);        
        analizeFavs(heart.id);      
        gifo_container.innerHTML=`<img src=${image} class="gif-content" id="max-img">`;
        gifoMax_title.innerText=`${title}`;
        gifoMax_user.innerText=`${username}`;      
    });     
}