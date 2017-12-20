from flask import Flask
import os
import cf_deployment_tracker

#cf_deployment_tracker.track()

port = int(os.getenv('PORT', 8000))

app = Flask(__name__)

@app.route("/")
def home():
    return "This is Mappier!"

if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=port, debug=True)
    app.run(port=port, debug=True)