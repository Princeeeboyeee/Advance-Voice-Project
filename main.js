x = 0;
y = 0;
fish="";
to_number="";
draw_fish = "";
screen_width="";
screen_height="";
speak_data="";

function preload(){
fish= loadImage("cichlid.jpeg");

}

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
    to_number= Number(content);
    if(Number.isInteger(to_number))
    {
      document.getElementById("status").innerHTML = "Started drawing fishes";
      draw_fish="set";
    }
    else{
      document.getElementById("status").innerHTML = "The speech has not recognised a number";
    }
}

function setup() {
  screen_width=window.innerWidth;
  screen_height=window.innerHeight;
  canvas=createCanvas(screen_width, screen_height-150); 
  canvas.position(0,150);
}

function draw() {
  if(draw_fish == "set")
  {
    document.getElementById("status").innerHTML = to_number + " Fishes drawn";
    draw_fish = "";
  
  speak_data= to_number+ "Fishes Drawn";
  speak();
  for(var i = 1; i < to_number; i++)
  {
    x = Math.floor(Math.random()*screen_width);
    y = Math.floor(Math.random()*screen_height);
    image(fish, x, y, 50, 50);
  }
}
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
