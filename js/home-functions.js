
const hamburger = document.getElementById("hamburger");
const close_nav = document.getElementById("close-nav");
const nav = document.getElementById("nav");
let create_GIFO_btn = document.getElementsByClassName("create-btn");
let theme_switcher = document.getElementsByClassName("theme-switcher");
let header = document.getElementsByClassName("desktop-header");

// mostrar y ocultar menu mobile

function showMenu() {   
   nav.classList.toggle("visible");
   hamburger.classList.toggle("d-none");
   close_nav.classList.remove("d-none");
}
function hideMenu(){
   nav.classList.toggle("visible");
   hamburger.classList.toggle("d-none");
   close_nav.classList.add("d-none");
}


//mostrar el logo y nav que corresponde de acuerdo al dispositivo
/*function showLogo() {
let logo_mobile = document.querySelector('#logo-mobile');
let logo_desktop = document.querySelector('#logo-desktop');
if (window.innerWidth <1024){
   logo_desktop.style.display="none";
   
} else {
   logo_mobile.style.display="none";
   hamburger.classList.add("d-none");
}
}*/

// ir al html Crear GIFOS al hacer click en el botón del nav

for (i = 0; i < create_GIFO_btn.length; i++) { 
   create_GIFO_btn[i].addEventListener("click", () => document.location.href = "./crear-gifo.html");
}
//función que togglea entre clases

function toggleClasses(array, clase) {
   for (i = 0; i < array.length; i++) {
      array[i].classList.toggle(clase);
   }
}

// alternar theme colors entre modo diurno y modo nocturno

function switchTheme() {

   let body = document.getElementsByTagName("body");
   let H1 = document.getElementsByTagName("h1");
   let H2 = document.getElementsByTagName("h2");
   let H3 = document.getElementsByTagName("h3");
   let ligthGrey_bg = document.getElementsByClassName("grey-bg");
   let navMenu = document.getElementsByTagName("nav");
   let GIFOS_logo = document.getElementsByClassName("GIFOS-text");
   let hamburger = document.getElementsByClassName("hamburger");
   let top_bar = document.getElementsByClassName("top-bar");
   let search_form = document.getElementsByTagName("form");
   let view_more_btn = document.getElementsByClassName("btn-view-more");
   let rss_icons = document.getElementsByClassName("rss-icons");
   let gifoMax_cards = document.getElementsByClassName("gifo-max");
   let gifoMax_cards_user = document.getElementsByClassName("user");
   let gifoMax_cards_title = document.getElementsByClassName("gif-title");
   let arrow_left = document.getElementsByClassName("arrow-left");
   let arrow_right = document.getElementsByClassName("arrow-right");
   let desktop_header = document.getElementsByClassName("desktop-header");
   let search_term = document.getElementsByClassName("search-query");
   let trends_p = document.getElementsByClassName("trends");
   let autocomplete = document.getElementsByClassName("autocomplete");
   let creator_numbers = document.getElementsByClassName("number");
   let light_texts = document.getElementsByClassName("light-mode_texts");
   let cameraSVG = document.getElementById("camera");
   let peliculaSVG = document.getElementById("pelicula");
   let page_location = String(window.location.pathname);
   let isCrearGifos = page_location.includes("crear-gifo.html");  
   

   toggleClasses(body, "dark-mode_body");
   toggleClasses(H1, "dark-mode_texts");
   toggleClasses(H2, "dark-mode_texts");
   toggleClasses(H3, "dark-mode_texts");
   toggleClasses(ligthGrey_bg, "dark-grey-bg");
   toggleClasses(navMenu, "dark-mode_nav");
   toggleClasses(GIFOS_logo, "dark-mode_GIFOS-text");
   toggleClasses(hamburger, "dark-mode_hamburger");
   toggleClasses(top_bar, "dark-mode_top-bar");
   toggleClasses(search_form, "dark-mode_form");
   toggleClasses(view_more_btn, "dark-mode_btn-view-more");
   toggleClasses(rss_icons, "dark-mode_rss-icons");
   toggleClasses(gifoMax_cards, "dark-mode_gifo-max");
   toggleClasses(gifoMax_cards_user, "dark-mode_user");
   toggleClasses(gifoMax_cards_title, "dark-mode_gif-title");
   toggleClasses(arrow_left, "dark-mode_arrow-left");
   toggleClasses(arrow_right, "dark-mode_arrow-right");
   toggleClasses(create_GIFO_btn, "dark-mode_create-btn");
   toggleClasses(desktop_header, "dark-mode_desktop-header");
   toggleClasses(search_term, "dark_mode-search-query");
   toggleClasses(trends_p,"dark-mode_trends");
   toggleClasses(autocomplete, "dark-mode_autocomplete");
   toggleClasses(creator_numbers, "dark-mode_number");
   toggleClasses(light_texts, "dark-mode_texts");
   
   
   if (isCrearGifos){
   let dark = (cameraSVG.src.indexOf("nocturno")>0);
   if (!dark){
      cameraSVG.src = "./img/camara-con-luz-nocturno.svg";
      peliculaSVG.src = "./img/pelicula-modo-noc.svg";
   } else {
      cameraSVG.src = "./img/camara-con-luz.svg";
      peliculaSVG.src = "./img/pelicula.svg";
   }
}
   
   
    



// Almacenar la elección del modo en localStorage (diurno/nocturno)

   document.body.classList.contains("dark-mode_body") ? localStorage.setItem("dark_mode", "true") : localStorage.setItem("dark_mode", "false");
}
//cambiar el texto en en el link de menú (Modo diurno / Modo Nocturno)

function switch_LinkText() {

   if (theme_switcher[0].innerText == "Modo Nocturno" || theme_switcher[0].innerText == "MODO NOCTURNO") {
      theme_switcher[0].innerText = "Modo Diurno";
   } else if (theme_switcher[0].innerText == "Modo Diurno" || theme_switcher[0].innerText == "MODO DIURNO") {
      theme_switcher[0].innerText = "Modo Nocturno";
   }
}
//MANTENER la elección de modo (diurno/nocturno) en navegación entre páginas
function keep_theme() {
   if (localStorage.getItem("dark_mode") == "true") {
      theme_switcher[0].innerText = "Modo Diurno";
      switchTheme();        

   }
};
//aplicar SHADOW al header desktop cuando hay scroll
function apply_shadow() {
   let i;
   for (i = 0; i < header.length; i++) {   
      if (window.innerWidth >= 1024) {
         header[i].style.boxShadow = "0 2px 4px 1px rgba(156,175,195,0.55)";
      }
   }
}


document.body.onload = keep_theme;
document.body.onscroll = apply_shadow;
hamburger.addEventListener('click', showMenu);
close_nav.addEventListener('click', hideMenu);
theme_switcher[0].addEventListener('click', switchTheme);
theme_switcher[0].addEventListener('click', switch_LinkText);






