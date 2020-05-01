// Teachable Machine
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
// https://editor.p5js.org/codingtrain/sketches/PoZXqbu4v

// The video
let video;
// For displaying the label
let label = "loading...";
let zeroCalc = "";
let oneCalc = "";
let twoCalc = "";
let zeroObj = "";
let oneObj = "";
let twoObj = "";
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/02CY_0eC0/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}
// while()
function draw() {
//   background(0);

//   // Draw the video
// //   image(video, 0, 0);

//   // STEP 4: Draw the label
//   textSize(32);
//   textAlign(CENTER, CENTER);
//   fill(255);
//   text(label, width / 2, height - 16);



document.getElementById('item').innerHTML=label;
document.getElementById('two').innerHTML=round(twoCalc*100) + '% '+ twoObj;
document.getElementById('one').innerHTML= round(oneCalc*100) + '% '+ oneObj;
document.getElementById('zero').innerHTML = round(zeroCalc*100) + '% '+ zeroObj;

}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  zeroCalc = results[0].confidence;
  zeroObj = results[0].label;
  oneCalc = results[1].confidence;
  oneObj = results[1].label;
  twoCalc = results[2].confidence;
  twoObj = results[2].label;
  classifyVideo();
}
