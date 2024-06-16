objects = [];
status = "";








function setup()
{
    canvas = createCanvas();
    canvas.center
    video = createCapture(VIDEO);
    video.hide;
    video.size(380, 480)
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Ojects";
}


function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
        {
            objectDetector.detect(video, gotResult);
            for(i = 0; i < objects.length; i++)
            {
                document.getElementById("status").innerHTML = "Status : Objects Detected";
    
                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                if(objects[i].label == input_id)
                {
                    video.stop();
                    objectDetector.detect(gotResults);
                    document.getElementById("object_found").innerHTML = input_text + "Found";
                    var synth = window.SpeechSynthesis;
                    var utterThis = new SpeechSynthesisUtterance(input_text + "found");
                    synth.speak(utterThis);
                }
                else
                {
                    document.getElementById("object_found").innerHTML = input_id + "Not Found"; 
                }
            }
        }
}

function gotResult(error, results)
{
    if(error)
        {
            console.log(error);
        }
        console.log(results);
        objects = results;
}