from django.db import models
import json

class QuestionBank(models.Model):
  
  bank_id = models.IntegerField(default=0)
  question = models.CharField(max_length=200)
  choices = models.CharField(max_length=200)

#   def toJSON(self):
#     oBal = shortcuts.model_to_dict(self)
#     return oBal

class CandAns(models.Model):
  question = models.ForeignKey(QuestionBank,on_delete=models.CASCADE)

class Candidate(models.Model):

  name = models.CharField(max_length=200)
  email = models.CharField(max_length=200)
  position_id = models.CharField(max_length=200)
  candidate_id =models.IntegerField(default=0)

  #def checkAns(self,aUserAns):
  #  iCorrect = 0
  #  for key,ans in enumerate(aUserAns):
  #    if self.aAns[key] == ans:
  #      iCorrect += 1
  #  self.dPweight = (iCorrect/len(self.aAns))*100

class ChicagoBallot(models.Model):

  position_id =models.IntegerField(default=0)
  date = models.CharField(max_length=200)
  name = models.CharField(max_length=200)
  description = models.CharField(max_length=200)
  banks = models.ManyToManyField(QuestionBank)
  cands = models.ManyToManyField(Candidate)

  # Convert banks id attr to banks objects
  # return: 0 - success, 1 - some id's not found, 2- fail (attr already converted)
#   def getBanks(self,stringy=False):
#     self.oBanks = []
#     aBanksc = json.loads(self.banks_id)
#     iStatus = 0
#     if(self.isNumber(aBanksc[0])):
#       for iban in aBanksc:
#         try:
#           oBank = QuestionBank.get(QuestionBank.bank_id == iban)
#           self.oBanks.append(oBank)
#         except DoesNotExist as e:
#           iStatus = 1
#       if(stringy):
#         oBanksj = []
#         for obj in self.oBanks:
#           oBanksj.append(shortcuts.model_to_dict(obj))
#         return oBanksj
#       return iStatus
#     else:
#       return 2
  
#   def getCands(self,stringy=False):
#     self.oCands = []
#     aCandsc = json.loads(self.candidates_id)
#     iStatus = 0
#     for ican in aCandsc:
#       try:
#         oCand = Candidate.get(Candidate.candidate_id == ican)
#         self.oCands.append(oCand)
#       except DoesNotExist as e:
#         iStatus = 1
#     if(stringy):
#       oCandsj = []
#       for obj in self.oCands:
#         oCandsj.append(shortcuts.model_to_dict(obj))
#       return oCandsj
#     return iStatus
    
class User(models.Model):

  address = models.CharField(max_length=200)
  email = models.CharField(max_length=200)
  ballot = models.ManyToManyField(ChicagoBallot)
#   house = ""
#   dir = ""
#   stname = ""
#   suffix = ""
#   zip = ""
#   formemail = ""

#   def findBallot(self):
#     sAddr = self.house + ' ' + self.dir + ' ' + self.stname + ' ' + self.suffix + ', Chicago, IL ' + self.zip + ', USA' 
#     try:
#       self.ballot = User.get(User.email == self.formemail, User.address == sAddr).ballot
#       self.aBallot = json.loads(self.ballot)
#     except DoesNotExist as e:
#       print("Cannot find User, creating new")
#       self.address = sAddr
#       urlen = {'address' : self.address}
#       r = requests.get('https://api.civicengine.com/positions',headers=self.apiheader,params=urlen)
#       dataobj = r.json()
#       for pos in dataobj["positions"]:
#         self.aBallot.append(pos["position_id"])
#       self.ballot = json.dumps(self.aBallot)
#       self.email = self.formemail
#       self.save()

#   # Convert ballot id attr to ballot objects
#   # return: 0 - success, 1 - some id's not found, 2- fail (attr already converted)
#   def id2Obj(self):
#     aBallotc = self.aBallot
#     aoBal = []
#     iStatus = 0
#     if(self.isNumber(aBallotc[0])):
#       for ibal in aBallotc:
#         try:
#           oBal = ChicagoBallot.get(ChicagoBallot.position_id == ibal)
#           aoBal.append(oBal)
#         except DoesNotExist as e:
#           iStatus = 1
#       self.aBallot = aoBal
#       return iStatus
#     else:
#       return 2
