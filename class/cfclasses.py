class Generic:

  def __init__(self):
    pass

  def json2obj(self, sFile):
    sObj = open(sFile)
    return json.loads(sObj)

  def mapjson(self, sFile, sVals):
    oObj = self.json2obj(sFile)
    if sVals in self.__dict__:
      for name,item in enumerate(oObj):
        exec("self.%s[%s] = %s" % (sVals,name,item))

class User(Generic):

  def __init__(self):
    #TBD on needed location data
    #Quiz Data
    self.aoPolpool = []
    self.aoPicks = []
    #tuple of questions and answers
    self.aaQA = [] 

  def populateQ(self,sQues):
    oQues = self.json2obj(sQues)
  