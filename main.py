from flask import Flask, render_template, Response
from camera import VideoCamera

app = Flask(__name__)

videoCamera = VideoCamera()


@app.route('/')
def index():
    return render_template('index.html')

frameO = True
def gen():
    while True:
        if frameO:
            frame = videoCamera.get_frame()
            frameO = False
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=True, debug=True)
 