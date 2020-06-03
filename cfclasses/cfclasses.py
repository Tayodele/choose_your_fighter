import json

class Generic:

  def json2obj(self, sFile):
    sObj = open(sFile+".json")
    return json.loads(sObj)

class Candidate(Generic):
  
  def __init__(self):
    self.sName = ""
    self.sRole = ""
    self.aAns = {}
    self.dPweight = 0.0
    
  def __init__(self,name):
    self.sName = name
    self.sRole = ""
    self.aAns = {}
    self.dPweight = 0.0

  def loadAns(self):
    self.aAns = self.json2obj("candidates/"+(self.sName))

  def checkAns(self,aUserAns):
    iCorrect = 0
    for key,ans in enumerate(aUserAns):
      if self.aAns[key] == ans:
        iCorrect += 1
    self.dPweight = (iCorrect/len(self.aAns))*100

class User(Generic):

  def __init__(self):
    self.super()
    #TBD on needed location data
    #Quiz Data
    self.aoPolpool = []
    self.aPicks = {}
    #dict of questions and answers, with keys for role types
    self.aaaQA = {} 

  def addPool(self,oCan):
    if oCan.sRole not in self.aaaQA:
      aaaQA[oCan.sRole] = oCan.aAns
    for ques in aaaQA[oCan.sRole]:
      ques = ""
    self.aoPolpool.append(oCan)

  #def addPick(self,sRole):
  #  top
  #  for can in self.aoPolpool: