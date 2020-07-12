from django.shortcuts import render
from django.http import HttpResponse
from geopy.geocoders import Nominatim
import requests

# singlet vars

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

def find_Address(request):
  dAddr = request.GET.dict()
  sAddr = dAddr['house'] + ' ' + dAddr['dir'] + ' ' + dAddr['stname'] + ' ' + dAddr['suffix'] + ', Chicago, IL ' + dAddr['zip'] + ', USA' 
  locator = Nominatim(user_agent='chiLocator')
  location = locator.geocode(sAddr)
  bound_data = user_Locator({ 'long': location.latitude, 'lat': location.longitude})
  return HttpResponse(bound_data.text)

def find_LongLat(request):
  bound_data = user_Locator(request.GET.dict())
  return HttpResponse(bound_data.text)

def user_Locator(dLL):
  sLL = str(dLL['long']) + ',' + str(dLL['lat'])
  return requests.get('http://localhost:8000/loc/boundaries/?contains='+sLL)