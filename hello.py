import datetime
import os
import flask
#import cf_deployment_tracker

#cf_deployment_tracker.track()

port = int(os.getenv('PORT', 8000))

app = flask.Flask(__name__)
app.config.from_pyfile('config.py')

@app.route("/")
def home():
    response = flask.make_response(
        flask.render_template("auth.html"))
    return response

@app.route("/map")
def map():
    timenow = datetime.datetime.now()
    last_visit = flask.request.cookies.get('last-visit') or timenow
    response = flask.make_response(
        flask.render_template("map.html"))
    expires = timenow + datetime.timedelta(days=7)
    response.set_cookie("last-visited",
                        timenow.isoformat(),
                        expires=expires)
    return response
@app.after_request
def add_header(response):
    response.cache_control.no_store = True
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=False)
    #app.run(port=port, debug=True)
