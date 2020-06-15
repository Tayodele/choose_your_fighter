import json
from peewee import *
import requests
from playhouse import shortcuts

db = SqliteDatabase('cfclasses/electiondata.db')

class Generic(Model):
  
  apiheader = {'x-api-key': 'bre6oJ2HAO3wMXQs6mkhY31LqgEkK6Eo8zvUSbpZ'}

  class Meta:
    database = db
  
  def isNumber(self,val):
    try:
      int(val)
      return True
    except ValueError as e:
      return False

class QuestionBank(Generic):
  
  bank_id = IntegerField()
  question = TextField()
  choices = TextField()
  # User answers
  aAns = []
  # Cand answers
  oKey = {} # {cand: <"id"> ans: [id of ans] evid: [array of proof]}

  def toJSON(self):
    oBal = shortcuts.model_to_dict(self)
    return oBal

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
  oBanks = []

  # Convert banks id attr to banks objects
  # return: 0 - success, 1 - some id's not found, 2- fail (attr already converted)
  def getBanks(self,stringy=False):
    aBanksc = json.loads(self.banks_id)
    iStatus = 0
    if(self.isNumber(aBanksc[0])):
      for iban in aBanksc:
        try:
          oBank = QuestionBank.get(QuestionBank.bank_id == iban)
          self.oBanks.append(oBank)
        except DoesNotExist as e:
          iStatus = 1
      if(stringy):
        oBanksj = []
        for obj in self.oBanks:
          oBanksj.append(shortcuts.model_to_dict(obj))
        return oBanksj
      return iStatus
    else:
      return 2

class User(Generic):

  address = TextField()
  email = TextField()
  ballot = TextField()
  house = ""
  dir = ""
  stname = ""
  suffix = ""
  zip = ""
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

  # Convert ballot id attr to ballot objects
  # return: 0 - success, 1 - some id's not found, 2- fail (attr already converted)
  def id2Obj(self):
    aBallotc = self.aBallot
    aoBal = []
    iStatus = 0
    if(self.isNumber(aBallotc[0])):
      for ibal in aBallotc:
        try:
          oBal = ChicagoBallot.get(ChicagoBallot.position_id == ibal)
          aoBal.append(oBal)
        except DoesNotExist as e:
          iStatus = 1
      self.aBallot = aoBal
      return iStatus
    else:
      return 2