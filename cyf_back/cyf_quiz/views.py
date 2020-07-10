from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. Testing the quiz.")

def getBallot(request):
  #oUser = User()
  #oUser.house  = request.args.get('house','')
  #oUser.dir    = request.args.get('dir','')
  #oUser.stname = request.args.get('stname','')
  #oUser.suffix = request.args.get('suffix','')
  #oUser.zip    = request.args.get('zip','')
  #oUser.formemail = request.args.get('email','')
  #oUser.findBallot()
  #oUser.id2Obj()
  #return jsonify(
  #  data=popBallot(oUser.aBallot),
  #  success=True
  #)
  return HttpResponse("getting a ballot!")