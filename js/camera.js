var enabled = false;

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var timer = null;

document.addEventListener("keydown", function (e) {
    if (e.which === 123) {
        remote.getCurrentWindow().toggleDevTools();
    } else if (e.which === 116) {
        location.reload();
    }
});
function frameConverter(video, canvas) {

    // Set up our frame converter
    this.video = video;
    this.viewport = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    // Create the frame-buffer canvas
    this.framebuffer = document.createElement("canvas");
    this.framebuffer.width = this.width;
    this.framebuffer.height = this.height;
    this.ctx = this.framebuffer.getContext("2d");
    // Default video effect is blur
    this.effect = null;
    // This variable used to pass ourself to event call-backs
    var self = this;
    // Start rendering when the video is playing
    this.video.addEventListener("play", function () {
        self.render();
    }, false);

    // Change the image effect to be applied  
    this.setEffect = function (effect) {
        if (effect == 'none') {
            // lets not add any effect to render
            console.log('none selected')
            this.effect = null;
        }
        if (effect in JSManipulate) {
            this.effect = JSManipulate[effect];
        }
    }


    this.render = function () {
        if (this.video.paused || this.video.ended) {
            return;
        }
        this.renderFrame();
        var self = this;
        // Render every 10 ms
        setTimeout(function () {
            self.render();
        }, 10);
    };

    this.drawing = new Image();
    this.drawing.src = config.stickers[0].location;
    // Compute and display the next frame 
    this.renderFrame = function () {
        // Acquire a video frame from the video element
        this.ctx.drawImage(this.video, 0, 0, this.video.videoWidth,
            this.video.videoHeight, 0, 0, this.width, this.height);

        //this.ctx.drawImage(this.drawing, 0, 0);

        var data = this.ctx.getImageData(0, 0, this.width, this.height);
        // Apply image effect
        if (this.effect != null) {
            this.effect.filter(data, this.effect.defaultValues);
        }
        // Render to viewport
        this.viewport.putImageData(data, 0, 0);
        this.viewport.drawImage(this.drawing, 0, 0, 200, 150);

        return;
    };
};

function startCapture() {
    if (!enabled) {
        enabled = true;
        WebCamera.set({
            width: w,
            height: h,
            image_format: 'jpeg',
            jpeg_quality: 90,
            constraints: {
                width: { exact: 1280 },
                height: { exact: 720 }
            }
        });
        WebCamera.attach('#camdemo');
        console.log("The camera has been started");
        //here lets add effects and push this canvas to camdemo div as well
        video = document.getElementsByTagName("video")[0];
        //hide video element
        video.style.display = "none";
        canvasParent = document.getElementById("camdemo");

        var canvas = document.createElement("canvas")
        canvas.setAttribute("id", "mainCanvas")
        canvas.setAttribute("class", "effects")
        canvas.height = 1280//parseInt(canvasParent.style.height, 10);
        canvas.width = 720//parseInt(canvasParent.style.width, 10);
        canvasParent.appendChild(canvas);
        fc = new frameConverter(video, canvas);
    } else {
        enabled = false;
        WebCamera.reset();
        console.log("The camera has been disabled");
    }

}
var ctx = null;
var canvas = null;
function take_snapshot() {
    // take snapshot and get image data
    if (enabled) {
        WebCamera.snap(function (data_uri) {
            // display results in page
            var img = new Image();
            img.src = data_uri;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        });
    }
}
function start_snapping() {

    if (!timer) {
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");

        take_snapshot();
        timer = setInterval(take_snapshot, 1);
    }

}
function stop_snapping() {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
}


function processBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};
    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    return response;
}
function captureSnapshotEx() {
    var waitTime = 5;
    document.getElementById("countdown").innerHTML = waitTime + '';
    var timerLoop = 0;
    var timer = setInterval(function () {
        timerLoop++;
        if ((waitTime - timerLoop) > 0) {
            //we still have time, lets update counter
            document.getElementById("countdown").innerHTML = (waitTime - timerLoop) + '';
        } else {
            document.getElementById("countdown").innerHTML = '';
            clearInterval(timer);
            captureSnapshot();
        }

    }, 1000);
}
function captureSnapshot() {

    if (enabled) {
        //we need to take snapshot of entire canvas
        WebCamera.snap(function (data_uri) {
            var imageBuffer = processBase64Image(data_uri);
            var timestamp = new Date().getTime().toString();
            fileName = config.save_location + "/img" + timestamp + '.jpg';
            // If the user gave a name to the file, then save it !
            if (!fs.existsSync(config.save_location)) fs.mkdir(config.save_location);
            fs.writeFile(fileName, imageBuffer.data, function (err) {
                if (err) {
                    console.log("Cannot save the file :'( time to cry !");
                } else {
                    console.log("Image saved succesfully");
                }
            });
        });
    } else {
        console.log("Please enable the camera first to take the snapshot !");
    }
}
startCapture();