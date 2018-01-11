import datetime
import os
import flask
import myconfig
#import cf_deployment_tracker

#cf_deployment_tracker.track()

port = int(os.getenv('PORT', 8000))

app = flask.Flask(__name__)

@app.route("/")
def home():
    timenow = datetime.datetime.now()
    last_visit = flask.request.cookies.get('last-visit') or timenow
    response = flask.make_response(
        flask.render_template("index.html")
    )
    expires = timenow + datetime.timedelta(days=7)
    response.set_cookie("last-visited", timenow.isoformat(),
                        expires=expires)
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)
    #app.run(port=port, debug=True)
