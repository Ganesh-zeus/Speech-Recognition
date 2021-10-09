// get DOM elements
var textBox = document.querySelector("textarea");
var startBtn = document.querySelector("#start-btn");
var stopBtn = document.querySelector("#stop-btn");

// text recongnized
var content = "";
var transcriptHistory = [];

// boolean flag
var speechRecognitionIsOn = false;

var speechRecognition = window.webkitSpeechRecognition


// creates an instance of speechRecognition
var recognition = new speechRecognition();

// we will be taking snapshots repeatedly instead of continuous stream
recognition.continuous = false

recognition.onstart = () => {

    if(content.length){
        content = ''
    }
}

recognition.onresult = (event) => {

    // this will return increasing index on continuous stream
    let current = event.resultIndex;

    // console.log(event.results[current])

    let transcript = event.results[current][0].transcript;

    let timestamp = new Date().toLocaleTimeString();

    content += transcript;
    textBox.value = content;

    transcriptHistory.push({"at":timestamp,"text":content});
    console.log(transcriptHistory[transcriptHistory.length-1]);
}

recognition.onspeechend = () => {
    // console.log("Speech has ended")
}

recognition.onaudioend = () => {
    // console.log("Audio has ended")
}

recognition.onerror = (e) => {
    // console.log(e)
    console.log("Speech not recognized")
}

recognition.onend = () => {
    if(speechRecognitionIsOn){
        recognition.start();
    }  
}

startBtn.addEventListener('click',() => {
    speechRecognitionIsOn = true;
    transcriptHistory = [];
    console.log("voice recognition started");

    recognition.start();
});

stopBtn.addEventListener('click',() => {
    speechRecognitionIsOn = false;
    recognition.stop();

    textBox.value = "";
    console.log(transcriptHistory)
});