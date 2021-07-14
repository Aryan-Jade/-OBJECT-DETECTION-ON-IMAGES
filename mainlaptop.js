img = "";
status = "";
objects = [];


function preload(){
    img = loadImage('https://i.postimg.cc/KzhswsdD/laptop.jpg');
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function draw(){
    image(img, 0, 0, 640, 420);
    if(status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Object Detecting";
            percent = floor(objects[i].confidence*100);
            
            fill("#FF0000");
            text(objects[i].label + " " + percent + "% ", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("status").innerHTML = "Object Detected";
        }
    }
}

function modelLoaded(){
    console.log("Model is Loaded!");
    status = true;
    objectDetector.detect(img, gotResult)
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function back(){
    window.location = "index.html";
}