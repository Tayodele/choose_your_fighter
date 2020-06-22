from cfclasses import *
from playhouse import shortcuts

db.connect()
db.create_tables([Candidate])