import sys
from flask import Flask
from flask import request

#Adding classes
sys.path.append('/cfclasses')
from cfclasses import *

app = Flask(__name__)

#testing waters
@app.route('/testpath')
def hello_world():
  return "hello world!"

@app.route('/data/candidate/<name>', methods=['GET','POST'])
def usertest(name):
  if request.method == 'POST':
    pass
  else:
    oUser = {}
    oUser['Name'] = name
    return oUser