import sys
from flask import Flask
from flask import request

#Adding classes
from cfclasses.cfclasses import User

app = Flask(__name__)

#testing waters
@app.route('/testpath')
def hello_world():
  return "hello world!"


@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', 'http://localhost:8000')
  return response

@app.route('/user', methods=['GET'])
def getBallot():
  oUser = User()
  oUser.house  = request.args.get('house',0)
  oUser.dir    = request.args.get('dir','')
  oUser.stname = request.args.get('stname','')
  oUser.suffix = request.args.get('suffix','')
  oUser.zip    = request.args.get('zip',0)
  oUser.formemail = request.args.get('email','')
  oUser.findBallot()
  return  {
    'ballot_id': oUser.aBallot
  }

if __name__ == "__main__":
  app.run()
  