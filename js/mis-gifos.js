//Mostrar los gifos creados por el usuario en página Mis Gifos
const mis_gifos_section = document.getElementById("misGifos-section");
const mis_gifos_container = document.getElementById("mis-gifos-container");
const view_more_btn = document.getElementById("view-more");
const empty_mis_gifos = document.getElementById("empty-mis-gifos");
let remainders_misGifos;
let misGifos_storage = [];
//Evaluar si hay Mis Gifos almacenados (con valor true) para mostrarlos en la página

if (JSON.parse(localStorage.getItem("myGifos"))) {
    let misGifos = JSON.parse(localStorage.getItem("myGifos"));
    let i;
    for (i = 0; i < misGifos.length; i++) {
        if (misGifos[i].display == true) {
            misGifos_storage.push(misGifos[i]);
            console.log(misGifos_storage);
        }
    }
}
document.onload = (JSON.parse(localStorage.getItem("myGifos"))) ? displayMisGifos(misGifos_storage, 0, 12) : empty_mis_gifos.classList.replace("d-none", "d-block"); //si el key no existe en localStorage, mostrar diseño de Mis Gifos sin contenido

function displayMisGifos(array, posicion, longitud) {
    mis_gifos_container.classList.remove("d-none");
    view_more_btn.classList.replace("d-none", "d-block");
    mis_gifos_section.style.paddingBottom = "5rem"; //esto hace falta? revisar el diseño
    //ocultar botón cuando hay menos de 12 resultados por mostrar
    if ((array.length) <= 12) {
        view_more_btn.classList.replace("d-block", "d-none");
    }
    let i = posicion;

    if (array.length < 12) {
        longitud = array.length;
    }
    for (i = 0; i < longitud; i++) {
        let DIV = document.createElement("div");
        DIV.setAttribute("class", "gif");
        DIV.classList.add("small");
        mis_gifos_container.appendChild(DIV);
        DIV.innerHTML = `<img src=${array[i].src} id="${array[i].id}-mygifo-img">
            <div class="gif-card small">
            <div class="icon-btn">
            <img src="./img/icon_trash.svg" class="icon" id="mygifo-${array[i].id}" data-mgidentifier="${array[i].id}">
          </div>
          <div class="icon-btn">
            <img src="./img/icon-download.svg" class="icon" id="${array[i].id}-mygifo-dload">
          </div>
          <div class="icon-btn">
            <img src="./img/icon-max.svg" class="icon" id="${array[i].id}-mygifo-max">
          </div>
            <div class="user-details">
              <h6 class="user white-text" id="${array[i].id}-mygifo-user">${array[i].user}</h6>
              <h5 class="gif-title white-text" id="${array[i].id}-mygifo-title">${array[i].title}</h5>
            </div>
          </div>`;

        let trash = document.getElementById(`mygifo-${array[i].id}`);
        let gifo_id = `${trash.dataset.mgidentifier}`;
        console.log(gifo_id);
        let download = document.getElementById(`${array[i].id}-mygifo-dload`);
        let maximize = document.getElementById(`${array[i].id}-mygifo-max`);
        let image = (document.getElementById(`${array[i].id}-mygifo-img`)).src;
        let title = (document.getElementById(`${array[i].id}-mygifo-title`).innerHTML);
        let username = (document.getElementById(`${array[i].id}-mygifo-user`).innerHTML);

        //crear event listener para eliminar el gifo
        trash.addEventListener("click", () => {
            let myGifos = JSON.parse(localStorage.getItem("myGifos"));
            let i;
            console.log(gifo_id);
            for (i = 0; i < myGifos.length; i++) {
                if (gifo_id === myGifos[i].id) {
                    myGifos[i].display = false;
                    localStorage.setItem("myGifos", JSON.stringify(myGifos));
                    break;
                }
            }
            location.reload();
        })
    } //fin del ciclo for
}
