
class Gifo {
    constructor(src, title, user, fav) {
        this.src = src;
        this.title = title;
        this.user = user;
        this.fav = fav;

    }
}


const hearts = document.getElementsByClassName("heart");
const gif_img = document.getElementsByClassName("gif-img");
const gif_user = document.getElementsByClassName("user");
const gif_title = document.getElementsByClassName("gif-title");

let favourite_GIFOS;


function saveFav() {


    for (i = 0; i < hearts.length; i++) {
        console.log("estoy en el ciclo");
        //reemplazar corazón vacío por corazón purple
        let image = gif_img[i].src;
        let title = gif_title[i].innerHTML;
        let username = gif_user[i].innerHTML;


        hearts[i].addEventListener('click', () => {
            let gifo = new Gifo(image, title, username, true);
            console.log(gifo);
            if (JSON.parse(localStorage.getItem("favs"))) {
                favourite_GIFOS = JSON.parse(localStorage.getItem("favs"));
                favourite_GIFOS.push(gifo);
                localStorage.setItem("favs", JSON.stringify(favourite_GIFOS)); 
            } else {
                favourite_GIFOS = [];
                favourite_GIFOS.push(gifo);
                localStorage.setItem("favs", JSON.stringify(favourite_GIFOS));               
                
            };

        });
    }
}
