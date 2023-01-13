score_left_wrist = 0;
score_right_wrist = 0;
song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotposes);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("purple");

    if (score_right_wrist > 0.2) {
        circle(rightWristX, rightWristY, 40);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById('speed').innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById('speed').innerHTML = "Speed = 1x";
            song.rate(1);
        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById('speed').innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById('speed').innerHTML = "Speed = 2x";
            song.rate(2);
        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById('speed').innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }


    if (score_left_wrist > 0.2) {

        circle(leftWristX, leftWristY, 40);
        numberleftwristY = Number(leftWristY);
        remove_decimal = floor(numberleftwristY);
        volume = remove_decimal / 500;
        song.setVolume(volume);

        document.getElementById('volume').innerHTML = "Volume = " + volume;
    }

}


function play_audio() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelloaded() {
    console.log("PoseNet Model Is Loaded Successfully! Enjoy:)");
}

function gotposes(results) {


    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[10].score;

        console.log("Left Wrist X = " + leftWristX + "& Left Wrist Y = " + leftWristY + " Left Wrist Score = " + score_left_wrist + " Right Wrist Score = " + score_right_wrist);


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "& Left Wrist Y = " + rightWristY);
    }
}