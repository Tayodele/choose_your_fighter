import json
from peewee import *
import requests

db = SqliteDatabase('cfclasses/electiondata.db')

class Generic(Model):
  
  apiheader = {'x-api-key': 'bre6oJ2HAO3wMXQs6mkhY31LqgEkK6Eo8zvUSbpZ'}

  class Meta:
    database = db

class QuestionBank(Generic):
  
  bank_id = IntegerField()
  question = TextField()
  choices = TextField()
  oKey = [] # {cand: <"name"> ans: [id of ans] evid: [array of proof]}

# class Candidate(Generic):
  
#   def __init__(self, name = ""):
#     self.sName = name
#     self.oBank = None
#     self.sRole = ""
#     self.oImg = None
#     self.oLinks = None
#     self.dPweight = 0.0

  #def checkAns(self,aUserAns):
  #  iCorrect = 0
  #  for key,ans in enumerate(aUserAns):
  #    if self.aAns[key] == ans:
  #      iCorrect += 1
  #  self.dPweight = (iCorrect/len(self.aAns))*100

class ChicagoBallot(Generic):

  position_id = IntegerField()
  date = TextField()
  name = TextField()
  candidates_id = TextField() #json array
  description = TextField()
  banks_id = TextField() #json array

class User(Generic):

  address = TextField()
  email = TextField()
  ballot = TextField()
  house = 0
  dir = ""
  stname = ""
  suffix = ""
  zip = 0
  formemail = ""
  aBallot = []

  def findBallot(self):
    sAddr = self.house + ' ' + self.dir + ' ' + self.stname + ' ' + self.suffix + ', Chicago, IL ' + self.zip + ', USA' 
    try:
      self.ballot = User.get(User.email == self.formemail, User.address == sAddr).ballot
      self.aBallot = json.loads(self.ballot)
    except DoesNotExist as e:
      print("Cannot find User, creating new")
      self.address = sAddr
      urlen = {'address' : self.address}
      r = requests.get('https://api.civicengine.com/positions',headers=self.apiheader,params=urlen)
      dataobj = r.json()
      for pos in dataobj["positions"]:
        self.aBallot.append(pos["position_id"])
      self.ballot = json.dumps(self.aBallot)
      self.email = self.formemail
      self.save()