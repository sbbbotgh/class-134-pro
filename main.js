songs = "";
statuss = "";
obj = [];

function preload(){
}

function setup(){
    songs = loadSound('alert.mp3');
    canvas = createCanvas(854, 480);
    video = createCapture(VIDEO);
    video.hide();
    video.size(854, 480);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("modelLoaded");
    statuss = true;
}

function gotResults(error, results){
    if(error){
        console.log("error");
    }
    else{
        console.log(results);
        obj = results;
    }
}

function draw(){
    canvas.center();
    image(video, 0, 0, 854, 480);
    if(statuss != ""){
        objectDetector.detect(video, gotResults);
        fill("#FF0000");
        for(i = 0; i < obj.length; i++){
            per = Math.floor(obj[i].confidence*100);
            text(obj[i].label + " " + per + "%", obj[i].x + 65, obj[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(obj[i].x + 50, obj[i].y, obj[i].width + 110, obj[i].height);
            if(obj[i].label == "person"){
                document.getElementById("objectss").innerHTML = "baby detected";
                song.stop();
            }
            else{
                document.getElementById("objectss").innerHTML = "baby not detected";
                song.play();
            }
        }
        document.getElementById("status").innerHTML = "Status :  Object Detected";
        if(obj.length < 0){
            document.getElementById("objectss").innerHTML = "baby not detected";
            song.play();
        }
    }
}


function back(){
    window.location = "index.html";
}
