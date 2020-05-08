const URL = "https://teachablemachine.withgoogle.com/models/Ou_2Y3sHi/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the gwebcam
async function init() {
  document.getElementById("loader").style.opacity = "0";
  document.getElementById("loader").style.display = "none";
  document.getElementById("content").style.display = "block";

  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const flip = true; // whether to flip the webcam
  webcam = new tmImage.Webcam(350, 350, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // append elements to the DOM
  document.getElementById("webcam-container").appendChild(webcam.canvas);
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  alertfunc(document.getElementById("thresholdInput").value);

  window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
  // predict from video element
  window.prediction = await model.predict(webcam.canvas); //global variable
  for (let i = 0; i < maxPredictions; i++) {
    //iteration control
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
}
