//llamar API Giphy
let giphySearch = "http://api.giphy.com/v1/gifs/search?"
let APIKEY = "&api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef";
let searchQuery = "q=luis+miguel";
let searchLimit = "&limit=3";

let url = `${giphySearch + searchQuery + APIKEY + searchLimit}`;
console.log(url);

"http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef&limit=5"



// mostrar menu mobile
let hamburger = document.getElementById("hamburger");
hamburger.addEventListener('click', showMenu);

function showMenu() {
   let nav = document.getElementById("nav");
   nav.classList.toggle("visible");
   hamburger.classList.toggle("fa-times");
}


// alternar theme colors entre modo diurno y modo nocturno

const theme_switcher = document.getElementById("theme-switcher");
theme_switcher.addEventListener('click', switchTheme);

function switchTheme() {

   let body = document.getElementsByTagName("body");
   let H1 = document.getElementsByTagName("h1");
   let H2 = document.getElementsByTagName("h2");
   let H3 = document.getElementsByTagName("h3");
   let ligthGrey_bg = document.getElementsByClassName("grey-bg");
   let navMenu = document.getElementsByTagName("nav");
   let GIFOS_logo = document.getElementById("GIFOS-text");
   let hamburger = document.getElementsByClassName("hamburger");
   let top_bar = document.getElementsByClassName("top-bar");
   let search_form = document.getElementsByTagName("form");
   let search_icon = document.getElementById("path-1_1_");



   //función que togglea entre clases

   function toggleClasses(array, clase) {
      for (i = 0; i < array.length; i++) {
         array[i].classList.toggle(clase);
      }
   }

   toggleClasses(body, "dark-mode_body");
   toggleClasses(H1, "dark-mode_texts");
   toggleClasses(H2, "dark-mode_texts");
   toggleClasses(H3, "dark-mode_texts");
   toggleClasses(ligthGrey_bg, "dark-grey-bg");
   toggleClasses(navMenu, "dark-mode_nav");
   toggleClasses(hamburger, "dark-mode_hamburger");
   toggleClasses(top_bar, "dark-mode_top-bar");
   toggleClasses(search_form, "dark-mode_form");

   //función que alterna los valores de atributos en los elementos SVG

   function changeAttributes(element, atributte, originalValue, newValue) {
      element.getAttribute(atributte) == originalValue ? element.setAttribute(atributte, newValue) : element.setAttribute(atributte, originalValue);


   }

   changeAttributes(GIFOS_logo, "fill", "#572EE5", "#fff");
   changeAttributes(search_icon, "fill", "#572EE5", "#fff")

   //cambiar el texto en en el link de menú (Modo diurno / Modo Nocturno)

   theme_switcher.innerText == "Modo Nocturno" ? theme_switcher.innerText = "Modo Diurno" : theme_switcher.innerText = "Modo Nocturno";



}

//carrusel tendencias

let gifs_carousel = document.getElementById("carousel");
gifs_carousel.addEventListener("click", () => {
   let position = 250;
   setInterval(() => {
      gifs_carousel.style.right = `${position}px`;
      gifs_carousel.style.trasition = "all ease";
      position = position + 250;
   }, 2000);
});