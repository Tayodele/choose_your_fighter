import sys
from flask import Flask
from flask import request
from flask import jsonify

#Adding classes
from cfclasses.cfclasses import User
from playhouse import shortcuts

app = Flask(__name__)

#helper functions
def popBallot(aObj):
  aArr = []
  for obj in aObj:
    oBal = shortcuts.model_to_dict(obj)
    oBal['oBanks'] = (obj.getBanks(stringy=True))
    oBal['oCands'] = (obj.getCands(stringy=True))
    aArr.append(oBal)
  return aArr

#api
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
  return response

@app.route('/user', methods=['GET'])
def getBallot():
  oUser = User()
  oUser.house  = request.args.get('house','')
  oUser.dir    = request.args.get('dir','')
  oUser.stname = request.args.get('stname','')
  oUser.suffix = request.args.get('suffix','')
  oUser.zip    = request.args.get('zip','')
  oUser.formemail = request.args.get('email','')
  oUser.findBallot()
  oUser.id2Obj()
  return jsonify(
    data=popBallot(oUser.aBallot),
    success=True
  )

if __name__ == "__main__":
  app.run()