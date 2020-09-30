
let start_button = document.getElementById("start-button");
const img_element = document.getElementById("img-element");
const video_container = document.getElementById("video-container");
let H1_main_title = document.getElementById("main-title");
let instructions_paragraph = document.getElementById("instructions");
let one_btn = document.getElementById("one-btn");
let two_btn = document.getElementById("two-btn");
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
     text_container.style.visibility="hidden";

    video_container.srcObject = stream;
    video_container.play()
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
        type: "gif"
    };
    let camera=video_container.srcObject;
    
            
    recorder = RecordRTC(camera, recorder_options);
            recorder.startRecording();
            recorder.camera = camera;
            is_recording = true;

    start_button.addEventListener("click", stop_recording);
 }


function stop_recording() {
    recorder.stopRecording();

    
                
    let form;
    let src;
    let blob;


    recorder.camera.stop();
    
    blob = recorder.getBlob();
    console.log(blob);
    form = new FormData();
    form.append("file", blob, 'test.gif');
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
        })
    });
  
    localStorage.setItem('misGifos', JSON.stringify(gifUrl));
  
    src = URL.createObjectURL(blob);
    
    img_element.src = src;

    recorder.destroy();
    recorder = null;
    video_container.srcObject = null;

    is_recording = false;
}
start_button.addEventListener("click", startCamera);

function startCamera (e){
     
        if (!is_recording)
            /*start_recording();*/
            get_cam_access();
            getStreamAndRecord();
    
}

