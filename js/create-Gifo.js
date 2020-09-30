
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

let form;
let src;
let blob;
let contador=0;
let clock = function(){
  contador=contador+1;                
  seconds.innerText=contador;      
}  
let interval;

function generate_dload(url) {
    download_icon.addEventListener("click", async () => {
      //create new a element
      let a = document.createElement('a');
      // get image as blob
      let response = await fetch(url);
      let file = await response.blob();
      // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
      a.download = "Mi Gifo";
      a.href = window.URL.createObjectURL(file);
      //store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
      a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
      //click on element to start download
      a.click();
  });
}

function generate_share(url){
  share_icon.addEventListener("click",() => {
    window.open(url)});
}
    

function upload_succes(){
  upload_icon.src=`./img/check.svg`
  myGif_btns.style.visibility="visible";
  loading_msg.innerText="GIFO subido con éxito";

}
    


function get_cam_access(){
    H1_main_title.innerText="¿Nos das acceso a tu cámara?";
    instructions_paragraph.innerText="El acceso a tu camara será válido solo por el tiempo en el que estés creando el GIFO."
    start_button.style.visibility="hidden";
    one_btn.style.backgroundColor="#572ee5";
    one_btn.style.color="#fff";

}
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
    one_btn.style.backgroundColor="#fff";
    one_btn.style.color="#572ee5";
    two_btn.style.color="#fff";
    two_btn.style.backgroundColor="#572ee5";
    start_button.style.visibility="visible";
    start_button.removeEventListener("click",startCamera);
    start_button.innerText="Grabar";
    start_button.addEventListener("click", startRecord);


})
.catch(error=> console.log(error));
 }

 


 function startRecord(){
    start_button.removeEventListener("click", startRecord);
    start_button.innerText="Finalizar";

    let recorder_options = {
        video: true,
        audio: false,
        type: "gif",
      };
    let camera=video_container.srcObject;
    
            
    recorder = RecordRTC(camera, recorder_options);
            recorder.startRecording();
            recorder.camera = camera;
            is_recording = true;


    interval=setInterval(clock, 1000);    

    start_button.addEventListener("click", stop_recording);
 }


function stop_recording() {
  clearInterval(interval);
    recorder.stopRecording();

    start_button.removeEventListener("click", stop_recording);
    start_button.innerText="Subir GIFO";   
                
    /*let form;
    let src;
    let blob;*/

    recorder.camera.stop();    
    blob = recorder.getBlob();
    console.log(blob);
    src = URL.createObjectURL(blob);
    
    img_element.src = src;

    recorder.destroy();
    recorder = null;
    video_container.srcObject = null;

    is_recording = false;

    start_button.addEventListener("click", upload_gif);
    
  }

function upload_gif(){
    upload_details.style.visibility="visible";
    start_button.removeEventListener("click",upload_gif);
    start_button.style.visibility="hidden";
    two_btn.style.backgroundColor="#fff";
    two_btn.style.color="#572ee5";
    three_btn.style.color="#fff";
    three_btn.style.backgroundColor="#572ee5";
    
    

    form = new FormData();
    form.append("file", blob, 'mygifo.gif');
    // here is where upload happens
  
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
        })
    });
  
    localStorage.setItem('misGifos', JSON.stringify(gifUrl));
  
   
}

start_button.addEventListener("click", startCamera);

function startCamera (e){
     
        if (!is_recording)
            
            get_cam_access();
            getStreamAndRecord();
    
}

