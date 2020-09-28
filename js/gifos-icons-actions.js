function iconsEvents(array){
    let heart = document.getElementById(`${array[i].id}`);
        let id = `${array[i].id}`;
        let download = document.getElementById(`${array[i].id}-dload`);
        let maximize = document.getElementById(`${array[i].id}-max`);
        let image = (document.getElementById(`${array[i].id}-img`)).src;
        let title = (document.getElementById(`${array[i].id}-title`).innerHTML);
        let username = (document.getElementById(`${array[i].id}-user`).innerHTML);

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
        if (window.innerWidth < 1024){
            let trending_DIV= document.getElementsByClassName("trending");
            trending_DIV[i].addEventListener('click', () => {
            gifoMax_cards[0].style.display="grid";   
            max_heart[0].setAttribute("id", `${heart.id}`);      
            gifo_container.innerHTML=`<img src=${image} class="gif-content" id="max-img">`;
            gifoMax_title.innerText=`${title}`;
            gifoMax_user.innerText=`${username}`;  
            });
        }  
}