//mostrar detalles de GIF e íconos (favorito, expandir, descargar) en hover (mouseover/mouseout)


function show_hide_gifCards(){
    let gif_cards = document.getElementsByClassName("gif-card");
    let gif_imgs = document.getElementsByClassName("gif");
    let i;
    
    for (i=0; i < gif_imgs.length; i++){        
        let card = gif_cards[i];  
        gif_imgs[i].addEventListener("mouseover",() => card.style.visibility = "visible");
        gif_imgs[i].addEventListener("mouseout", () => card.style.visibility = "hidden");
        
    }
    }