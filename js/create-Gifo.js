//clase que define las propiedades de los nuevos objetos Mis Gifos a instanciar y almacenar en localStorage
class MyGifos {
  constructor(id , src, title, user, display) {
      this.id = id;
      this.src = src;
      this.title = title;
      this.user = user;
      this.display = display;
  }
}
let storaged_GIFOS;
let myGifo;
let start_button = document.getElementById("start-button");
const img_element = document.getElementById("img-element");
const video_container = document.getElementById("video-container");
let upload_details= document.getElementById("upload-details");
let upload_icon = document.getElementById("loader");
const download_icon = document.getElementById("mygif-dload");
const share_icon = document.getElementById("mygif-share");
let myGif_btns = document.getElementById("upload-btns");
let loading_msg = document.getElementById("loading-msg");
let H1_main_title = document.getElementById("main-title");
let instructions_paragraph = document.getElementById("instructions");
let one_btn = document.getElementById("one-btn");
let two_btn = document.getElementById("two-btn");
let three_btn = document.getElementById("three-btn");
let record_counter= document.getElementById("record-counter");
const text_container=document.getElementById("text-container");
const GIPHY_KEY = 'ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef';
const key = '?api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef';
let url = `https://upload.giphy.com/v1/gifs?api_key=${GIPHY_KEY}`;
let urlGetById = 'https://api.giphy.com/v1/gifs/';
let camera;
let recorder;
let is_recording = false;
let gifId;
let gifUrl;
let seconds = document.getElementById("seconds");
let decimal = document.getElementById("decimal");
let minutes = document.getElementById("minutes");
let form;
let src;
let blob;
let contador=0;
let decimals=0;
let minutes_count=0
let clock = function(){
  contador=contador+1;
  if (contador==10){
    contador=0;
    decimals=decimals+1;
    if(decimals==6){
      decimals=0;
      minutes_count = minutes_count+1;
    }
  }              
  seconds.innerText=contador;
  decimal.innerText=decimals;
  minutes.innerText=minutes_count;       
}  
let interval;
//iniciar proceso de acceso a la cámara
function startCamera (){     
  if (!is_recording)      
      get_cam_access();
      getStreamAndRecord();
}
//almacenar el gifo creado en localStorage
function storage_my_gifo(myGifo){
  if (JSON.parse(localStorage.getItem("myGifos"))) {
    storaged_GIFOS = JSON.parse(localStorage.getItem("myGifos"));
    storaged_GIFOS.push(myGifo);
    localStorage.setItem("myGifos", JSON.stringify(storaged_GIFOS));
  } else {
    storaged_GIFOS = [];
    storaged_GIFOS.push(myGifo);
    localStorage.setItem("myGifos", JSON.stringify(storaged_GIFOS));
  }; 
}
//descargar el gifo creado
function generate_dload(url) {
    download_icon.addEventListener("click", async () => {     
      let a = document.createElement('a');      
      let response = await fetch(url);
      let file = await response.blob();     
      a.download = "Mi Gifo";
      a.href = window.URL.createObjectURL(file);      
      a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');      
      a.click();
  });
}
// ir a la sección Compartir en giphy
function generate_share(url){
  share_icon.addEventListener("click",() => {
    window.open(url)});
}   
// mostrar carga exitosa
function upload_succes(){
  upload_icon.src=`./img/check.svg`
  myGif_btns.style.visibility="visible";
  loading_msg.innerText="GIFO subido con éxito";
}  
//acceder a la cámara
function get_cam_access(){
    H1_main_title.innerText="¿Nos das acceso a tu cámara?";
    instructions_paragraph.innerText="El acceso a tu camara será válido solo por el tiempo en el que estés creando el GIFO."
    start_button.style.visibility="hidden";
    if (JSON.parse(localStorage.getItem("dark_mode")) == true){
      one_btn.style.backgroundColor="#fff";
      one_btn.style.color="#37383c";
      one_btn.style.border="1px solid #fff";
    } else {
    one_btn.style.backgroundColor="#572ee5";
    one_btn.style.color="#fff";
    }
}
//generar stream y grabar
function getStreamAndRecord () {     
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
       height: { max: 480 }
    }
 })
 .then(function(stream) {          
    video_container.srcObject = stream;    
    video_container.play()
    H1_main_title.style.visibility="hidden";
    instructions_paragraph.style.visibility="hidden";
    if (JSON.parse(localStorage.getItem("dark_mode")) == true){
      one_btn.style.backgroundColor="#37383c";
      one_btn.style.color="#fff";
      two_btn.style.color="#37383c";
      one_btn.style.border="1px solid #fff";
      two_btn.style.backgroundColor="#fff";
      two_btn.style.border="1px solid #fff";
    } else {
      one_btn.style.backgroundColor="#fff";
      one_btn.style.color="#572ee5";
      two_btn.style.color="#fff";
      two_btn.style.backgroundColor="#572ee5";
    }    
    start_button.style.visibility="visible";
    start_button.removeEventListener("click",startCamera);
    start_button.innerText="Grabar";
    start_button.addEventListener("click", startRecord);
})
.catch(error => {
  console.log(error);
  H1_main_title.innerText="No detectamos tu cámara";
  instructions_paragraph.innerText="Revisa tu dispositivo y recarga la página."
  start_button.style.visibility="hidden";
  });
 }
//grabar con RecordRTC
 function startRecord(){
    start_button.removeEventListener("click", startRecord);
    start_button.innerText="Finalizar";
    let recorder_options = {
        video: true,
        audio: false,
        type: "gif",
      };
    let camera = video_container.srcObject;            
    recorder = RecordRTC(camera, recorder_options);
            recorder.startRecording();
            recorder.camera = camera;
            is_recording = true;
    interval = setInterval(clock, 1000);  
    start_button.addEventListener("click", stop_recording);
 }
//detener la grabación
function stop_recording() {
  clearInterval(interval);
    recorder.stopRecording();    
    record_counter.innerHTML=`<p id="repeat-capture">REPETIR CAPTURA</p>`;   
    record_counter.addEventListener("click", () => {
      location.reload();      
    });
    start_button.removeEventListener("click", stop_recording);
    start_button.innerText="Subir GIFO";              
    recorder.camera.stop();    
    blob = recorder.getBlob();
    console.log(blob);
    src = URL.createObjectURL(blob);            
    img_element.src = src;
    img_element.classList.remove("d-none");
    recorder.destroy();
    recorder = null;
    video_container.srcObject = null;
    is_recording = false;
    start_button.addEventListener("click", upload_gif);    
  }
//subir el gifo a Giphy
function upload_gif(){
    upload_details.style.visibility="visible";
    start_button.removeEventListener("click",upload_gif);
    start_button.style.visibility="hidden";
    record_counter.style.display="none";
    if (JSON.parse(localStorage.getItem("dark_mode"))==true){
      two_btn.style.backgroundColor="#37383c";
      two_btn.style.color="#fff";
      two_btn.style.border="1px solid #fff";
      three_btn.style.color="#37383c";
      three_btn.style.backgroundColor="#fff";
      three_btn.style.border="1px solid #fff";
    } else { 
      two_btn.style.backgroundColor="#fff";
      two_btn.style.color="#572ee5";
      three_btn.style.color="#fff";
      three_btn.style.backgroundColor="#572ee5";
    } 
    form = new FormData();
    form.append("file", blob, 'migifo.gif');   
    fetch(url, {
      method:'POST',
      body: form
    })
    .then(res => res.json())
    .then(data => {
      gifId = data.data.id;
      console.log(gifId);
      fetch(urlGetById+gifId+key)
        .then(res => res.json())
        .then(data => {
          gifUrl = data.data.images.original.url
          console.log(data.data.images.original.url);
          upload_succes();
          generate_dload(gifUrl);
          generate_share(gifUrl);
          myGifo= new MyGifos(data.data.id, gifUrl, data.data.title, data.data.username, true);
          console.log(myGifo);
          storage_my_gifo(myGifo);
        })
        .catch (error => {
          console.log (error);
          loading_msg.innerText="Ups! Hubo un error. Crea un nuevo Gifo.";
        })
    });
}

start_button.addEventListener("click", startCamera);



