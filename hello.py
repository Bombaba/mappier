from flask import Flask
import os
#import cf_deployment_tracker

#cf_deployment_tracker.track()

port = int(os.getenv('PORT', 8000))

app = Flask(__name__)

@app.route("/")
@app.route("/<title>")
def home(title=""):
    if not title:
        title = "Hello!"

    with open("./public/index.html") as f:
        src = f.read()

    return src.format(title=title)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)