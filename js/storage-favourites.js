let favourite_GIFOS; //array donde se almacenan los GIFOS elegidos en home
//clase que define las propiedades de los nuevos objetos que se instancian y almacenan como favoritos en localStorage
class Gifo {
    constructor(id , src, title, user, fav) {
        this.id = id;
        this.src = src;
        this.title = title;
        this.user = user;
        this.fav = fav;
    }
}